import "./ReceivedMessage.css"
import ChartBox from "../ChartBox/ChartBox"

const ReceivedMessage = (props)=>{
    return(
        <div className="receivedMessageBG">
            <div className = "ReceivedMessageContent">
            <p>
               {props.content}
            </p>
            <br />
            <ChartBox></ChartBox>
        </div>
        </div>
        
    )
}

export default ReceivedMessage;