import "./Chat.scss";
import chevronLeft from "../../assets/images/chevronLeft.svg";
import fullHeart from "../../assets/images/fullHeart.svg";
import SentMessage from "../../components/sentMessage/SentMessage";
import ReceivedMessage from "../../components/receivedMessage/ReceivedMessage";
import microphone from "../../assets/images/microphone.svg";
import Play from "../../assets/images/Play.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Loading } from "carbon-components-react";
import SendMessage from "../../assets/images/SendMessage.svg";

const Chat = () => {
  const [pergunta, setPergunta] = useState();
  const [response, setResponse] = useState();
  const [inputValue, setInputValue] = useState();
  const [play, setPlay] = useState(false);

  const getTranscription = async () => {
    try {
      const getDataUrl = "http://localhost:3000/speech-to-text/read";

      const textData = await axios.get(getDataUrl);

      console.log("question", textData.data);
      setPergunta(textData.data);

      const postCrawlerUrl = "http://localhost:3000/crawler/crawl-and-response";
      const crawlerInput = { question: textData.data };

      const crawler = await axios.post(postCrawlerUrl, crawlerInput);
      setResponse(crawler.data);
      console.log("response", crawler.data);

      // setResponse("teste")
      // console.log("response", "teste")
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleTextToSpeech = async () => {
    try {
      setPlay(true);
      const res = await axios.post(
        "http://localhost:3000/text-to-speech/synthesize",
        {
          text: response.answer,
        }
      );

      if (res.status === 201) {
        const audioData = res.data;
        const decodedAudio = atob(audioData);

        const uint8Audio = new Uint8Array(decodedAudio.length);
        for (let i = 0; i < decodedAudio.length; ++i) {
          uint8Audio[i] = decodedAudio.charCodeAt(i);
        }

        const audioBlob = new Blob([uint8Audio.buffer], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.play();
        setPlay(false);
      } else {
        console.error("Erro ao solicitar a síntese de fala:", res.statusText);
      }
    } catch (error) {
      console.error("Erro ao solicitar a síntese de fala:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postCrawlerUrl = "http://localhost:3000/crawler/crawl-and-response";
      const crawlerInput = { question: inputValue };

      const crawler = await axios.post(postCrawlerUrl, crawlerInput);
      setResponse(crawler.data);
      console.log("response", crawler.data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    getTranscription();
  }, []);

  return (
    <div className="chatBackground">
      <div className="chatHeader">
        {/* <Link to="/home" > */}
        <img src={chevronLeft} />
        {/* </Link> */}
      </div>
      <div className="chatContentContainer">
        <div className="chatContent">
          <SentMessage content={pergunta} />
          {response ? (
            <div className="recievedMessageGroup">
              <ReceivedMessage
                content={JSON.stringify(response.answer, null, 2)}
              />
              <button className="playButton" onClick={handleTextToSpeech}>
                <img src={Play} />
              </button>
            </div>
          ) : (
            // <p>teste</p>
            <Loading
              description={"Loading..."}
              withOverlay={true}
              active={true}
            />
          )}
        </div>
      </div>
      <div className="chatInput">
        <form onSubmit={handleSubmit} className="formCHat">
          <input
            className="pergunta"
            type="text"
            placeholder="Digite sua pergunta"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="buttonPergunta" type="submit">
            <img src={SendMessage} />
          </button>
        </form>
        <img className="microphone" src={microphone} />
      </div>
    </div>
  );
};

export default Chat;
