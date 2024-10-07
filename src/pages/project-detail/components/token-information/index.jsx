import React from "react";
import "./index.scss";

const BFTokenInformation = ({ showAddToken, onAddToken, selectedProject }) => {
    return <div className="bf-token-information">
        <div className="title">Token information</div>
        <div className="bf-token-information-inner">
            <div className="table-responsive">
                <table className="table mb-0">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td className="text-end">{selectedProject.name}</td>
                        </tr>
                        <tr>
                            <td>Token Symbol</td>
                            <td className="text-end">{selectedProject.projectTokenSymbol}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {
                                    showAddToken >= 0 && <button type="button" onClick={onAddToken}>
                                        +Add token to <b>MetaMask</b>
                                    </button>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}
export default BFTokenInformation