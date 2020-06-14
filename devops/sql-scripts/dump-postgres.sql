--
-- PostgreSQL database dump
--

-- Dumped from database version 11.8
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-4)

-- Started on 2020-06-14 14:50:56 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pne
--


ALTER SCHEMA public OWNER TO pne;

--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pne
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 669 (class 1247 OID 16452)
-- Name: category_type_c; Type: TYPE; Schema: public; Owner: pne
--

CREATE TYPE public.category_type_c AS ENUM (
    'security',
    'price',
    'clean',
    'quality'
);


ALTER TYPE public.category_type_c OWNER TO pne;

--
-- TOC entry 265 (class 1255 OID 16594)
-- Name: json_object_set_key(json, text, anyelement); Type: FUNCTION; Schema: public; Owner: pne
--

CREATE FUNCTION public.json_object_set_key(json json, key_to_set text, value_to_set anyelement) RETURNS json
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT concat('{', string_agg(to_json("key") || ':' || "value", ','), '}')::json
  FROM (SELECT *
          FROM json_each("json")
         WHERE "key" <> "key_to_set"
         UNION ALL
        SELECT "key_to_set", to_json("value_to_set")) AS "fields"
$$;


ALTER FUNCTION public.json_object_set_key(json json, key_to_set text, value_to_set anyelement) OWNER TO pne;

--
-- TOC entry 267 (class 1255 OID 16614)
-- Name: trigger_calc_reviews(); Type: FUNCTION; Schema: public; Owner: pne
--

CREATE FUNCTION public.trigger_calc_reviews() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE public.tbl_point_stop SET reviews_avg = json_object_set_key(reviews_avg,new.category_type::text ,(select coalesce(avg(rating ),0) as rating 
	from public.tbl_point_stop_review where category_type = NEW.category_type and id_point_stop = NEW.id_point_stop)) where id=NEW.id_point_stop;
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_calc_reviews() OWNER TO pne;

--
-- TOC entry 266 (class 1255 OID 16728)
-- Name: trigger_time_pass_trip(); Type: FUNCTION; Schema: public; Owner: pne
--

CREATE FUNCTION public.trigger_time_pass_trip() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	IF NEW.finished_at <> OLD.finished_at THEN
		update public.tbl_trip set 
		minutes_trip_at = (select (finished_at - created_at )::time as timeleft 
		from public.tbl_trip where id = new.id) where id = new.id;
	END IF;
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_time_pass_trip() OWNER TO pne;

SET default_tablespace = '';

--
-- TOC entry 210 (class 1259 OID 16656)
-- Name: tbl_ranking_px; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_ranking_px (
    id bigint NOT NULL,
    points bigint DEFAULT '-1'::integer NOT NULL,
    type_action character varying(100) NOT NULL,
    id_user bigint NOT NULL,
    id_trip bigint,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tbl_ranking_px OWNER TO pne;

--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN tbl_ranking_px.points; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_ranking_px.points IS 'caso o motorista ultrapassar a velocidade fazer negativo';


--
-- TOC entry 3125 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN tbl_ranking_px.type_action; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_ranking_px.type_action IS 'colocar o tipo da pontuação... por exemplo, alongamento, parada descanço, almoço na hora certa, sono,...';


--
-- TOC entry 3126 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN tbl_ranking_px.id_trip; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_ranking_px.id_trip IS 'opcional.... nem sempre a pontuação vai estar relacionada a uma viagem';


--
-- TOC entry 209 (class 1259 OID 16654)
-- Name: ranking_px_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_ranking_px ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ranking_px_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16696)
-- Name: tbl_chat; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_chat (
    id bigint NOT NULL,
    id_chat_community bigint NOT NULL,
    id_user bigint,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tbl_chat OWNER TO pne;

--
-- TOC entry 212 (class 1259 OID 16680)
-- Name: tbl_chat_community; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_chat_community (
    id bigint NOT NULL,
    id_user_admin bigint NOT NULL,
    users_list json,
    group_name character varying(256) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    have_password character varying(50)
);


ALTER TABLE public.tbl_chat_community OWNER TO pne;

--
-- TOC entry 3127 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN tbl_chat_community.users_list; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_chat_community.users_list IS 'lista de usuarios que tem permissao pra ler/escrever ... caso seja publico api so apenda ele no array, se for privado o id_user_admin que tem q adicionar';


--
-- TOC entry 3128 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN tbl_chat_community.have_password; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_chat_community.have_password IS 'se password for nulo é aberto ao publico, senao tem q fornecer a senha pra entrar';


--
-- TOC entry 211 (class 1259 OID 16678)
-- Name: tbl_chat_community_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_chat_community ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_chat_community_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 16694)
-- Name: tbl_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_chat ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_chat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16718)
-- Name: tbl_notifications; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_notifications (
    id bigint NOT NULL,
    broadcast_message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    lat_value double precision DEFAULT '-23.17944'::numeric,
    long_value double precision DEFAULT '-45.88694'::numeric,
    notification_radius_km bigint DEFAULT 3000 NOT NULL
);


ALTER TABLE public.tbl_notifications OWNER TO pne;

--
-- TOC entry 3129 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN tbl_notifications.broadcast_message; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_notifications.broadcast_message IS 'mensagens em brodcast, notificações pra base de usuarios';


--
-- TOC entry 3130 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN tbl_notifications.lat_value; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_notifications.lat_value IS 'sjc';


--
-- TOC entry 3131 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN tbl_notifications.long_value; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_notifications.long_value IS 'sjc';


--
-- TOC entry 215 (class 1259 OID 16716)
-- Name: tbl_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_notifications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16426)
-- Name: tbl_point_stop; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_point_stop (
    id bigint NOT NULL,
    lat_point double precision NOT NULL,
    long_point double precision NOT NULL,
    stop_options_tags json,
    reviews_avg json DEFAULT '{"security":0, "price":0, "clean":0,"quality":0}'::json NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tbl_point_stop OWNER TO pne;

--
-- TOC entry 3132 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN tbl_point_stop.stop_options_tags; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_point_stop.stop_options_tags IS 'campo tipo json....recomendo usar como list array [''comida'',''combustivel'']';


--
-- TOC entry 203 (class 1259 OID 16424)
-- Name: tbl_point_stop_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_point_stop ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_point_stop_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16434)
-- Name: tbl_point_stop_review; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_point_stop_review (
    id bigint NOT NULL,
    id_point_stop bigint NOT NULL,
    id_user bigint NOT NULL,
    rating double precision NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    category_type character varying(50) NOT NULL
);


ALTER TABLE public.tbl_point_stop_review OWNER TO pne;

--
-- TOC entry 205 (class 1259 OID 16432)
-- Name: tbl_point_stop_review_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_point_stop_review ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_point_stop_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 202 (class 1259 OID 16413)
-- Name: tbl_trip; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_trip (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    origin character varying(256),
    destiny character varying(256),
    finished_at timestamp with time zone,
    minutes_trip_at time without time zone
);


ALTER TABLE public.tbl_trip OWNER TO pne;

--
-- TOC entry 3133 (class 0 OID 0)
-- Dependencies: 202
-- Name: COLUMN tbl_trip.minutes_trip_at; Type: COMMENT; Schema: public; Owner: pne
--

COMMENT ON COLUMN public.tbl_trip.minutes_trip_at IS 'trigger que calcula a diff do created_at e finished_at';


--
-- TOC entry 201 (class 1259 OID 16411)
-- Name: tbl_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_trip ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_trip_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 208 (class 1259 OID 16643)
-- Name: tbl_trip_stop; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_trip_stop (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    return_trip_at timestamp with time zone,
    id_trip bigint NOT NULL,
    id_point_stop bigint
);


ALTER TABLE public.tbl_trip_stop OWNER TO pne;

--
-- TOC entry 207 (class 1259 OID 16641)
-- Name: tbl_trip_stop_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_trip_stop ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_trip_stop_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 200 (class 1259 OID 16399)
-- Name: tbl_truck; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_truck (
    id bigint NOT NULL,
    truck_nickname character varying(100) NOT NULL,
    truck_plate character varying(20),
    licensing_date date,
    id_user bigint
);


ALTER TABLE public.tbl_truck OWNER TO pne;

--
-- TOC entry 199 (class 1259 OID 16397)
-- Name: tbl_truck_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_truck ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_truck_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 197 (class 1259 OID 16385)
-- Name: tbl_user; Type: TABLE; Schema: public; Owner: pne
--

CREATE TABLE public.tbl_user (
    id bigint NOT NULL,
    name character varying(256),
    cpf character varying(30) NOT NULL,
    nickname character varying(100) NOT NULL,
    password character varying(200) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    birthday date,
    cellphone character varying(100)
);


ALTER TABLE public.tbl_user OWNER TO pne;

--
-- TOC entry 198 (class 1259 OID 16388)
-- Name: tbl_user_id_seq; Type: SEQUENCE; Schema: public; Owner: pne
--

ALTER TABLE public.tbl_user ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3115 (class 0 OID 16696)
-- Dependencies: 214
-- Data for Name: tbl_chat; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_chat OVERRIDING SYSTEM VALUE VALUES (1, 1, 1, 'ola mundo', '2020-06-13 14:54:04.957175+00');
INSERT INTO public.tbl_chat OVERRIDING SYSTEM VALUE VALUES (2, 1, 2, 'opa', '2020-06-13 14:54:04.959609+00');
INSERT INTO public.tbl_chat OVERRIDING SYSTEM VALUE VALUES (3, 1, 3, 'lele', '2020-06-13 14:54:04.961469+00');


--
-- TOC entry 3113 (class 0 OID 16680)
-- Dependencies: 212
-- Data for Name: tbl_chat_community; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_chat_community OVERRIDING SYSTEM VALUE VALUES (1, 1, '[1,2,3]', 'grupo dos zes', '2020-06-13 14:52:53.53829+00', NULL);


--
-- TOC entry 3117 (class 0 OID 16718)
-- Dependencies: 216
-- Data for Name: tbl_notifications; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_notifications OVERRIDING SYSTEM VALUE VALUES (1, 'ocorreu um assalto na rodovia dos tamoios', '2020-06-13 22:38:51.088984+00', -23.1794399999999996, -45.8869400000000027, 15);
INSERT INTO public.tbl_notifications OVERRIDING SYSTEM VALUE VALUES (2, '10% desconto no lanche de pernil', '2020-06-13 22:38:51.097534+00', -23.1794399999999996, -45.8869400000000027, 20);


--
-- TOC entry 3105 (class 0 OID 16426)
-- Dependencies: 204
-- Data for Name: tbl_point_stop; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_point_stop OVERRIDING SYSTEM VALUE VALUES (1, 123132321.231213316, -231213231.123213232, '["combustivel", "alimentação"]', '{"quality":3,"security":4.75,"price":5,"clean":4.75}', '2020-06-13 12:58:39.140457+00');
INSERT INTO public.tbl_point_stop OVERRIDING SYSTEM VALUE VALUES (2, 231213123.111000001, 12321312.1109999996, NULL, '{"price":2.33333333333333348,"security":2.33333333333333348,"quality":2.33333333333333348,"clean":2.33333333333333348}', '2020-06-13 12:58:39.140457+00');


--
-- TOC entry 3107 (class 0 OID 16434)
-- Dependencies: 206
-- Data for Name: tbl_point_stop_review; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (33, 2, 3, 5, '2020-06-13 04:42:25.839034+00', 'price');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (34, 2, 3, 5, '2020-06-13 04:42:25.839034+00', 'security');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (35, 2, 3, 5, '2020-06-13 04:42:25.839034+00', 'quality');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (36, 2, 3, 5, '2020-06-13 04:42:25.839034+00', 'clean');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (37, 2, 2, 1, '2020-06-13 04:42:44.772356+00', 'price');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (38, 2, 2, 1, '2020-06-13 04:42:51.799497+00', 'security');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (39, 2, 2, 1, '2020-06-13 04:42:52.65963+00', 'quality');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (40, 2, 2, 1, '2020-06-13 04:42:53.363079+00', 'clean');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (41, 2, 1, 1, '2020-06-13 04:43:22.97023+00', 'price');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (42, 2, 1, 1, '2020-06-13 04:43:22.97023+00', 'security');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (43, 2, 1, 1, '2020-06-13 04:43:22.97023+00', 'quality');
INSERT INTO public.tbl_point_stop_review OVERRIDING SYSTEM VALUE VALUES (44, 2, 1, 1, '2020-06-13 04:43:22.97023+00', 'clean');


--
-- TOC entry 3111 (class 0 OID 16656)
-- Dependencies: 210
-- Data for Name: tbl_ranking_px; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_ranking_px OVERRIDING SYSTEM VALUE VALUES (1, 2, 'alongamento', 1, NULL, '2020-06-13 14:09:37.800555+00');
INSERT INTO public.tbl_ranking_px OVERRIDING SYSTEM VALUE VALUES (3, 10, 'parada', 1, 1, '2020-06-13 14:09:37.800555+00');
INSERT INTO public.tbl_ranking_px OVERRIDING SYSTEM VALUE VALUES (4, 7, 'alongamento', 2, NULL, '2020-06-14 15:10:20.990239+00');
INSERT INTO public.tbl_ranking_px OVERRIDING SYSTEM VALUE VALUES (5, 5, 'parada', 2, NULL, '2020-06-14 15:10:20.995761+00');
INSERT INTO public.tbl_ranking_px OVERRIDING SYSTEM VALUE VALUES (6, 10, 'saude', 3, NULL, '2020-06-14 15:10:20.998421+00');


--
-- TOC entry 3103 (class 0 OID 16413)
-- Dependencies: 202
-- Data for Name: tbl_trip; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_trip OVERRIDING SYSTEM VALUE VALUES (2, 2, '2020-06-13 22:32:17.571175+00', 'zum', 'opa', NULL, NULL);
INSERT INTO public.tbl_trip OVERRIDING SYSTEM VALUE VALUES (1, 1, '2020-06-12 14:08:14+00', 'opa', 'zum', '2020-06-13 22:37:25.710907+00', '08:29:11.710907');


--
-- TOC entry 3109 (class 0 OID 16643)
-- Dependencies: 208
-- Data for Name: tbl_trip_stop; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_trip_stop OVERRIDING SYSTEM VALUE VALUES (1, '2020-06-13 00:31:51+00', '2020-06-13 12:11:01+00', 1, 1);
INSERT INTO public.tbl_trip_stop OVERRIDING SYSTEM VALUE VALUES (2, '2020-06-13 22:32:50.239566+00', '2020-06-13 23:32:50+00', 2, NULL);


--
-- TOC entry 3101 (class 0 OID 16399)
-- Dependencies: 200
-- Data for Name: tbl_truck; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_truck OVERRIDING SYSTEM VALUE VALUES (1, 'panzer', 'gmf-1234', '2020-01-01', 1);
INSERT INTO public.tbl_truck OVERRIDING SYSTEM VALUE VALUES (2, 'camarotruck', 'feb-1234', '2021-01-01', 2);


--
-- TOC entry 3098 (class 0 OID 16385)
-- Dependencies: 197
-- Data for Name: tbl_user; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_user OVERRIDING SYSTEM VALUE VALUES (1, 'Gustavo Freitas', '402.224.678-77', 'gustavo', '$2a$06$KpRAhjG5OjkoCToBvvsITuR2.je2PFiUtG3hb8LMcw/4djQHe6Z2u', '2020-06-13 03:02:43.784789+00', '2020-06-13', '+5519981398972');
INSERT INTO public.tbl_user OVERRIDING SYSTEM VALUE VALUES (2, 'Felipe Feber', '402.224.678-55', 'feber', '$2a$06$vPr8Fw6WrcEyNpdu6PbTbePZY/XHtcKDaij1rM0Ug7ZDiSZn8uyU6', '2020-06-13 03:41:02.908944+00', '2020-06-13', '+551233398972');
INSERT INTO public.tbl_user OVERRIDING SYSTEM VALUE VALUES (3, 'Italo Cassio', '402.224.678-55', 'italo', '$2a$06$aOoqRggnHEyIldwR9EY0TOgTgXTRD3hON/V.zEFa/eTOXXueoBRxe', '2020-06-13 04:16:57.757817+00', '2020-06-13', '+551233398972');


--
-- TOC entry 3134 (class 0 OID 0)
-- Dependencies: 209
-- Name: ranking_px_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.ranking_px_id_seq', 36, true);


--
-- TOC entry 3135 (class 0 OID 0)
-- Dependencies: 211
-- Name: tbl_chat_community_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_chat_community_id_seq', 1, true);


--
-- TOC entry 3136 (class 0 OID 0)
-- Dependencies: 213
-- Name: tbl_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_chat_id_seq', 3, true);


--
-- TOC entry 3137 (class 0 OID 0)
-- Dependencies: 215
-- Name: tbl_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_notifications_id_seq', 2, true);


--
-- TOC entry 3138 (class 0 OID 0)
-- Dependencies: 203
-- Name: tbl_point_stop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_point_stop_id_seq', 2, true);


--
-- TOC entry 3139 (class 0 OID 0)
-- Dependencies: 205
-- Name: tbl_point_stop_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_point_stop_review_id_seq', 44, true);


--
-- TOC entry 3140 (class 0 OID 0)
-- Dependencies: 201
-- Name: tbl_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_trip_id_seq', 2, true);


--
-- TOC entry 3141 (class 0 OID 0)
-- Dependencies: 207
-- Name: tbl_trip_stop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_trip_stop_id_seq', 2, true);


--
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 199
-- Name: tbl_truck_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_truck_id_seq', 2, true);


--
-- TOC entry 3143 (class 0 OID 0)
-- Dependencies: 198
-- Name: tbl_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_user_id_seq', 3, true);


--
-- TOC entry 2958 (class 2606 OID 16660)
-- Name: tbl_ranking_px ranking_px_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_ranking_px
    ADD CONSTRAINT ranking_px_pk PRIMARY KEY (id);


--
-- TOC entry 2960 (class 2606 OID 16684)
-- Name: tbl_chat_community tbl_chat_community_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_chat_community
    ADD CONSTRAINT tbl_chat_community_pk PRIMARY KEY (id);


--
-- TOC entry 2962 (class 2606 OID 16693)
-- Name: tbl_chat_community tbl_chat_community_un2; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_chat_community
    ADD CONSTRAINT tbl_chat_community_un2 UNIQUE (group_name);


--
-- TOC entry 2964 (class 2606 OID 16700)
-- Name: tbl_chat tbl_chat_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_chat
    ADD CONSTRAINT tbl_chat_pk PRIMARY KEY (id);


--
-- TOC entry 2948 (class 2606 OID 16537)
-- Name: tbl_point_stop tbl_point_stop_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop
    ADD CONSTRAINT tbl_point_stop_pk PRIMARY KEY (id);


--
-- TOC entry 2952 (class 2606 OID 16438)
-- Name: tbl_point_stop_review tbl_point_stop_review_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_pk PRIMARY KEY (id);


--
-- TOC entry 2954 (class 2606 OID 16635)
-- Name: tbl_point_stop_review tbl_point_stop_review_un; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_un UNIQUE (id_point_stop, id_user, category_type);


--
-- TOC entry 2950 (class 2606 OID 16539)
-- Name: tbl_point_stop tbl_point_stop_un; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop
    ADD CONSTRAINT tbl_point_stop_un UNIQUE (lat_point, long_point);


--
-- TOC entry 2946 (class 2606 OID 16417)
-- Name: tbl_trip tbl_trip_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_trip
    ADD CONSTRAINT tbl_trip_pk PRIMARY KEY (id);


--
-- TOC entry 2956 (class 2606 OID 16648)
-- Name: tbl_trip_stop tbl_trip_stop_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_trip_stop
    ADD CONSTRAINT tbl_trip_stop_pk PRIMARY KEY (id);


--
-- TOC entry 2944 (class 2606 OID 16405)
-- Name: tbl_truck tbl_truck_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_truck
    ADD CONSTRAINT tbl_truck_pk PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 16403)
-- Name: tbl_user tbl_user_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_pk PRIMARY KEY (id);


--
-- TOC entry 2942 (class 2606 OID 16499)
-- Name: tbl_user tbl_user_un; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_un UNIQUE (nickname);


--
-- TOC entry 2976 (class 2620 OID 16619)
-- Name: tbl_point_stop_review tbl_point_stop_review_but; Type: TRIGGER; Schema: public; Owner: pne
--

CREATE TRIGGER tbl_point_stop_review_but AFTER INSERT OR UPDATE ON public.tbl_point_stop_review FOR EACH ROW EXECUTE PROCEDURE public.trigger_calc_reviews();


--
-- TOC entry 2975 (class 2620 OID 16732)
-- Name: tbl_trip tbl_trip_but; Type: TRIGGER; Schema: public; Owner: pne
--

CREATE TRIGGER tbl_trip_but AFTER UPDATE ON public.tbl_trip FOR EACH ROW EXECUTE PROCEDURE public.trigger_time_pass_trip();


--
-- TOC entry 2973 (class 2606 OID 16701)
-- Name: tbl_chat tbl_chat_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_chat
    ADD CONSTRAINT tbl_chat_fk FOREIGN KEY (id_chat_community) REFERENCES public.tbl_chat_community(id);


--
-- TOC entry 2974 (class 2606 OID 16706)
-- Name: tbl_chat tbl_chat_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_chat
    ADD CONSTRAINT tbl_chat_user_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


--
-- TOC entry 2967 (class 2606 OID 16620)
-- Name: tbl_point_stop_review tbl_point_stop_review_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


--
-- TOC entry 2968 (class 2606 OID 16625)
-- Name: tbl_point_stop_review tbl_point_stop_review_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_fk_1 FOREIGN KEY (id_point_stop) REFERENCES public.tbl_point_stop(id);


--
-- TOC entry 2971 (class 2606 OID 16667)
-- Name: tbl_ranking_px tbl_ranking_px_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_ranking_px
    ADD CONSTRAINT tbl_ranking_px_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


--
-- TOC entry 2972 (class 2606 OID 16672)
-- Name: tbl_ranking_px tbl_ranking_px_trip_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_ranking_px
    ADD CONSTRAINT tbl_ranking_px_trip_fk FOREIGN KEY (id_trip) REFERENCES public.tbl_trip(id);


--
-- TOC entry 2966 (class 2606 OID 16418)
-- Name: tbl_trip tbl_trip_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_trip
    ADD CONSTRAINT tbl_trip_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


--
-- TOC entry 2969 (class 2606 OID 16649)
-- Name: tbl_trip_stop tbl_trip_stop_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_trip_stop
    ADD CONSTRAINT tbl_trip_stop_fk FOREIGN KEY (id_trip) REFERENCES public.tbl_trip(id);


--
-- TOC entry 2970 (class 2606 OID 24822)
-- Name: tbl_trip_stop tbl_trip_stop_point_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_trip_stop
    ADD CONSTRAINT tbl_trip_stop_point_fk FOREIGN KEY (id_point_stop) REFERENCES public.tbl_point_stop(id);


--
-- TOC entry 2965 (class 2606 OID 16406)
-- Name: tbl_truck tbl_truck_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_truck
    ADD CONSTRAINT tbl_truck_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


-- Completed on 2020-06-14 14:50:56 -03

--
-- PostgreSQL database dump complete
--
