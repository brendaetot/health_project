const express = require("express");
const path = require("path");
const mysql = require("mysql");

const dotenv = require("dotenv");
const { dirname } = require("path");

dotenv.config({ path: "./.env" });

const app = express();
const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
console.log(__dirname);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());


app.set("view engine", "hbs");

db.connect((error) => {
    if(error){
        console.log(error)
    } else{
        console.log("MYSQL connected---")
    }
}) 
 //Define routes:
 app.use("/", require("./routes/pages"));
 app.use("/auth", require("./routes/auth"));
 
app.listen(4000, () => {
    console.log("server started on port 4000")
} );