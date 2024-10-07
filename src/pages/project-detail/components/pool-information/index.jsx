import moment from "moment";
import React from "react";
import "./index.scss";

const BFPoolInformation = ({ selectedProject }) => {
    return <div className="bf-pool-information">
        <div className="title">Pool information</div>
        <div className="bf-pool-information-inner">
            <div className="table-responsive">
                <table className="table mb-0">
                    <tbody>
                        <tr>
                            <td>Opens</td>
                            {
                                selectedProject.openTime === undefined ?
                                    <td className="text-end">TBA</td>
                                    : <td className="text-end">{moment(selectedProject.openTime * 1000 || 0).utc().format('MM-DD HH:mm')} UTC</td>
                            }
                        </tr>
                        <tr>
                            <td>FCFS Opens</td>
                            {
                                selectedProject.fcfsOpenTime === undefined ?
                                    <td className="text-end">TBA</td>
                                    : <td className="text-end">{moment(selectedProject.fcfsOpenTime * 1000 || 0).utc().format('MM-DD HH:mm')} UTC</td>
                            }
                        </tr>
                        <tr>
                            <td>Closes</td>
                            {
                                selectedProject.closeTime === undefined ?
                                    <td className="text-end">TBA</td>
                                    : <td className="text-end">{moment(selectedProject.closeTime * 1000 || 0).utc().format('MM-DD HH:mm')} UTC</td>
                            }
                        </tr>
                        <tr>
                            <td>Swap Rate</td>
                            {
                                selectedProject.openTime !== undefined ?
                                    <td className="text-end">
                                        <span id="idBusdConvert">
                                            <span>1 {selectedProject.symbol}</span>
                                            <span> = {selectedProject['rate'].toFixed(4)} {selectedProject.projectTokenSymbol}</span>
                                        </span>
                                    </td>
                                    : <td className="text-end">
                                        <span id="idBusdConvert">TBA</span>
                                    </td>
                            }
                        </tr>

                        <tr>
                            <td>Cap</td>
                            {
                                selectedProject.openTime !== undefined ?
                                    <td className="text-end">{selectedProject.maxTotalParticipationAllocated} {selectedProject.symbol}</td>
                                    : <td className="text-end">TBA</td>
                            }
                        </tr>
                        <tr>
                            <td>Total Users Participated</td>
                            <td className="text-end">{selectedProject.totalCountUserParticipated || 0}</td>
                        </tr>
                        <tr>
                            <td>Total Funds Swapped</td>
                            {
                                selectedProject.openTime !== undefined ?
                                    <td className="text-end">{selectedProject.totalFundParticipated.toFixed(4) || 0} {selectedProject.symbol || ""}</td>
                                    : <td className="text-end">0</td>
                            }

                        </tr>
                        <tr>
                            <td>Access Type</td>
                            <td className="text-end">{selectedProject.isPrivate ? "Private" : "Public"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}
export default BFPoolInformation