const express = require('express');
const path = require('path');  //for giving path
const app = express();
const port = process.env.PORT || 80;   //for hosting app rums on this port

//mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://saaaadmalik:Saadmalik01.@cluster0.tyey2.mongodb.net/webstack?retryWrites=true&w=majority', { useNewUrlParser:true,  useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false  });
}
// defining mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    query: String,
    gender: String,
    address: String,
    city: String,
    zip: String

});

const Contact = mongoose.model('Contact', contactSchema);



app.use('/public', express.static( 'public'));
app.use(express.urlencoded());  


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});

app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});

app.post("/contact", (req,res)=>{ 
    
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.sendFile(path.join(__dirname, '../public/success.html'));
    }).catch(()=>{
        res.status(404).sendFile(path.join(__dirname, '../public/oops.html'));
        
    })
    
})

app.get("*", (req, res) => {
    res.send("Error 404 ! page not fond ")
});

app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})