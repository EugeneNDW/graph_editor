import React from "react";

const CurrentNode = ({character, text, id, processor, illustration, nextNodes, parentHandler}) => {
    return (
        <>
            <div>
                <p>id: {id}</p>
                <p>Character: {character}</p>
                <p>Text: {text}</p>
                <p>Processor: {processor}</p>
                <p>Illustration: {illustration}</p>
                {nextNodes.map((otn) => (
                    <div>
                        <p>Option text: {otn.option.text}</p>
                        <p>Option uuid: {otn.option.uuid}</p>
                        <p>Option condition: {otn.option.optionConditionId}</p>
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