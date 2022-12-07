import React, { useState, useEffect } from "react";
import ConversationPart from "./ConversationPart";
import CurrentNode from "./CurrentNode";
import { graph } from "./Graphs"
import JsonResultModal from "./JsonResultModal";
import NodesListModal from "./NodesListModal";

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
        if (createNew) {
            addNode()
        } else {
            addOption()
        }
        clearForm()
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

    const clearForm = () => {
        setCharacter("")
        setText("")
        setProcessor("")
        setIllustration("")

        setOptionText("")
        setOptionCondition("")
    }

    return (
        <>       
            <div className="container mt-5">
                <div className="row">
                    <div className="btn-group">
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#listModal">open list</button>
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#jsonModal">open json</button>
                        <button className="btn btn-block btn-primary" onClick={(e) => {submitForm()}}>Submit</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <h1>From</h1>
                        <CurrentNode
                            node={currentNode.node}
                            nextNodes={currentNode.optionNodes ? currentNode.optionNodes : []}
                            parentHandler={changeCurrentNode}
                        />
                    </div>
                    <div className="col-sm-4">
                        <h1>⎯⎯⎯⎯⟶</h1>
                        <form>
                            <div className="form-floating">
                                <input
                                    className="form-control" 
                                    type="text"
                                    value={optionText}
                                    placeholder="enter option's text"
                                    id="option-text-input"
                                    name="option text"
                                    onChange={(e) => setOptionText(e.target.value)}
                                />
                                <label for="option-text-input">option's text</label>
                            </div>
                            <div className="form-floating">
                                <input 
                                    className="form-control" 
                                    type="text"
                                    value={optionCondition}
                                    placeholder="enter option's condition"
                                    id="option-condition-input"
                                    onChange={(e) => setOptionCondition(e.target.value)}
                                />
                                <label for="option-condition-input">option's condition</label>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-4">
                        <h1>To</h1>
                        {createNew ? (
                            <>
                                <form>
                                    <div className="form-floating">
                                        <input
                                            id="node-character-input"
                                            className="form-control" 
                                            name="node's character" 
                                            type="text"
                                            placeholder="enter node's character"
                                            value={character}
                                            onChange={(e) => setCharacter(e.target.value)}
                                        />
                                        <label for="node-character-input">Character:</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            id="node-text-input"
                                            className="form-control" 
                                            name="node's text" 
                                            type="text"
                                            placeholder="enter node's text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                        <label for="node-text-input">Text:</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            id="node-processor-input"
                                            className="form-control" 
                                            name="node's processor" 
                                            type="text"
                                            placeholder="enter node's processor"
                                            value={processor}
                                            onChange={(e) => setProcessor(e.target.value)}
                                        />
                                        <label for="node-processor-input">Processor:</label>
                                    </div>
                                    <div className="form-floating">
                                        <input 
                                            id="node-illustration-input"
                                            className="form-control" 
                                            name="node's illustration"
                                            type="text"
                                            placeholder="enter node's illustration"
                                            value={illustration}
                                            onChange={(e) => setIllustration(e.target.value)}
                                        />
                                        <label for="node-illustration-input">Image:</label>
                                    </div>
                                </form>
                            </>
                        ):(
                            <>
                                <div>
                                     <ConversationPart node={toNode}/>
                                </div>
                            </>
                        )}
                        <div>
                            <input
                                checked={createNew}
                                type="checkbox"
                                value={createNew}
                                onChange={createNewChanged}
                            />
                            new
                        </div>
                    </div>
                </div>
            </div>
            <NodesListModal graphNodes={graphNodes} changeCurrentNode={changeCurrentNode} chooseToNode={chooseToNode}/>                    
            <JsonResultModal result={graphLists} />
        </>
    );
}

export default App;