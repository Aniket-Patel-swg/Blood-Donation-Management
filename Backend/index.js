import  express  from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Aniket@0412",
    database : "blood_bank"
})

// This allow us to send any json object from client
app.use(express.json());

// at the given path we send request(res) and and get response(res)
app.get("/", (req,res)=>{
    res.json("hello this is the backend");
})

app.get("/donor", (req,res)=>{
    const donor_query = "select * from Blood_Donor"
    // we are using db to run any query, here our query is get_query
    db.query(donor_query,(err, data)=>{
        if(err) {
            return console.log(err);;
        }
        // If there is no error we send response(res) of data
        return res.json(data);
    })
})

app.get("/staff", (req,res)=>{
    const staff_query = "select* from Recording_Staff;";
    db.query(staff_query, (err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/city", (req,res)=>{
    const city_query = "select * from City;";
    db.query(city_query, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/donor", (req,res)=>{
    const donor_insert = "insert into Blood_Donor values (?);"
    const values = [
        req.body.bd_ID,
        req.body.bd_name,
        req.body.bd_age,
        req.body.bd_sex,
        req.body.bd_Bgroup,
        req.body.bd_reg_date,
        req.body.reco_ID,
        req.body.City_ID,
    ];

    db.query(donor_insert, [ values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Blood Donor Data Added Successfully");
    })
})

app.listen(5000, () =>{
    console.log("App is listening on port 5000")
})