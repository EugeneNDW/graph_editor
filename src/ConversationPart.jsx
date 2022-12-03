import React from "react";

const ConversationPart = ({character, text, id, processor, illustration, parentHandler}) => {
    return (
        <>
            <div>
                <p>id: {id}</p>
                <p>Character: {character}</p>
                <p>Text: {text}</p>
                <p>Processor: {processor}</p>
                <p>Illustration: {illustration}</p>
                <button onClick={(e) => {
                        parentHandler(id)
                    }}>choose</button>
            </div>
        </>    
    )
}

export default ConversationPart;