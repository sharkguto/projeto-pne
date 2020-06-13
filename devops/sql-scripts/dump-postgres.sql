--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4 (Debian 11.4-1.pgdg90+1)
-- Dumped by pg_dump version 11.4 (Ubuntu 11.4-1.pgdg18.04+1)

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
-- Name: test; Type: SCHEMA; Schema: -; Owner: brasil317
--

CREATE SCHEMA test;
CREATE SCHEMA logs;
CREATE SCHEMA auctions;


ALTER SCHEMA test OWNER TO brasil317;
ALTER SCHEMA logs OWNER TO brasil317;
ALTER SCHEMA auctions OWNER TO brasil317;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: company; Type: TABLE; Schema: test; Owner: brasil317
--

CREATE TABLE test.company (
    id integer NOT NULL,
    name text NOT NULL,
    age integer NOT NULL,
    address character(50),
    salary real
);

CREATE TABLE logs.tbl_action_bid_log (
	id SERIAL NOT NULL,
	username varchar(150) NULL,
	auction_number varchar(100) NULL,
	portal varchar(10) NULL,
	buyer_unit varchar(50) NULL,
	txt_action varchar(500) NULL,
	CONSTRAINT tbl_action_bid_log_pk PRIMARY KEY (id)
);

ALTER TABLE test.company OWNER TO brasil317;
ALTER TABLE logs.tbl_action_bid_log OWNER TO brasil317;

--
-- Data for Name: company; Type: TABLE DATA; Schema: test; Owner: brasil317
--

INSERT INTO test.company VALUES (10, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (9, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (8, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (7, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (6, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (5, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (4, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (3, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (2, 'b', 2, 'n', 2.0999999);
INSERT INTO test.company VALUES (1, 'b', 2, 'n', 2.0999999);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: test; Owner: brasil317
--

ALTER TABLE ONLY test.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);

--
-- PostgreSQL database dump complete
--


-- DROP TABLE auctions.tbl_control_win_lose_bids;
 
CREATE TABLE auctions.tbl_control_win_lose_bids (
    id bigserial NOT NULL,
    buyer_unit varchar(50) NOT NULL,
    auction_number varchar(50) NOT NULL,
    portal varchar(10) NOT NULL,
    item_number varchar(10) NOT NULL,
    winner bool NOT NULL,
    value_won numeric(15,4) NOT NULL,
    account varchar(50) NOT NULL,
    affiliate varchar(50) NULL,
    CONSTRAINT tbl_control_win_loose_bids_pk PRIMARY KEY (id)
);

