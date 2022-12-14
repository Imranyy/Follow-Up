import React,{useState} from 'react';

function Home(props) {
    let device=navigator.mediaDevices.getUserMedia({audio:true}); //access the user audio device
    const [recordBtn,setRecordBtn]=useState('');
    const [audioTitle,setAudioTitle]=useState('');
    const [results,setResults]=useState(
        <input type='text' onChange={e=>setAudioTitle(e.target.value)} placeholder='Audio Title' onKeyDown={showRecordBtn} required/>
    );

    //audio recording
   const  startRecording=()=>{
    setRecordBtn(
            <button type='button'>recording...</button>
    )
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
            }
        }
        recorder.start();
        setTimeout(()=>{
            recorder.stop();
            setRecordBtn(<button>Submit</button>)
        },5000);
    })
   }

    function showRecordBtn(){
        setRecordBtn(
            <button onClick={startRecording} type='button'>Start Recording</button>
        );
    }
    //submitting audio to api
    const submitAudio=async(e)=>{
        e.preventDefault();
        const url='';
        await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                audioTitle,
            }),
            headers:{
                'content-type':'application/json'
            }
        })
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
            </div>
        </>
    );
}

export default Home;