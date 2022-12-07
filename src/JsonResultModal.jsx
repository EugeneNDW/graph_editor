import React from "react";

const JsonResultModal = ({result}) => {
    return (
        <>      
            <div className="modal" id="jsonModal">
                 <div className="modal-dialog modal-dialog-scrollable modal-lg">
                     <div className="modal-content">
                         <div className="modal-header">
                             <h3>JSON to copy</h3>
                             <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                         </div>
                         <div className="modal-body">
                             <div className="col-sm-12">
                                 <pre>
                                     {JSON.stringify(result, undefined, 2)}
                                 </pre>
                             </div> 
                         </div>
                     </div>
                 </div>
             </div>
        </>
    )
}

export default JsonResultModal;