import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { ACTION_CONST } from "../../../../constants";
import { useWeb3Utils } from "../../../../hook/useState";
import { formatTimeStampAllocation, formatTokenAllocation, helpers } from "../../../../shared/utils/helpers";
import { isMetamaskAvailable } from "../../../../shared/utils/utils";
import "./index.scss";

const BFYourAllocation = (props) => {
    const dispatch = useDispatch();
    const web3Utils = useWeb3Utils();
    const [layout, setLayout] = useState(1);
    const [allocationInfo, setAllocation] = useState([])

    useEffect(() => {
        if (props) {
            setAllocation(props.allocationInfo)
            setLayout(props.layout)
        }
    }, [props])

    const handleClaimClick = (index) => {
        if (web3Utils) {
            dispatch({
                type: ACTION_CONST.REQUEST_SUBMIT
            })
            web3Utils.claim({
                contractAddress: props.contractAddress,
                index: index
            }, (data) => {
                if (data.status === "CLAIM_SUCCESS") {
                    dispatch({ type: ACTION_CONST.REQUEST_DONE })
                    toast.success("Tokens Successfully Claimed");
                    props.handleBuyClick()
                }
                if (data.status === "CLAIM_FAIL") {
                    dispatch({ type: ACTION_CONST.REQUEST_DONE })
                    toast.error("Failed to claim tokens, Please contact support");
                    props.handleBuyClick()
                }
                //code handle event claim
            })
        }
    }

    return (
        <div className='bf-your-allowcation'>
            <div className="d-lg-none d-block">
                {
                    allocationInfo?.length <= 0 ? <div className='bf-nodata'>No data</div> : <></>
                }
                {
                    (allocationInfo.length > 0 && layout === 1) &&
                    allocationInfo.map((item, key) => (
                        <div className="allocation-card mb-4" key={key}>
                            <div>#{item.no}</div>
                            <div>
                                <span>Allocation</span>
                                <h4>{helpers.formatNumberDownRoundWithExtractMax((item.allocationAmount / 10 ** props.decimals || 0), 4)} {props.tokenSymbol}</h4>
                            </div>
                            <div>
                                <span>Date</span>
                                <h4>{(item.timestamp !== 0 && item.timestamp !== "0") ?
                                    <div>{moment(item.timestamp * 1000 || 0).utc().format('YYYY-MM-DD HH:mm:ss')} UTC </div>
                                    : "DEX Listing"
                                }</h4>
                            </div>
                            <div>
                                <span>Claimed</span>
                                <h4>{helpers.formatNumberDownRoundWithExtractMax((item.claimedAmount / 10 ** props.decimals || 0), 4)} {props.tokenSymbol}</h4>
                            </div>
                            <div>
                                <button type="button" disabled={!(item.status === "OPEN")} onClick={() => handleClaimClick(key)}>Claim Tokens</button>
                            </div>
                        </div>
                    ))
                }
                {
                    (allocationInfo.length > 0 && layout === 2) &&
                    allocationInfo.map((item, key) => (
                        <div className="allocation-card mb-4" key={key}>
                            <div>#{item.no}</div>
                            <div>
                                <span>Allocation</span>
                                <h4>{formatTokenAllocation(item.allocationAmount, props.decimals, 4)}</h4>
                            </div>
                            <div>
                                <span>Percentage</span>
                                <h4>{(item.percentage / 100).toFixed(2)}%</h4>
                            </div>
                            <div>
                                <span>Date</span>
                                <h4>{(item.timestamp !== 0 && item.timestamp !== "0") ?
                                    <div dangerouslySetInnerHTML={{ __html: formatTimeStampAllocation(item.timestamp) }}></div>
                                    : "DEX Listing"
                                }</h4>
                            </div>
                            <div>
                                <span>Claimed</span>
                                <h4>{helpers.formatNumberDownRoundWithExtractMax((item.claimedAmount / 10 ** props.decimals || 0), 4)}</h4>
                            </div>
                            <div>
                                <button type="button" disabled={!(item.status === "OPEN")} onClick={() => handleClaimClick(key)}>Claim Tokens</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="d-none d-lg-block">
                {
                    allocationInfo?.length <= 0 ? <div className='bf-nodata'>No data</div> : <div className="table-responsive">
                        <table className="table pp-table-info text-white">
                            <thead>
                                <tr className="card-header" style={{ border: "none" }}>
                                    <th className='no'>No.</th>
                                    <th>Allocation</th>
                                    {
                                        layout === 2 &&
                                        <th>Percentage</th>
                                    }
                                    <th>Date</th>
                                    <th>Claimed</th>
                                    {isMetamaskAvailable() &&
                                        <th className='action'>Action</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (allocationInfo.length > 0 && layout === 1) &&
                                    allocationInfo.map((item, key) => (
                                        <tr key={key}>
                                            <td className='no'>{item.no}</td>
                                            <td className='percentage'>
                                                {helpers.formatNumberDownRoundWithExtractMax((item.allocationAmount / 10 ** props.decimals || 0), 4)} {props.tokenSymbol}
                                            </td>
                                            <td className='date'>
                                                {(item.timestamp !== 0 && item.timestamp !== "0") ?
                                                    <div>{moment(item.timestamp * 1000 || 0).utc().format('YYYY-MM-DD HH:mm:ss')} UTC </div>
                                                    : "DEX Listing"
                                                }
                                            </td>
                                            <td className='claimed'>
                                                {helpers.formatNumberDownRoundWithExtractMax((item.claimedAmount / 10 ** props.decimals || 0), 4)} {props.tokenSymbol}
                                            </td>
                                            <td className="action">
                                                <button type='button' disabled={!(item.status === "OPEN")} onClick={() => handleClaimClick(key)}>Claim Tokens</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                {
                                    (allocationInfo.length > 0 && layout === 2) &&
                                    allocationInfo.map((item, key) => (
                                        <tr key={key}>
                                            <td className='no'>{item.no}</td>
                                            <td className='allocation'>{formatTokenAllocation(item.allocationAmount, props.decimals, 4)}</td>
                                            <td className='percentage'>{(item.percentage / 100).toFixed(2)}%</td>
                                            <td className='date'>
                                                {(item.timestamp !== 0 && item.timestamp !== "0") ?
                                                    <div dangerouslySetInnerHTML={{ __html: formatTimeStampAllocation(item.timestamp) }}></div>
                                                    : "DEX Listing"
                                                }
                                            </td>
                                            <td className='claimed'>
                                                {helpers.formatNumberDownRoundWithExtractMax((item.claimedAmount / 10 ** props.decimals || 0), 4)}
                                            </td>
                                            <td className="action">
                                                <button type="button" disabled={!(item.status === "OPEN")} onClick={() => handleClaimClick(key)}>Claim Tokens</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }

            </div>
        </div>
    );
};

export default BFYourAllocation;
