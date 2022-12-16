import React,{useState} from 'react';
import { toast } from 'react-hot-toast';
import { projectStorage,ref,getDownloadURL,uploadBytesResumable} from '../fireBaseConfig/fireConfig';

function Home(props) {
    let device=navigator.mediaDevices.getUserMedia({audio:true,video:false}); //access the user audio device
    const [recordBtn,setRecordBtn]=useState('');
    const [audioFile,setAudioFile]=useState('');
    const [uploadedFile,setUploadedFile]=useState('');
    const [results,setResults]=useState('');

    //audio recording
   function  startRecording(){
    toast.success('Recording...');
    setResults(
        <>
             <div className='audio'></div>
        </>
    )
    let items=[];
    device.then(stream=>{
        let recorder=new MediaRecorder(stream);
        recorder.ondataavailable=e=>{
            items.push(e.data);
            if(recorder.state==='inactive'){
                let blob=new Blob(items,{
                    type:'audio/webm'
                });
                let audio=document.querySelector('.audio');
                let mainAudio=document.createElement('audio');
                mainAudio.setAttribute('controls','controls');
                audio.appendChild(mainAudio);
                mainAudio.innerHTML=`<source src=${URL.createObjectURL(blob)} type="audio/webm"/>`
                setAudioFile(URL.createObjectURL(blob))
                // setAudioFile(blob)
            }
        }
        recorder.start();
         setRecordBtn(
            <button onClick={stop} type='button'>Stop recording...</button>
        )
        function stop(){
            recorder.stop();
            setRecordBtn('');
            document.querySelector('form .submit-btn').style.display='block';
        }
    })
    
   }
   
    //submitting audio to api
    async function submitAudio(e){
        e.preventDefault();
        try {
            const url='http://localhost:5000/api/upload';
            const formData={
                audio:audioFile.slice(5)
                // audio:audioFile
            }
           const response= await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                audio:audioFile
            }),
            headers:{
                'content-type':'application/json'
            }
           })
        const parseRes=await response.data;
        toast.success(parseRes.msg);
        console.log(parseRes);
        setUploadedFile(parseRes.results);
        // setUploadedFile(parseRes.fileName, parseRes.filePath)
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    function showForm(){
        startRecording();
       document.querySelector('.home .add-btn').style.display='none';
    }
    
  //upload audio 
        const changeHandler=(e)=>{
          if(audioFile!==null){
              //uploading audio to storage
              const storageRef=ref(projectStorage,`userAudio1`);
              const uploadTask = uploadBytesResumable(storageRef, audioFile);
              uploadTask.on('state_changed',
               async()=>{
                  try {
                       await getDownloadURL(storageRef).then((url)=>{
                        console.log(url);
                        setUploadedFile(url);
                       })
                       //patch user image to db
                       const url=`http:localhost:5000/api/upload`
                         await fetch(url,{
                             method:'PATCH',
                             body:JSON.stringify({
                               audio:uploadedFile
                             }),
                               headers:{
                                 'Content-Type':'application/json'
                               }
                         });
                         toast.success('Audio sent');
                  } catch (error) {
                    toast.error('failed ☠☠')
                  }
            })
                       
          }else{
              toast.error("You can't send an empty file!")
          }
        }
    return (
        <>
            <div className='home start'>
                {/* {audioFile} */}
                <div className='grid-podcast'>
                    <i class="fa-solid fa-browser"></i>
                    <div className='grid-item'>
                        {/* {uploadedFile&&uploadedFile.map(audio=>( */}
                            <div className='card'>
                                <h3>{uploadedFile.title}</h3>
                                <p>{uploadedFile.audio}</p>
                                <audio controls loop>
                                    <source src={uploadedFile.audio} type="audio/webm"/>
                                </audio>
                            </div>
                        {/* ))} */}
                    </div>
                </div>

                <form onSubmit={submitAudio}>
                    {results}
                    {recordBtn}
                    <button className='submit-btn' style={{display:'none'}} type='submit'>Submit</button>
                </form>
                <button className='add-btn' onClick={showForm}>+</button>
            </div>
        </>
    );
}

export default Home;