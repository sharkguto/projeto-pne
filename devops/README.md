# queries de ajuda

## arquivo.sql

```sql
create type category_type_c as enum('security', 'price', 'clean','quality');


-- drop type 


ALTER TABLE public.tbl_point_stop_review ALTER COLUMN category_type TYPE serial8 USING category_type::serial8;

ALTER TABLE public.tbl_point_stop_review DROP COLUMN category_type

ALTER TABLE public.tbl_point_stop_review ADD COLUMN category_type category_type_c not null;

ALTER TABLE public.tbl_point_stop_review ADD CONSTRAINT tbl_point_stop_review_un UNIQUE (id_point_stop,id_user,category_type);





select * from public.tbl_point_stop_review;


-- password

create extension pgcrypto

-- criar user
INSERT INTO public.tbl_user (name, cpf, nickname,password,birthday,cellphone) VALUES (
    'ze italo','402.224.678-55','ze italo',crypt('senha123', gen_salt('bf')),now(),'+551233398972')
  
-- selecionar 

select * from  public.tbl_user where nickname = 'ze italo' and "password" = crypt('senha123', "password" )
        

-- truncate table    

TRUNCATE TABLE public.tbl_user RESTART identity cascade;



-- insert review

insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (1,2,1 ,'price')


insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,3,5 ,'price');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,3,5 ,'security');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,3,5 ,'quality');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,3,5 ,'clean');

insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,2,1 ,'price');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,2,1 ,'security');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,2,1 ,'quality');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,2,1 ,'clean');


insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,1,1 ,'price');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,1,1 ,'security');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,1,1 ,'quality');
insert into public.tbl_point_stop_review (id_point_stop ,id_user ,rating ,category_type) values (2,1,1 ,'clean');




select * from public.tbl_point_stop_review

--

select * from public.tbl_point_stop 

-- update average reviews

UPDATE public.tbl_point_stop SET reviews_avg = json_object_set_key(reviews_avg,'security',0) where id=1;


-- trigger automatic

CREATE OR REPLACE FUNCTION "trigger_calc_reviews"() RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE public.tbl_point_stop SET reviews_avg = json_object_set_key(reviews_avg,new.category_type::text ,(select coalesce(avg(rating ),0) as rating 
	from public.tbl_point_stop_review where category_type = NEW.category_type and id_point_stop = NEW.id_point_stop)) where id=NEW.id_point_stop;
	RETURN NEW;
END;
$BODY$
language plpgsql;


CREATE TRIGGER tbl_point_stop_review_but
AFTER insert or UPDATE ON "public".tbl_point_stop_review
FOR EACH ROW
EXECUTE PROCEDURE trigger_calc_reviews();



-- criei uma function pra trocar o valor direto no json

CREATE OR REPLACE FUNCTION "json_object_set_key"(
  "json"          json,
  "key_to_set"    TEXT,
  "value_to_set"  anyelement
)
  RETURNS json
  LANGUAGE sql
  IMMUTABLE
  STRICT
AS $function$
SELECT concat('{', string_agg(to_json("key") || ':' || "value", ','), '}')::json
  FROM (SELECT *
          FROM json_each("json")
         WHERE "key" <> "key_to_set"
         UNION ALL
        SELECT "key_to_set", to_json("value_to_set")) AS "fields"
$function$;


-- criar trigger para quando o finished_at ser preenchido, fazer diff do 


-- select (finished_at - created_at )::time as timeleft from public.tbl_trip where id = new.id
select * from public.tbl_trip tt 


CREATE TRIGGER tbl_trip_but
after UPDATE ON "public".tbl_trip 
FOR EACH ROW
EXECUTE PROCEDURE trigger_time_pass_trip();


CREATE OR REPLACE FUNCTION "trigger_time_pass_trip"() RETURNS TRIGGER AS
$BODY$
begin
	IF NEW.finished_at <> OLD.finished_at THEN
		update public.tbl_trip set 
		minutes_trip_at = (select (finished_at - created_at )::time as timeleft 
		from public.tbl_trip where id = new.id) where id = new.id;
	END IF;
	RETURN NEW;
END;
$BODY$
language plpgsql;


select us.nickname , sum (trp.points ), max(trp.created_at ) as last_active_date 
from tbl_ranking_px trp 
inner join tbl_user us on trp.id_user =us.id 
group by us.nickname 

```
