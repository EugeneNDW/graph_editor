import React from "react";
import ConversationPart from "./ConversationPart";

const CurrentNode = ({character, text, id, processor, illustration, nextNodes, parentHandler}) => {
    return (
        <>
            <div>
                <ConversationPart character={character} text={text} id={id} processor={processor} illustration={illustration} />
                {nextNodes.map((otn) => (
                    <div>
                        <p>Option uuid: {otn.option.uuid}</p>
                        <p>Option text: {otn.option.text}</p>
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