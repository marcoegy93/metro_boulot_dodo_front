const express = require ("express");
const path = require ('path');

const app = express();

app.use(express.static(__dirname + '/dist/metro-boulot-dodo-maths'));
app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/metro-boulot-dodo-maths/index.html'));
})

app.listen(process.env.PORT);