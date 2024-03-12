const app= require("./app");


const dotenv= require("dotenv");
const connectDatabase=require("./config/database")

//for uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`shutting down due to unhandled exception`)
    process.exit(1)
})

dotenv.config({path:"backend/config/config.env"})

connectDatabase()
const server= app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

//for unhandled promise
process.on("unhandledRejection",(err)=>{
    console.log(`Error :${err.message}`);
    console.log(`shutting down server for unhandled rejection`);
})