import "./Ask.scss";
import microphone from "../../assets/images/microphone.svg"
import keyboard from "../../assets/images/keyboard.svg"
import { useState } from "react";
import Recorder from "../../components/Recorder/Recorder";
import React from 'react';
import { Link } from "react-router-dom"


const Ask =()=>{
    const[isRecording,setIsRecording]=useState(false)
    const[changeButton,setChangeButton]=useState(false)

    function startRecording(){
        setIsRecording(true)
    }

    function goToChat(){
        setChangeButton(true)
    }

    return(
        <div className="askBackground" >
           <div className="askContent">
                {!isRecording && (
                    <div className="askOption">
                        <p>Ask your question by voice or writting</p>
                        <div className="buttons">
                            <button onClick={startRecording}>
                                <img
                                className="recordOption"
                                src={microphone}
                                />
                            </button>
                            <Link to="/chat" >
                                <button>
                                <img
                                    className="recordOption"
                                    src={keyboard}
                                    />
                                </button>
                            </Link>
                    </div>
                    </div>
                    
                )}
                {isRecording &&(
                    <div className = "recording">
                         <p>Press the button to start recording</p>
                         <Recorder
                         onGotoChat={goToChat}
                         />
                    </div>
                    
                )}
                {changeButton &&(
                    <div className = "changeButton">
                        <Link to="/chat" >
                            <button>Ir para o chat</button>
                        </Link>
                    </div>
                    
                )}
            </div>
        </div>
    )
}

export default Ask;