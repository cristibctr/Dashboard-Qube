    --
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-05-04 18:06:11

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

SET default_tablespace = '';

SET default_table_access_method = heap;

-- USERS

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    date_of_birth date NOT NULL,
    phone_number character varying(255),
    city character varying(255),
    country character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);

ALTER TABLE public.users OWNER TO postgres;

CREATE SEQUENCE public.foo_a_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.foo_a_seq OWNER TO postgres;

ALTER SEQUENCE public.foo_a_seq OWNED BY public.users.id;

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.foo_a_seq'::regclass);

SELECT pg_catalog.setval('public.foo_a_seq', 42, true);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

-- APPOINTMENTS

CREATE TABLE public.appointments (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255),
    contact_type character varying(255) NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    created_by_user integer NOT NULL,
    assigned_to_user integer NOT NULL
);


ALTER TABLE public.appointments OWNER TO postgres;

ALTER TABLE public.appointments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.appointments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT assigned_to_fk FOREIGN KEY (assigned_to_user) REFERENCES public.users(id);

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by_user) REFERENCES public.users(id);

-- TASKS

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255),
    priority character varying(255) NOT NULL,
    done boolean NOT NULL DEFAULT FALSE,
    due_date timestamp without time zone NOT NULL,
    created_by_user integer NOT NULL,
    assigned_to_user integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

ALTER TABLE public.tasks ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT assigned_to_fk FOREIGN KEY (assigned_to_user) REFERENCES public.users(id);

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by_user) REFERENCES public.users(id);

-- ADD USERS

INSERT INTO public.users(
	first_name, last_name, date_of_birth, phone_number, city, country, email, password)
	VALUES ('second admin', 'second admin', '2000-11-11', '0040733234344',	'Iasi',	'Romania',	'admin2@admin.com',	'Password1!');
	
INSERT INTO public.users(
	first_name, last_name, date_of_birth, phone_number, city, country, email, password)
	VALUES ('first admin', 'first admin', '1950-11-11', '0040733234344',	'Bucuresti',	'Romania',	'admin1@admin.com',	'Password1!');

-- Individual Clients


    CREATE TABLE public.individual_clients (
                                               id integer NOT NULL,
                                               salutation character varying NOT NULL,
                                               first_name character varying(25) NOT NULL,
                                               last_name character varying(25),
                                               date_of_birth date NOT NULL,
                                               nationality character varying,
                                               street_name character varying(30),
                                               number character varying(11),
                                               company_name character varying(30),
                                               apartment character varying(5),
                                               suite character varying(5),
                                               unit character varying(5),
                                               building character varying(5),
                                               floor character varying(4),
                                               postal_code character varying(10),
                                               city character varying(25),
                                               country character varying(25),
                                               email character varying(30),
                                               phone_number character varying(13)
    );


    ALTER TABLE public.individual_clients OWNER TO postgres;

    ALTER TABLE ONLY public.individual_clients
        ADD CONSTRAINT individual_clients_pkey PRIMARY KEY (id);

    ALTER TABLE ONLY public.individual_clients
        ADD CONSTRAINT unique_email UNIQUE (email);
