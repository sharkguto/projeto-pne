--
-- PostgreSQL database dump
--

-- Dumped from database version 11.8
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-4)

-- Started on 2020-06-13 10:07:11 -03

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


ALTER SCHEMA public OWNER TO pne;

--
-- TOC entry 3053 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pne
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 658 (class 1247 OID 16452)
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
-- TOC entry 255 (class 1255 OID 16594)
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
-- TOC entry 256 (class 1255 OID 16614)
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

SET default_tablespace = '';

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
-- TOC entry 3054 (class 0 OID 0)
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
    destiny character varying(256)
);


ALTER TABLE public.tbl_trip OWNER TO pne;

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
-- TOC entry 3045 (class 0 OID 16426)
-- Dependencies: 204
-- Data for Name: tbl_point_stop; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_point_stop OVERRIDING SYSTEM VALUE VALUES (1, 123132321.231213316, -231213231.123213232, '["combustivel", "alimentação"]', '{"quality":3,"security":4.75,"price":5,"clean":4.75}', '2020-06-13 12:58:39.140457+00');
INSERT INTO public.tbl_point_stop OVERRIDING SYSTEM VALUE VALUES (2, 231213123.111000001, 12321312.1109999996, NULL, '{"price":2.33333333333333348,"security":2.33333333333333348,"quality":2.33333333333333348,"clean":2.33333333333333348}', '2020-06-13 12:58:39.140457+00');


--
-- TOC entry 3047 (class 0 OID 16434)
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
-- TOC entry 3043 (class 0 OID 16413)
-- Dependencies: 202
-- Data for Name: tbl_trip; Type: TABLE DATA; Schema: public; Owner: pne
--



--
-- TOC entry 3041 (class 0 OID 16399)
-- Dependencies: 200
-- Data for Name: tbl_truck; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_truck OVERRIDING SYSTEM VALUE VALUES (1, 'panzer', 'gmf-1234', '2020-01-01', 1);


--
-- TOC entry 3038 (class 0 OID 16385)
-- Dependencies: 197
-- Data for Name: tbl_user; Type: TABLE DATA; Schema: public; Owner: pne
--

INSERT INTO public.tbl_user OVERRIDING SYSTEM VALUE VALUES (1, 'ze gustavo', '402.224.678-77', 'ze gustavo', '$2a$06$KpRAhjG5OjkoCToBvvsITuR2.je2PFiUtG3hb8LMcw/4djQHe6Z2u', '2020-06-13 03:02:43.784789+00', '2020-06-13', '+5519981398972');
INSERT INTO public.tbl_user OVERRIDING SYSTEM VALUE VALUES (2, 'ze feber', '402.224.678-55', 'ze feber', '$2a$06$vPr8Fw6WrcEyNpdu6PbTbePZY/XHtcKDaij1rM0Ug7ZDiSZn8uyU6', '2020-06-13 03:41:02.908944+00', '2020-06-13', '+551233398972');
INSERT INTO public.tbl_user OVERRIDING SYSTEM VALUE VALUES (3, 'ze italo', '402.224.678-55', 'ze italo', '$2a$06$aOoqRggnHEyIldwR9EY0TOgTgXTRD3hON/V.zEFa/eTOXXueoBRxe', '2020-06-13 04:16:57.757817+00', '2020-06-13', '+551233398972');


--
-- TOC entry 3055 (class 0 OID 0)
-- Dependencies: 203
-- Name: tbl_point_stop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_point_stop_id_seq', 2, true);


--
-- TOC entry 3056 (class 0 OID 0)
-- Dependencies: 205
-- Name: tbl_point_stop_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_point_stop_review_id_seq', 44, true);


--
-- TOC entry 3057 (class 0 OID 0)
-- Dependencies: 201
-- Name: tbl_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_trip_id_seq', 1, false);


--
-- TOC entry 3058 (class 0 OID 0)
-- Dependencies: 199
-- Name: tbl_truck_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_truck_id_seq', 1, true);


--
-- TOC entry 3059 (class 0 OID 0)
-- Dependencies: 198
-- Name: tbl_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pne
--

SELECT pg_catalog.setval('public.tbl_user_id_seq', 3, true);


--
-- TOC entry 2905 (class 2606 OID 16537)
-- Name: tbl_point_stop tbl_point_stop_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop
    ADD CONSTRAINT tbl_point_stop_pk PRIMARY KEY (id);


--
-- TOC entry 2909 (class 2606 OID 16438)
-- Name: tbl_point_stop_review tbl_point_stop_review_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_pk PRIMARY KEY (id);


--
-- TOC entry 2911 (class 2606 OID 16635)
-- Name: tbl_point_stop_review tbl_point_stop_review_un; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_un UNIQUE (id_point_stop, id_user, category_type);


--
-- TOC entry 2907 (class 2606 OID 16539)
-- Name: tbl_point_stop tbl_point_stop_un; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop
    ADD CONSTRAINT tbl_point_stop_un UNIQUE (lat_point, long_point);


--
-- TOC entry 2903 (class 2606 OID 16417)
-- Name: tbl_trip tbl_trip_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_trip
    ADD CONSTRAINT tbl_trip_pk PRIMARY KEY (id);


--
-- TOC entry 2901 (class 2606 OID 16405)
-- Name: tbl_truck tbl_truck_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_truck
    ADD CONSTRAINT tbl_truck_pk PRIMARY KEY (id);


--
-- TOC entry 2897 (class 2606 OID 16403)
-- Name: tbl_user tbl_user_pk; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_pk PRIMARY KEY (id);


--
-- TOC entry 2899 (class 2606 OID 16499)
-- Name: tbl_user tbl_user_un; Type: CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_un UNIQUE (nickname);


--
-- TOC entry 2916 (class 2620 OID 16619)
-- Name: tbl_point_stop_review tbl_point_stop_review_but; Type: TRIGGER; Schema: public; Owner: pne
--

CREATE TRIGGER tbl_point_stop_review_but AFTER INSERT OR UPDATE ON public.tbl_point_stop_review FOR EACH ROW EXECUTE PROCEDURE public.trigger_calc_reviews();


--
-- TOC entry 2914 (class 2606 OID 16620)
-- Name: tbl_point_stop_review tbl_point_stop_review_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


--
-- TOC entry 2915 (class 2606 OID 16625)
-- Name: tbl_point_stop_review tbl_point_stop_review_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_point_stop_review
    ADD CONSTRAINT tbl_point_stop_review_fk_1 FOREIGN KEY (id_point_stop) REFERENCES public.tbl_point_stop(id);


--
-- TOC entry 2913 (class 2606 OID 16418)
-- Name: tbl_trip tbl_trip_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_trip
    ADD CONSTRAINT tbl_trip_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


--
-- TOC entry 2912 (class 2606 OID 16406)
-- Name: tbl_truck tbl_truck_fk; Type: FK CONSTRAINT; Schema: public; Owner: pne
--

ALTER TABLE ONLY public.tbl_truck
    ADD CONSTRAINT tbl_truck_fk FOREIGN KEY (id_user) REFERENCES public.tbl_user(id);


-- Completed on 2020-06-13 10:07:12 -03

--
-- PostgreSQL database dump complete
--
