CREATE DATABASE if not exists mvc_express; 

USE mvc_express;
CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');


DROP TABLE IF EXISTS user;
 CREATE TABLE user ( 
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  is_admin bool,
  unique(email)
);

INSERT INTO user (email,password,is_admin) VALUES ('user@demo.com','1234',0),('admin@demo.com', '1234',1);

 CREATE TABLE upload ( 
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  url varchar(255) NOT NULL,
  unique(url),
  created_at timestamp default CURRENT_TIMESTAMP
);

ALTER TABLE user ADD COLUMN avatar int(11), ADD CONSTRAINT fk_avatar_upload_id FOREIGN KEY (avatar) REFERENCES upload(id);
