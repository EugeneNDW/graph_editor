import React from "react";
import ConversationPart from "./ConversationPart";

const CurrentNode = ({node, nextNodes, parentHandler}) => {
    return (
        <>
            <div>
                {node ? <ConversationPart node={node} /> : <></>}
                {
                    nextNodes.length > 0 ? (
                        <>
                            <h4>Options</h4>
                            {nextNodes.map((otn) => (
                                <div>
                                    <hr/>
                                    <h5>opt</h5>
                                    <p>Option uuid: {otn.option.uuid}</p>
                                    <p>Option text: {otn.option.text}</p>
                                    <p>Option condition: {otn.option.optionConditionId}</p>
                                    <p>Node text: {otn.optionNode.text}</p>
                                    <button onClick={(e) => {
                                        parentHandler(otn.optionNode.id)
                                    }}>choose</button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
        </>    
    )
}

export default CurrentNode;