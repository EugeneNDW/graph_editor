import React from "react";
import ChoosableNode from "./ChoosableNode";

const NodesListModal = ({graphNodes, changeCurrentNode, chooseToNode}) => {
    return (
        <>
            <div className="modal" id="listModal">
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Result</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-sm-12">
                                {graphNodes.map((n) => (
                                    <ChoosableNode node={n} currentHandler={changeCurrentNode} toNodeHandler={chooseToNode}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NodesListModal;