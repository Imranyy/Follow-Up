const express=require('express');

const app =express();

//listening to server
const port=3000||process.env.PORT;
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})