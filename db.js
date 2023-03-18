import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shelfcontrol",
  password: "",
  port: "5432",
});

const users = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `;

const booksRead = `
      CREATE TABLE IF NOT EXISTS books_read (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        publisher TEXT NOT NULL,
        publishdate DATE NOT NULL,
        description TEXT NOT NULL,
        ibsn10 TEXT,
        ibsn13 TEXT,
        category TEXT NOT NULL,
        buylink TEXT NOT NULL,
        pagecount INTEGER NOT NULL,
        avg_rating DECIMAL(3,2) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      )
    `;
const booksNotRead = `
      CREATE TABLE IF NOT EXISTS books_not_read (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        publisher TEXT NOT NULL,
        publishdate DATE NOT NULL,
        description TEXT NOT NULL,
        ibsn10 TEXT,
        ibsn13 TEXT,
        category TEXT NOT NULL,
        buylink TEXT NOT NULL,
        pagecount INTEGER NOT NULL,
        avg_rating DECIMAL(3,2) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      )
    `;

const createTables = async () => {
    const client = await pool.connect();
    try {
        await client.query(users);
        await client.query(booksRead);
        await client.query(booksNotRead);
          console.log('Tables created successfully');
        } catch (error) {
          console.error('Error creating tables', error);
        } finally {
          client.release();
        }
      };







module.exports = {
  createTables,
pool,
};






// import mysql from "mysql";

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Jxe61pq8910",
//   database: "shelfcontrol",
// });

// // db.connect(function(err){
// //     if (err) {
// //         console.log(err)
// //     }else{
// //         var userTable = `CREATE TABLE if not exists users (
// //             id INT PRIMARY KEY AUTO_INCREMENT,
// //             username VARCHAR(50) NOT NULL,
// //             password VARCHAR(50) NOT NULL)`;
// //           db.query(userTable, (err,result)=>{
// //             if(err)
// //             {
// //                 console.log(err)
// //             }else{
// //                 console.log("Table created")
// //             }
// //           })
// //         }
// //     })

// // db.connect(function(err){
// //     if (err) {
// //         console.log(err)
// //     }else{
// //         var booksTable = `CREATE TABLE books (
// //             id INT NOT NULL AUTO_INCREMENT,
// //             title VARCHAR(255) NOT NULL,
// //             author VARCHAR(255) NOT NULL,
// //             desc VARCHAR(1000) NULL DEFAULT NULL,
// //             published date DATE NULL DEFAULT NULL,
// //             ibsn10 VARCHAR(255) NULL DEFAULT NULL,
// //             ibsn13 VARCHAR(255) NULL DEFAULT NULL,
// //             publisher VARCHAR(255) NULL DEFAULT NULL,
// //             avg rating INT NULL DEFAULT NULL,
// //             language VARCHAR(255) NULL DEFAULT NULL,
// //             category VARCHAR(255) NULL DEFAULT NULL,
// //             buylink VARCHAR(255) NULL DEFAULT NULL,
// //             pagecount VARCHAR(45) NULL DEFAULT NULL);`;
// //           db.query(booksTable, (err,result)=>{
// //             if(err)
// //             {
Id;
description;
publish - date;
publisher;
ibsn10;
ibsn13;
avg - rating;
category;
buy - link;
pagecount;

// //                 console.log(err)
// //             }else{
// //                 console.log("Table created")
// //             }
// //           })
// //         }
// //     })

// //     db.connect(function(err){
// //         if (err) {
// //             console.log(err)
// //         }else{
// //             var booksRead = `CREATE TABLE booksRead (
// //                 id INT NOT NULL AUTO_INCREMENT,
// //                 title VARCHAR(255) NOT NULL,
// //                 author VARCHAR(255) NOT NULL,
// //                 desc VARCHAR(1000) NULL DEFAULT NULL,
// //                 published date DATE NULL DEFAULT NULL,
// //                 ibsn10 VARCHAR(255) NULL DEFAULT NULL,
// //                 ibsn13 VARCHAR(255) NULL DEFAULT NULL,
// //                 publisher VARCHAR(255) NULL DEFAULT NULL,
// //                 avg rating INT NULL DEFAULT NULL,
// //                 language VARCHAR(255) NULL DEFAULT NULL,
// //                 category VARCHAR(255) NULL DEFAULT NULL,
// //                 buylink VARCHAR(255) NULL DEFAULT NULL,
// //                 pagecount VARCHAR(45) NULL DEFAULT NULL,
// //                 uid INT NULL DEFAULT NULL,
// //                 INDEX uid_idx (uid ASC) VISIBLE,
// //                 CONSTRAINT uid
// //                   FOREIGN KEY (uid)
// //                   REFERENCES shelfcontrol.user (id)
// //                   ON DELETE CASCADE
// //                   ON UPDATE CASCADE)`
// //               db.query(booksRead, (err,result)=>{
// //                 if(err)
// //                 {
// //                     console.log(err)
// //                 }else{
// //                     console.log("Table created")
// //                 }
// //               })
// //             }
// //         })

// const schema = 'shelfcontrol';
// const createSchema = `CREATE DATABASE ${schema};`;

// await db.execute(createSchema);

// console.log(`Schema ${schema} created successfully.`);

// db.query(
//   `
//   CREATE TABLE users (
//     id INT PRIMARY KEY,
//     username VARCHAR(50) NOT NULL,
//     password VARCHAR(50) NOT NULL
//   );

//   CREATE TABLE booksRead (
//     id INT NOT NULL,
//     title VARCHAR(255) NOT NULL,
//     author VARCHAR(255) NOT NULL,
//     description VARCHAR(1000) NULL DEFAULT NULL,
//     publish_date DATE NULL DEFAULT NULL,
//     ibsn10 VARCHAR(255) NULL DEFAULT NULL,
//     ibsn13 VARCHAR(255) NULL DEFAULT NULL,
//     publisher VARCHAR(255) NULL DEFAULT NULL,
//     avgRating INT NULL DEFAULT NULL,
//     language VARCHAR(255) NULL DEFAULT NULL,
//     category VARCHAR(255) NULL DEFAULT NULL,
//     buylink VARCHAR(255) NULL DEFAULT NULL,
//     pagecount VARCHAR(45) NULL DEFAULT NULL,
//     uid INT NULL DEFAULT NULL,
//     INDEX uid_idx (uid ASC),
//     CONSTRAINT fk_booksRead_uid
//       FOREIGN KEY (uid)
//       REFERENCES shelfcontrol.user (id)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE
//   );

//   CREATE TABLE booksUnread (
//     id INT NOT NULL,
//     title VARCHAR(255) NOT NULL,
//     author VARCHAR(255) NOT NULL,
//     description VARCHAR(1000) NULL DEFAULT NULL,
//     publish_date DATE NULL DEFAULT NULL,
//     ibsn10 VARCHAR(255) NULL DEFAULT NULL,
//     ibsn13 VARCHAR(255) NULL DEFAULT NULL,
//     publisher VARCHAR(255) NULL DEFAULT NULL,
//     avgRating INT NULL DEFAULT NULL,
//     language VARCHAR(255) NULL DEFAULT NULL,
//     category VARCHAR(255) NULL DEFAULT NULL,
//     buylink VARCHAR(255) NULL DEFAULT NULL,
//     pagecount VARCHAR(45) NULL DEFAULT NULL,
//     uid INT NULL DEFAULT NULL,
//     INDEX uid_idx (uid ASC),
//     CONSTRAINT fk_booksUnread_uid
//       FOREIGN KEY (uid)
//       REFERENCES shelfcontrol.user (id)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE
//   );
//       `,
//   (error, results, fields) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log("Tables created successfully!");
//     }
//   }
// );
