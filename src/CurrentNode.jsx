import React from "react";

const CurrentNode = ({character, text, id, options, nextNodes}) => {
    return (
        <>
            <div>
                <p>id: {id}</p>
                <p>Character: {character}</p>
                <p>Text: {text}</p>
                {options.map((o) => (
                    <div>
                        <p>Option text: {o.text}</p>
                        <div>
                            <p>Node text: {nextNodes[o.toNode].text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>    
    )
}

export default CurrentNode;