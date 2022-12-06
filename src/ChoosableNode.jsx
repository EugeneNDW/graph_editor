import React from "react";
import ConversationPart from "./ConversationPart";


const ChoosableNode = ({character, text, id, processor, illustration, currentHandler, toNodeHandler}) => {
    return (
        <>
            <ConversationPart character={character} text={text} id={id} processor={processor} illustration={illustration} />
            <button onClick={(e) => {
                currentHandler(id)
            }}>choose current</button>
            <button onClick={(e) => {
                toNodeHandler(id)
            }}>choose to node</button>
        </>
    )
}

export default ChoosableNode;