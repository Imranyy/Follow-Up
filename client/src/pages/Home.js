import React,{useState} from 'react';

function Home(props) {
    const [recordBtn,setRecordBtn]=useState('');
    //audio recording
   const  startRecording=()=>{
    let device=navigator.mediaDevices.getUserMedia({audio:true});
    let items=[];
    device.then(stream=>{
        let recorder=new MediaRecorder(stream);
        recorder.ondataavailable=e=>{
            items.push(e.data);
            if(recorder.state=='inactive'){
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
            recorder.stop()
        },5000);
    })
   }

    const showRecordBtn=()=>{
        setRecordBtn(
            <button onClick={startRecording} type='button'>Start Recording</button>
        );
    }
    const submitAudio=async(e)=>{
        e.preventDefault();
    }
    return (
        <>
            <div className='home start'>
                <div className='audio'>

                </div>

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

                <form>
                    <input type='text' placeholder='Audio Title' onKeyDown={showRecordBtn} required/>
                    {recordBtn}
                </form>
            </div>
        </>
    );
}

export default Home;