import React from "react";
import ConversationPart from "./ConversationPart";


const ChoosableNode = ({character, text, id, processor, illustration, currentHandler, toNodeHandler}) => {
    return (
        <>
            <ConversationPart character={character} text={text} id={id} processor={processor} illustration={illustration} />
            <div className="btn-group">
                <button className="btn btn-secondary" onClick={(e) => {
                    currentHandler(id)
                }}>set from</button>
            </div>
            <div className="btn-group">
                <button className="btn btn-secondary" onClick={(e) => {
                    toNodeHandler(id)
                }}>set to</button>
            </div>
        </>
    )
}

export default ChoosableNode;