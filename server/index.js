const express=require('express');
const fileUpload=require('express-fileupload');

const app =express();
app.use(fileUpload());

//routes
app.use('/api',require('./routes/api'));

//listening to server
const port=3000||process.env.PORT;
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})