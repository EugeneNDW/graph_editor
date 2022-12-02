import React, { useState, useEffect } from "react";
import ConversationPart from "./ConversationPart";
import CurrentNode from "./CurrentNode";
import * as g from "./Graphs"

const App = () => {
    const [character, setCharacter] = useState("")
    const [text, setText] = useState("")
    const [optionText, setOptionText] = useState("")
    const [graphNodes, setGraphNodes] = useState([])
    const [currentNode, setCurrentNode] = useState({})

    useEffect(() => {
        changeCurrentNode(0)
        setGraphNodes(g.graph.getNodesList())
      }, []);

    const addNode = () => {      
        g.graph.addNode(text, character, optionText)
        setGraphNodes(g.graph.getNodesList())
    }

    const changeCurrentNode = (id) => {
        g.graph.setCurrentNode(id)
        setCurrentNode(g.graph.getCurrentNode())
    }

    return (
        <>
            <h1>App</h1>        
            <div style={{display: 'flex'}}>
                <div style={{margin: '30px'}}>
                    <h3>Current node</h3>
                    <ConversationPart character={currentNode.character} text={currentNode.text} id={currentNode.id}/>
                </div>
                <div style={{margin: '30px'}}>
                    <h3>Option Text: </h3>
                    <input 
                        type="text"
                        value={optionText}
                        onChange={(e) => setOptionText(e.target.value)}
                    />
                    <h3>Character: </h3>
                    <input 
                        type="text"
                        value={character}
                        onChange={(e) => setCharacter(e.target.value)}
                    />
                    <h3>Text: </h3>
                    <input 
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div>
                        <button onClick={(e) => {
                            addNode()
                        }}>Submit</button>
                    </div>
                </div>
                <div style={{margin: '30px'}}>
                    <h3>RESULT</h3>
                    {graphNodes.map((p) => (
                        <ConversationPart character={p.character} text={p.text} id={p.id} parentHandler={changeCurrentNode} />
                    ))}
                </div>
                <div style={{margin: '30px'}}>
                    <h3>JSON to copy</h3>
                    <pre>
                        {JSON.stringify(graphNodes, undefined, 2)}
                    </pre>
                </div>
            </div>
        </>
    );
}

export default App;