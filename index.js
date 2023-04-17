const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/route');
const app = express();
app.use(express.json());


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ankushrai222:Ankushrai222@newproject.tknxizt.mongodb.net/AnkushRai-DB" ,{
    useNewUrlParser: true
}).then(() => console.log('MongoDB is Connected'))
    .catch((err) => console.log(err))

app.use("/", route);

app.listen( 3001, () => {
    console.log('Server running on port', 3001);
})






