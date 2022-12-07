import React from "react";

const ConversationPart = ({node}) => {
    return (
        <>  
            <div>
                <p>id: {node.id}</p>
                <p>Character: {node.character}</p>
                <p>Text: {node.text}</p>
                <p>Processor: {node.processor}</p>
                <p>Illustration: {node.illustration}</p>
            </div>
        </>    
    )
}

export default ConversationPart;