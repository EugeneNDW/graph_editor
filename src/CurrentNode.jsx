import React from "react";

const CurrentNode = ({character, text, id, nextNodes, parentHandler}) => {
    return (
        <>
            <div>
                <p>id: {id}</p>
                <p>Character: {character}</p>
                <p>Text: {text}</p>
                {nextNodes.map((otn) => (
                    <div>
                        <p>Option text: {otn.option.text}</p>
                        <p>Node text: {otn.optionNode.text}</p>
                        <button onClick={(e) => {
                            parentHandler(otn.optionNode.id)
                        }}>choose</button>
                    </div>
                ))}
            </div>
        </>    
    )
}

export default CurrentNode;