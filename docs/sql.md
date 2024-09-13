## MySQL テーブル作成
```sql
CREATE TABLE users(
  user_id int AUTO_INCREMENT NOT NULL,
  display_id char(4) UNIQUE NOT NULL,
  name varchar(20) NOT NULL,
PRIMARY KEY (user_id)
);


CREATE TABLE activity(
  activity_id int AUTO_INCREMENT NOT NULL,
  user_id int NOT NULL,
  type varchar(10) NOT NULL,
  datetime DATETIME NOT NULL,
PRIMARY KEY (activity_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE
);


CREATE TABLE absent(
  absent_id int AUTO_INCREMENT NOT NULL,
  author_id int NOT NULL,
  type varchar(10) NOT NULL,
  date DATE NOT NULL,
  update_time DATETIME NOT NULL,
PRIMARY KEY (absent_id),
FOREIGN KEY (author_id) REFERENCES users(user_id)
);
```

[DB-TEST](https://www.db-fiddle.com/f/phbLW4hr375vfxHfxAtTNt/5)