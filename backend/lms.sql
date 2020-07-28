--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: classrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classrooms (
    classroom_id integer NOT NULL,
    classroom_name character varying(100) NOT NULL,
    teacher_id integer NOT NULL,
    number_of_students integer DEFAULT 0,
    timings character varying(20),
    days character varying(10)[],
    useful_resources text[],
    teacher_name character varying(100) NOT NULL,
    subject character varying(20)
);


ALTER TABLE public.classrooms OWNER TO postgres;

--
-- Name: classes_class_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classes_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classes_class_id_seq OWNER TO postgres;

--
-- Name: classes_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classes_class_id_seq OWNED BY public.classrooms.classroom_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: user_classroom_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_classroom_map (
    user_id integer NOT NULL,
    classroom_id integer NOT NULL,
    date_enrolled character varying(10),
    date_created character varying(10)
);


ALTER TABLE public.user_classroom_map OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(50),
    phone character varying(15) NOT NULL,
    password character varying(100) NOT NULL,
    date_of_birth character varying(10),
    city character varying(20),
    state character varying(20),
    name character varying(100) NOT NULL,
    type character varying(10) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: classrooms classroom_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classrooms ALTER COLUMN classroom_id SET DEFAULT nextval('public.classes_class_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: classrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classrooms (classroom_id, classroom_name, teacher_id, number_of_students, timings, days, useful_resources, teacher_name, subject) FROM stdin;
7	New Class	5	16	9am to 10am	{Monday}	{"Class Notes: NCERT"}	teacher 1	Physics
2	Faraz Classes	5	4	9am to 11am	{Monday}	{"Class Notes: NCERT","Notes: Class Notes"}	teacher 1	Maths
8	First Class	5	26	9am to 10am	{Monday}	{"Class Notes: NCERT","Notes: Class Notes","Extra: Other resources","Favourite: My favourite resourcce"}	teacher 1	Chemistry
14	Computer Class	5	4	6pm to 12pm	{Monday,Wednesday," Friday"," Sunday"}	{"Notes: Class Notes"}	teacher 1	Computer
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
Yz6Q4TdITYK2q7lG5339r04yhCySGIXX	{"cookie":{"originalMaxAge":86400000,"expires":"2020-07-29T06:04:40.541Z","httpOnly":false,"path":"/","sameSite":true},"name":"teacher 1","userId":5,"type":"teacher"}	2020-07-29 11:34:41
\.


--
-- Data for Name: user_classroom_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_classroom_map (user_id, classroom_id, date_enrolled, date_created) FROM stdin;
5	2		2020-07-25
5	7		2020-07-27
5	8		2020-07-27
2	8	2020-07-27	
2	2	2020-07-28	
8	2	2020-07-28	
10	2	2020-07-28	
4	2	2020-07-28	
5	14		2020-07-28
2	14	2020-07-28	
10	14	2020-07-28	
4	14	2020-07-28	
7	14	2020-07-28	
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, email, phone, password, date_of_birth, city, state, name, type) FROM stdin;
2		1111111111	$2b$05$4I8tSb4TO2FEjO2h2VGvZuFunFK4WxbQb00DMbB462i7AcWTY1SxG				Faraz	student
4		9827012012	$2b$05$0ZEUPUfxJTvmxr9HSS4CXeqzbPOtiDZDTWVyqZLT4v68XB.7m3BhS				student 2	student
5		8991741921	$2b$05$y6qgMU9ZsxKsw4ByLORXiek33JcZGwy5HtFcLCPdhEoNTGFs/8OR.		Nanded	Maharashtra	teacher 1	teacher
6	teacher2@teacher.com	8501285921	$2b$05$4i5HgxjazU9T8ikAZ32Ym.VwOJdtYird4QBruT7APQL9/X9g0.TQ2		Nanded	Maharashtra	teacher 2	teacher
7	student3@student.com	9425010231	$2b$05$asiZ/LbhLq2LEdkDxojGGu4dT2NxErOvo9nXFpbZyzdKN/3pf45Jq	03-12-1996	Pune	Maharashtra	student 3	student
8		9818123237	$2b$05$ldz/URvARx0CK5WTYR/2MeRTw63yIBBfe06TId4L0tPdOm6UbcLWe				student 4	student
9		9308712123	$2b$05$fLDf3lURvXio/DSmlVFqKun526JhETiONZncS8qlYBqFQR88WfHru				student 5	student
10		9425012345	$2b$05$tLWm/p4GY8lty9ifMxOJtuIfZRGLy6MBdYoWo1tWLZhtHS5quHSp2				student 5	student
11		9928410231	$2b$05$r5Ma.ChcdA3X1TNru.EIhuP1sPnOL2szmir6i.BDsVX2.RghJc6Yy		Pune	Maharashtra	teacher 3	teacher
12		9121212421	$2b$05$4dpbGNI3loeRr2y3e68Dd.TYG33HXXrjz6LbfYVz9OPqwSUmw/E0i		Mumbai	Maharashtra	teacher 4	teacher
\.


--
-- Name: classes_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classes_class_id_seq', 14, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- Name: classrooms classroom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classrooms
    ADD CONSTRAINT classroom_pkey PRIMARY KEY (classroom_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users unique_phone_number; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_phone_number UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: classroom_details_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classroom_details_index ON public.classrooms USING btree (classroom_id);


--
-- Name: classroom_map_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classroom_map_index ON public.user_classroom_map USING btree (classroom_id);


--
-- Name: user_classroom_pair_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_classroom_pair_unique ON public.user_classroom_map USING btree (user_id, classroom_id);


--
-- Name: user_details_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_details_index ON public.users USING btree (user_id);


--
-- Name: user_map_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_map_index ON public.user_classroom_map USING btree (user_id);


--
-- Name: classrooms classrooms_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classrooms
    ADD CONSTRAINT classrooms_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(user_id);


--
-- Name: user_classroom_map user_classroom_map_classroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_classroom_map
    ADD CONSTRAINT user_classroom_map_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classrooms(classroom_id);


--
-- Name: user_classroom_map user_classroom_map_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_classroom_map
    ADD CONSTRAINT user_classroom_map_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

