CREATE TABLE users(
    user_id int AUTO_INCREMENT NOT NULL,
    login_id char(4) UNIQUE NOT NULL,
    name varchar(20) NOT NULL,
    password varchar(128) NOT NULL,
    PRIMARY KEY (user_id)
) auto_increment = 1;

CREATE TABLE activity(
    activity_id int AUTO_INCREMENT NOT NULL,
    user_id int NOT NULL,
    type varchar(10) NOT NULL,
    datetime DATETIME NOT NULL,
    PRIMARY KEY (activity_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) auto_increment = 1;

CREATE TABLE absent(
    absent_id int AUTO_INCREMENT NOT NULL,
    author_id int NOT NULL,
    type varchar(10) NOT NULL,
    date DATE NOT NULL,
    update_time DATETIME NOT NULL,
    PRIMARY KEY (absent_id),
    FOREIGN KEY (author_id) REFERENCES users(user_id)
) auto_increment = 1;

INSERT INTO
    users(login_id, name, password)
VALUES
    ('1101', 'Hoge Hoge', 'hogehoge'),
    ('1201', 'Sample', 'sample'),
    ('1301', 'Test', 'test-password'),
    ('1401', 'Test', 'test-password'),
    ('1501', 'Test', 'test-password'),
    ('1601', 'Test', 'test-password'),
    ('1701', 'Test', 'test-password'),
    ('1801', 'Test', 'test-password'),
    ('1901', 'Test', 'test-password'),
    ('2001', 'Test', 'test-password'),
    ('2101', 'Test', 'test-password');

INSERT INTO
    activity(user_id, type, datetime)
VALUES
    ('1', 'atend', NOW()),
    ('2', 'atend', NOW()),
    ('1', 'leave', NOW());