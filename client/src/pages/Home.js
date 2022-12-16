import React,{useState} from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Home(props) {
    let device=navigator.mediaDevices.getUserMedia({audio:true,video:false}); //access the user audio device
    const [recordBtn,setRecordBtn]=useState('');
    const [audioTitle,setAudioTitle]=useState('');
    const [audioFile,setAudioFile]=useState('');
    const [uploadedFile,setUploadedFile]=useState([]);
    const [results,setResults]=useState(
        <input type='text' onChange={e=>setAudioTitle(e.target.value)} placeholder='Audio Title' onKeyDown={showRecordBtn} required/>
    );

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
        // setTimeout(()=>{
        //     recorder.stop();
        //     setRecordBtn(<button>Submit</button>)
        // },5000);
        
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
   

    function showRecordBtn(){
        setRecordBtn(
            <button onClick={startRecording} type='button'>Start Recording</button>
        );
    }

    //submitting audio to api
    async function submitAudio(e){
        e.preventDefault();
        try {
            const url='http://localhost:5000/api/upload';
            const formData={
                title:audioTitle,
                audio:audioFile.slice(5)
                // audio:audioFile
            }
           const response= await axios.post(url,formData,{
            headers:{
            //    'content-type':'application/json',
               'content-type':'multipart/form-data'
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
       document.querySelector('.home form input').style.display='block';
       document.querySelector('.home .add-btn').style.display='none';
    }
    return (
        <>
            <div className='home start'>
                {/* {audioFile} */}
                <div className='grid-podcast'>
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