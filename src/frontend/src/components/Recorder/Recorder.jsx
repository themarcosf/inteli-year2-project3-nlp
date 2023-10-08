import "./Recorder.scss"
import React, {useEffect}  from 'react';
import vmsg from 'vmsg';
import axios from 'axios';
import microphone from "../../assets/images/microphone.svg"
import { InlineNotification } from 'carbon-components-react';   
// import {useHistory} from 'react-router-dom'

const recorder = new vmsg.Recorder({
    wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
});
// const history = useHistory();

class Recorder extends React.Component {

    state = {
        isLoading: false,
        isRecording: false,
        //salvando o audio local
        recordings: [],
        isRecordingComplete: false,
        isRecordingError: false
    };

    record = async () => {
        this.setState({ isLoading: true });

        if (!this.state.isRecording) {
            try {
                await recorder.initAudio();
                await recorder.initWorker();
                recorder.startRecording();
                console.log("Recording started!")
                this.setState({ isLoading: false, isRecording: true });
            } catch (e) {
                console.error("Error recording:", e);
                this.setState({ isLoading: false });
            }
        } else {
            try {
                const blob = await recorder.stopRecording();
                console.log("Recording stopped!")
                this.setState({
                    isLoading: false,
                    isRecording: false,
                    recordings: this.state.recordings.concat(URL.createObjectURL(blob))
                });

                console.log("Blob Object URL:", this.state.recordings.concat(URL.createObjectURL(blob)));

                const formData = new FormData();
                formData.append('audio', blob, 'audio');
                console.log("Form Data:", formData.get('audio'))

                try {
                    console.log("Transcribing audio...")
                    const response = await axios.post('http://localhost:3000/speech-to-text/transcribe', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }, params: {
                          language: 'pt-BR', // Define a linguagem para Português do Brasil
                        }
                    });

                    const { transcription } = response.data;
                    // console.log("Transcription:", transcription);
                    this.setState({ transcription });

                    this.setState({ isRecordingComplete: true });
                    this.props.onGotoChat();

                } catch (error) {
                    this.setState({ isRecordingError: true });
                    console.error('Erro ao transcrever o áudio:', error);
                }
            } catch (e) {
                console.error(e);
                this.setState({ isLoading: false });
            }
        }

        // useEffect(() => {
        //     if (transcriptionComplete) {
        //       // Redirecionar automaticamente para outra página após a transcrição
        //       history.push('/chat');
        //     }
        //   }, [isRecordingComplete, history]);
    };

    render() {
        const { isLoading, isRecording, recordings, isRecordingComplete, isRecordingError } = this.state

        return (
            <React.Fragment>
                <button onClick={this.record} disabled={isLoading}>
                    {isRecording ? "Stop" : "Record"}
                </button>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {recordings.map(url => (
                        <li key={url}>
                            <audio src={url} controls></audio>
                        </li>
                    ))}
                </ul>
                {isRecordingComplete && (
                    <InlineNotification
                        kind="success"
                        title="Recording Complete!"
                        subtitle="Your recording has been transcribed."
                        hideCloseButton={true}
                    />
                )}
                {isRecordingError && (
                    <InlineNotification
                        kind="error"
                        title="Recording Error!"
                        subtitle="There was an error transcribing your audio."
                        hideCloseButton={true}
                    />
                )}
            </React.Fragment>
        )
    }
}

export default Recorder
