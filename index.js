const express = require('express');
const fs = require('fs');
const app = express();

app.get('/Home', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
});




app.listen(3000,()=>{
    console.log('Server berjalan di PORT 3000');
});
