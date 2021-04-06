drop schema if exists quiz;
create schema quiz;
set search_path to quiz;

create table user
(
    user_id serial primary key,
    name varchar,
    password varchar
);

insert into user(name) values('John'),('Rosy'),('Pierre');