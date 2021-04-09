drop schema if exists quiz cascade;
create schema quiz;
set search_path to quiz;

create table utilisateur
(
    util_id serial primary key,
    util_name varchar,
    util_password varchar
);

insert into utilisateur(util_name,util_password) values('clev','clev'),('momo','momo'),('leo','leo');


create table quiz
(
    quiz_id serial primary key,
    quiz_name varchar,
    quiz_image varchar,
    quiz_keyword varchar,
    user_id int references utilisateur(util_id) on delete cascade

);

insert into quiz(quiz_name,quiz_image,quiz_keyword) values('A quel point êtes-vous fan de Star Wars ?','http://localhost:8000/img/wp4001476.jpg','star wars');

create table question
(
    ques_id serial primary key,
    ques_phrase varchar,
    ques_points int check(ques_points > 0),
    quiz_id int references quiz(quiz_id) on delete cascade

);

insert into question(ques_phrase,ques_points,quiz_id) values('Qui est le père de Luke ?',1,1),
                                                             ('En 2000, le nom du premier opus à changer pour devenir ?',1,1),
                                                             ('Comment se nomme le père de Boba Fett ?',1,1),
                                                             ('Qui deviendra le nouvel apprenti du seigneur Palpatine après la mort de Darth Maul ?',1,1),
                                                             ('De quelle planète est originaire Anakin Skywalker ?',4,1),
                                                             ('Comment est morte la mère d Anakin Skywalker ?',1,1),
                                                             ('La peur mène à la colère, la colère mène à la haine, la haine mène à ... ?',1,1),
                                                             ('Comment est morte la reine Padmé Amidala ?',1,1);


create table proposition
(
    prop_id serial primary key,
    prop_phrase varchar,
    prop_image varchar,
    prop_valide boolean,
    ques_id int references question(ques_id) on delete cascade

);

insert into proposition(prop_phrase,prop_image,prop_valide,ques_id) values('Obi-Wan Kenobi','',false,1),
                                                                           ('Boba Fett', '', false, 1),
                                                                           ('Anakin Skywalker ', '', true, 1),
                                                                           ('Jabba le Hutt ', '', false, 1),
                                                                           ('La revanche des siths ', '', false, 2),
                                                                           ('L empire contre-attaque ', '', false, 2),
                                                                           ('La menace fantôme ', '', false, 2),
                                                                           ('Un nouvel espoir ', '', true, 2),
                                                                           ('Ryze Fett', '', false, 3),
                                                                           ('Michael Fett', '', false, 3),
                                                                           ('James Fett ', '', false, 3),
                                                                           ('Jango Fett ', '', true, 3),
                                                                           ('Le compte Doku', '', true, 4),
                                                                           ('Darth Vader', '', false, 4),
                                                                           ('Jar Jar Binks', '', false, 4),
                                                                           ('Kylo Ren', '', false, 4),
                                                                           ('Tatooine', '', true, 5),
                                                                           ('Hoth', '', false, 5),
                                                                           ('Alderande', '', false, 5),
                                                                           ('Coruscant', '', false, 5),
                                                                           ('Par Darth Vader', '', false, 6),
                                                                           ('Par les hommes des sables', '', true, 6),
                                                                           ('Par le compte Doku', '', false, 6),
                                                                           ('Elle est morte de viellesse', '', false, 6),
                                                                           ('la mort', '', false, 7),
                                                                           ('l obscurité', '', false, 7),
                                                                           ('la rédemption', '', false, 7),
                                                                           ('la souffrance', '', true, 7),
                                                                           ('pendant son accouchement', '', true, 8),
                                                                           ('Tué par Darth Sidious', '', false, 8),
                                                                           ('Tué par Darth Maul', '', false, 8)
                                                                           ;


-- create table item
-- (
--     item_id serial primary key,
--     item_name varchar
-- );
--
-- insert into item (item_name) values('peinture'),('sculpture');

select * from quiz;

select * from question natural join quiz;
