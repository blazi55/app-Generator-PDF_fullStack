create table pdf (
	id bigint auto_increment primary key,
    title varchar(35),
    description longtext,
    fontSizeTitle bigint,
    fontSizeDescription bigint
);