const express = require("express"); 
const app = express(); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=> console.log("Connected to MongoDB!"))
.catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(3001, () => {
    console.log("Server is running on port 3001!");
}); 