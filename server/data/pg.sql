drop schema if exists quiz cascade;
create schema quiz;
set search_path to quiz;

create table "user"
(
    user_id serial primary key,
    user_name varchar,
    user_password varchar
);

insert into "user"(user_name,user_password) values('John','John'),('Rosy','Rosy'),('Pierre','Pierre');


create table quiz
(
    quiz_id serial primary key,
    quiz_name varchar,
    quiz_image varchar,
    quiz_keyword varchar,
    user_id int references "user"(user_id)

);

insert into quiz(quiz_name) values('quiz 1'),('quiz 2');

create table question
(
    ques_id serial primary key,
    ques_phrase varchar,
    ques_points int check(ques_points > 0),
    quiz_id int references quiz(quiz_id)

);

insert into question(ques_phrase,ques_points,quiz_id) values('Qui est le plus beau ?',10,1),('Quel est le meilleur plat ?',5,1),('Qui est le meilleur patron ?',5,1),('Qui est le plus moche ?',10,2),('Quel est le pire plat ?',5,2),('Qui est le meilleur prof ?',5,2);

create table proposition
(
    prop_id serial primary key,
    prop_phrase varchar,
    prop_image varchar,
    prop_valide boolean,
    ques_id int references question(ques_id)

);

insert into proposition(prop_phrase,prop_valide,ques_id) values('Momo',true,1),('Cleveland',true,1),('Leo',true,1),('Lasagnes',true,2),('Frites',false,2),('Jeff Bezos',false,3),('Momo',true,3),('Jul',false,3),('Steve Jobs',true,3),('Momo',false,4),('Cleveland',false,4),('Leo',false,4),('Asticot',true,5),('Ver',true,5),('Condota',false,6),('OR',false,6),('JM-Lagniez',true,6);

select * from quiz;

select * from question natural join quiz;
