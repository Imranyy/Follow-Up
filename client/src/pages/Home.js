import React,{useState} from 'react';
import { toast } from 'react-hot-toast';

function Home(props) {
    let device=navigator.mediaDevices.getUserMedia({audio:true}); //access the user audio device
    const [recordBtn,setRecordBtn]=useState('');
    const [audioTitle,setAudioTitle]=useState('');
    const [audioFile,setAudioFile]=useState('');
    const [uploadedFile,setUploadedFile]=useState('');
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
            setRecordBtn(<button>Submit</button>)
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
        const formData=new FormData();
        formData.append('audio',audioFile);
        try {
            const url='http://localhost:5000/api/upload';
           const response= await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                title:audioTitle,
                formData
            }),
            headers:{
                'content-type':'multipart/form-data'
            }
        });
        const parseRes=await response.json();
        toast.success(parseRes.msg);
        setUploadedFile(parseRes.fileName, parseRes.filePath)
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    function showForm(){
       document.querySelector('.home form input').style.display='block';
       document.querySelector('.home .add-btn').style.display='none';
    }
    return (
        <>
            <div className='home start'>
                <div className='grid-podcast'>
                    <div className='grid-item'>
                        <div className='card'>
                            <h3>hello</h3>
                            <p>hykjjklkkjkjjklnlk</p>
                        </div>
                    </div>
                    <div className='grid-item'>
                        <div className='card'>
                            <h1>hello</h1>
                        </div>
                    </div>
                    <div className='grid-item'>
                        <div className='card'>
                            <h1>hello</h1>
                        </div>
                    </div>
                    <div className='grid-item'>
                        <div className='card'>
                            <h1>hello</h1>
                        </div>
                    </div>
                </div>

                <form onSubmit={submitAudio}>
                    {results}
                    {recordBtn}
                </form>
                <button className='add-btn' onClick={showForm}>+</button>
            </div>
        </>
    );
}

export default Home;