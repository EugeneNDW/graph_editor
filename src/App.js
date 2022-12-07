import React, { useState, useEffect } from "react";
import ChoosableNode from "./ChoosableNode"
import ConversationPart from "./ConversationPart";
import CurrentNode from "./CurrentNode";
import { graph } from "./Graphs"

const App = () => {
    const [character, setCharacter] = useState("")
    const [text, setText] = useState("")
    const [processor, setProcessor] = useState("")
    const [illustration, setIllustration] = useState("")

    const [optionText, setOptionText] = useState("")
    const [optionCondition, setOptionCondition] = useState("")
    
    const [graphNodes, setGraphNodes] = useState([])
    const [graphLists, setGraphLists] = useState({})

    const [currentNode, setCurrentNode] = useState({})
    const [toNode, setToNode] = useState({})

    const [createNew, setCreateNew] = useState(true)

    useEffect(() => {
        changeCurrentNode(0)
        setGraphNodes(graph.getNodesList())
        setGraphLists(graph.getListsRepresentation)
      }, []);

    const submitForm = () => {
        console.log(toNode)
        if (createNew) {
            addNode()
        } else {
            addOption()
        }
    }

    const addOption = () => {
        graph.addOption(optionText, optionCondition, currentNode.node, toNode)

        const current = graph.getCurrentNodeWithOptions()
        setCurrentNode(current)
        setGraphLists(graph.getListsRepresentation)
    }

    const addNode = () => {      
        graph.addNode(text, character, optionText, processor, illustration, optionCondition)
        setGraphNodes(graph.getNodesList())
        const current = graph.getCurrentNodeWithOptions()
        setCurrentNode(current)
        setGraphLists(graph.getListsRepresentation)
    }

    const changeCurrentNode = (id) => {
        graph.setCurrentNode(id)
        const current = graph.getCurrentNodeWithOptions()
        setCurrentNode(current)
    }

    const chooseToNode = (id) => {
        const to = graph.getNodeById(id)
        setToNode(to)
    }

    const createNewChanged = () => {
        setCreateNew(!createNew)
    }

    return (
        <>       
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-2">
                        <h3>From</h3>
                        <CurrentNode
                            node={currentNode.node}
                            nextNodes={currentNode.optionNodes ? currentNode.optionNodes : []}
                            parentHandler={changeCurrentNode}
                        />
                    </div>
                    <div className="col-sm-2">
                        <h3>→</h3>
                        <label>Option Text: </label>
                        <input 
                            type="text"
                            value={optionText}
                            onChange={(e) => setOptionText(e.target.value)}
                        />
                        <label>Option Condition: </label>
                        <input 
                            type="text"
                            value={optionCondition}
                            onChange={(e) => setOptionCondition(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-2">
                        <h3>To</h3>
                        {createNew ? (
                            <>
                                <div>
                                    <label>Character: </label>
                                    <input 
                                        type="text"
                                        value={character}
                                        onChange={(e) => setCharacter(e.target.value)}
                                    />
                                    <label>Text: </label>
                                    <input 
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                    <label>Processor: </label>
                                    <input 
                                        type="text"
                                        value={processor}
                                        onChange={(e) => setProcessor(e.target.value)}
                                    />
                                    <label>Image: </label>
                                    <input 
                                        type="text"
                                        value={illustration}
                                        onChange={(e) => setIllustration(e.target.value)}
                                    />
                                </div>
                            </>
                        ):(
                            <>
                                <div>
                                    {console.log(toNode)}
                                     <ConversationPart node={toNode}/>
                                </div>
                            </>
                        )}
                        <div className="d-grid">
                            <button className="btn btn-block btn-primary" onClick={(e) => {
                                submitForm()
                            }}>Submit</button>
                        </div>

                        <div>
                            <input
                                checked={createNew}
                                type="checkbox"
                                value={createNew}
                                onChange={createNewChanged}
                            />
                            createNew
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <h3>Result</h3>
                        {graphNodes.map((n) => (
                            <ChoosableNode node={n} currentHandler={changeCurrentNode} toNodeHandler={chooseToNode}/>
                        ))}
                    </div>
                    <div className="col-sm-3">
                        <h3>JSON to copy</h3>
                        <pre>
                            {JSON.stringify(graphLists, undefined, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;