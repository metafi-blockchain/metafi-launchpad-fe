import React from "react";
import "./index.scss";
import moment from "moment";

const BFScheduleInformation = (props) => {
    return (
        <div className="bf-schedule-information">
            <div className="title">Schedule</div>
            <div className="bf-schedule-information-inner">
                <div className="table-responsive">
                    <table className="table mb-0">
                        <tbody>
                            <tr>
                                <td>Round</td>
                                <td>Opens</td>
                                <td>Closes</td>
                            </tr>
                            {props.roundInfo.length > 0 &&
                                props.roundInfo.map((item, key) =>
                                (
                                    <tr key={key}>
                                        <td>{item.round}</td>
                                        <td>{moment(item.opens * 1000 || 0).utc().format('MM-DD HH:mm')} UTC</td>
                                        <td>{moment(item.closes * 1000 || 0).utc().format('MM-DD HH:mm')} UTC</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BFScheduleInformation;
