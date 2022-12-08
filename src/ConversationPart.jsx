import React from "react";

const ConversationPart = ({node}) => {
    return (
        <>  
            <div className="card">
                <div className="card-body">
                    <p>id: {node.id}</p>
                    <p>Character: {node.character}</p>
                    <p>Text: {node.text}</p>
                    <p>Processor: {node.processorId}</p>
                    <p>Illustration: {node.illustration}</p>
                </div>
            </div>
        </>    
    )
}

export default ConversationPart;