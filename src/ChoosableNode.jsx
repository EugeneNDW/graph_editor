import React from "react";
import ConversationPart from "./ConversationPart";


const ChoosableNode = ({node, currentHandler, toNodeHandler}) => {
    return (
        <>
            <ConversationPart node={node} />
            <div className="btn-group">
                <button className="btn btn-secondary" onClick={(e) => {
                    currentHandler(node.id)
                }}>set from</button>
            </div>
            <div className="btn-group">
                <button className="btn btn-secondary" onClick={(e) => {
                    toNodeHandler(node.id)
                }}>set to</button>
            </div>
        </>
    )
}

export default ChoosableNode;