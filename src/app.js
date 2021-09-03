const express = require('express');
const path = require('path');  //for giving path
const app = express();
const port = process.env.PORT || 80;   //for hosting app rums on this port

//mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost/myBlog', { useNewUrlParser:true,  useUnifiedTopology: true  });
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
        res.send("item saved successfully")
    }).catch(()=>{
        res.status(404).send("item not saved")
    })
    
})

app.get("*", (req, res) => {
    res.send("Error 404 ! page not fond ")
});

app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})