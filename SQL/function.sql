CREATE OR REPLACE FUNCTION create_account(
    _username varchar(255),
    _password varchar(255),
    _type int
)
RETURNS SETOF account AS
$$
BEGIN
	-- 	Check if username has been used yet
	IF EXISTS (SELECT * FROM account WHERE username = _username) THEN
 		RAISE unique_violation USING HINT = 'Username ' || _username || ' has been used';
	END IF;
	
	RETURN QUERY
	INSERT INTO
		account(username, password, type)
	VALUES
		(_username, _password, _type)
	RETURNING *;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_user(
    _user_id int,
    _name varchar(255),
    _school varchar(255),
    _class varchar(255),
    _score INT,
    _rank int,
    _email varchar(255),
    _phone character(10)
)
RETURNS SETOF users AS
$$
BEGIN
	-- 	Check if username has been used yet
	IF EXISTS (SELECT * FROM users WHERE user_id = _user_id) THEN
 		RAISE unique_violation USING HINT = 'User_id ' || _user_id || ' has been used';
	END IF;
	
	RETURN QUERY
	INSERT INTO Users (user_id,name,school,class,score,rank,email,phone)
	VALUES
		(_user_id,_name,_school,_class,_score,_rank,_email,_phone)
	RETURNING *;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM create_user(3,'xxxxsxx','THCS asda asasd asd','6',0,0,'duchuy291199@gmail.com','1234567890');
-- SELECT * FROM create_account('cuong234','12345',1);