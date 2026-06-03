import app from './app.js';
import express from 'express';
import connection from './src/config/connection.js';


connection().then(()=>{
    const server = app.listen(process.env.PORT|| 7000, ()=>{
        console.log(`server is coneected to the data base : ${process.env.PORT}`);
        })
        server.on("error", (error)=>{
            console.error("Server error while connecting to db: ", error)
    })
})
.catch((error)=>{
    console.log(`something went wrong wile connection the the mongoose database: ${error}`);
})



