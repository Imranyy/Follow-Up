const express=require('express');
const fileUpload=require('express-fileupload');
const cors=require('cors');

const app =express();
app.use(fileUpload());

//cors
app.use(cors());

//routes
app.use('/api',require('./routes/api'));

//listening to server
const port=3000||process.env.PORT;
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})