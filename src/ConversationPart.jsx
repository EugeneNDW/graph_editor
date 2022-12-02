import React from "react";

const ConversationPart = ({character, text, id, parentHandler}) => {
    return (
        <>
            <div>
                <p>id: {id}</p>
                <p>Character: {character}</p>
                <p>Text: {text}</p>
                <button onClick={(e) => {
                        parentHandler(id)
                    }}>choose</button>
            </div>
        </>    
    )
}

export default ConversationPart;