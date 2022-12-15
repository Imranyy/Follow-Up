

const uploadAudio=async(req,res)=>{
    if(req.files==null){
        res.status(400).send({msg:'No file was uploaded'});
    }
    const file=req.files.file;
    file.mv(`${__dirname}/public/audio/${file.name}`,err=>{
        if(err){
            res.send(err)
        }
        res.send({fileName:file.name, filePath:`/upload/${file.name}`})
    })
}

module.exports={
    uploadAudio,
}