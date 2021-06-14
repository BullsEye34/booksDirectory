const express = require('express');
const cors = require('cors');

// Define App to be an Express APp
const app=express();
<<<<<<< HEAD
mongoose.connect(
  process.env.MONGO_URL,
  { useUnifiedTopology: true, useNewUrlParser: true }, 
  ()=>console.log("Connected To DB"),
);

=======
>>>>>>> parent of 0d4716c (Mongoose Connection)

// MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// Endpoints

// Serve Home page
app.get("/",(req,res)=>{
    res.sendFile(process.cwd()+"/pages/index.html");
});


app.listen(3000,()=>console.log("Listening on : http://127.0.0.1:3000/"));