import React from "react";

const ConversationPart = ({character, text, id, processor, illustration}) => {
    return (
        <>
            <div>
                <p>id: {id}</p>
                <p>Character: {character}</p>
                <p>Text: {text}</p>
                <p>Processor: {processor}</p>
                <p>Illustration: {illustration}</p>
            </div>
        </>    
    )
}

export default ConversationPart;