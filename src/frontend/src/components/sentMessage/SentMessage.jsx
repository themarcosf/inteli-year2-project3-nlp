import "./SentMessage.css"

const SentMessage = (props)=>{
    return(
        <div className="sentMessageBG">
            <div className = "sentMessageContent">
                <p>{props.content} </p>
            </div>
        </div>
        
    )
}

export default SentMessage;