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

insert into quiz(quiz_name,quiz_image,quiz_keyword) values('quiz 1','http://localhost:8000/img/ul6rv.jpg','good'),
                                                          ('quiz 2','http://localhost:8000/img/25595.jpg','bad'),
                                                           ('A quel point êtes-vous fan de Star Wars ?','http://localhost:8000/img/wp4001476.jpg','star wars');

create table question
(
    ques_id serial primary key,
    ques_phrase varchar,
    ques_points int check(ques_points > 0),
    quiz_id int references quiz(quiz_id) on delete cascade

);

insert into question(ques_phrase,ques_points,quiz_id) values('Qui est le plus beau ?',10,1),
                                                             ('Quel est le meilleur plat ?',5,1),
                                                             ('Qui est le meilleur patron ?',5,1),
                                                             ('Qui est le plus moche ?',10,2),
                                                             ('Quel est le pire plat ?',5,2),
                                                             ('Qui est le meilleur prof ?',5,2),
                                                             ('Quelle image est la moins drôle ?',10,2),
                                                             ('Est-ce une question inutile ?',1,2),
                                                             ('Qui est le père de Luke ?',1,3),
                                                             ('En 2000, le nom du premier opus à changer pour devenir ?',1,3),
                                                             ('Comment se nomme le père de Boba Fett ?',1,3),
                                                             ('Qui deviendra le nouvel apprenti du seigneur Palpatine après la mort de Darth Maul ?',1,3),
                                                             ('De quelle planète est originaire Anakin Skywalker ?',4,3),
                                                             ('Comment est morte la mère d Anakin Skywalker ?',1,3),
                                                             ('La peur mène à la colère, la colère mène à la haine, la haine mène à ... ?',1,3),
                                                             ('Comment est morte la reine Padmé Amidala ?',1,3);


create table proposition
(
    prop_id serial primary key,
    prop_phrase varchar,
    prop_image varchar,
    prop_valide boolean,
    ques_id int references question(ques_id) on delete cascade

);

insert into proposition(prop_phrase,prop_image,prop_valide,ques_id) values('Momo','',true,1),
                                                                          ('Cleveland','',true,1),
                                                                          ('Leo','',true,1),
                                                                          ('Lasagnes','',true,2),
                                                                          ('Frites','',false,2),
                                                                          ('Jeff Bezos','',false,3),
                                                                          ('Momo','',true,3),
                                                                          ('Jul','',false,3),
                                                                          ('Steve Jobs','',true,3),
                                                                          ('Momo','',false,4),
                                                                          ('Cleveland','',false,4),
                                                                          ('Leo','',false,4),
                                                                          ('Asticot','',true,5),
                                                                          ('Ver','',true,5),
                                                                          ('Condota','',false,6),
                                                                          ('OR','',false,6),
                                                                          ('JM-Lagniez','',true,6),
                                                                          ('','http://localhost:8000/img/25595.jpg',true,7),
                                                                          ('','http://localhost:8000/img/ul6rv.jpg',false,7),
                                                                          ('Oui','',true,8),
                                                                          ('Non','',false,8),
                                                                           ('Obi-Wan Kenobi','',false,9),
                                                                           ('Boba Fett', '', false, 9),
                                                                           ('Anakin Skywalker ', '', true, 9),
                                                                           ('Jabba le Hutt ', '', false, 9),
                                                                           ('La revanche des siths ', '', false, 10),
                                                                           ('L empire contre-attaque ', '', false, 10),
                                                                           ('La menace fantôme ', '', false, 10),
                                                                           ('Un nouvel espoir ', '', true, 10),
                                                                           ('Ryze Fett', '', false, 11),
                                                                           ('Michael Fett', '', false, 11),
                                                                           ('James Fett ', '', false, 11),
                                                                           ('Jango Fett ', '', true, 11),
                                                                           ('Le compte Doku', '', true, 12),
                                                                           ('Darth Vader', '', false, 12),
                                                                           ('Jar Jar Binks', '', false, 12),
                                                                           ('Kylo Ren', '', false, 12),
                                                                           ('Tatooine', '', true, 13),
                                                                           ('Hoth', '', false, 13),
                                                                           ('Alderande', '', false, 13),
                                                                           ('Coruscant', '', false, 13),
                                                                           ('Par Darth Vader', '', false, 14),
                                                                           ('Par les hommes des sables', '', true, 14),
                                                                           ('Par le compte Doku', '', false, 14),
                                                                           ('Elle est morte de viellesse', '', false, 14),
                                                                           ('la mort', '', false, 15),
                                                                           ('l obscurité', '', false, 15),
                                                                           ('la rédemption', '', false, 15),
                                                                           ('la souffrance', '', true, 15),
                                                                           ('pendant son accouchement', '', true, 16),
                                                                           ('Tué par Darth Sidious', '', false, 16),
                                                                           ('Tué par Darth Maul', '', false, 16)
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
