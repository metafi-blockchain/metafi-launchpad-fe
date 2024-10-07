import React, { useState, } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { ACTION_CONST } from "../../../../constants";
import { useProjectName, useProjectSymbol, useSelectedProject, useWeb3Utils } from "../../../../hook/useState";
import BFButton from "../../../../shared/components/button";
import { helpers } from "../../../../shared/utils/helpers";

const BFInvestmentModal = (props) => {
    const dispatch = useDispatch();
    const selectedProject = useSelectedProject();
    const web3Utils = useWeb3Utils();
    const [amount, setAmount] = useState(0);
    const projectName = useProjectName();
    const symbol = useProjectSymbol();
    const [enableBuyBtn, setEnableBuyBtn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClickMax = () => {
        if (Number(props.allocationNumber) === 0 || Number(props.remainingAllocation === 0)) {
            setEnableBuyBtn(false);
            return;
        }
        if (props.allocationNumber > 0 && props.allocationNumber < props.remainingAllocation && props.allocationNumber < props.walletInfo.tokenBalance) {
            document.getElementById("inputAmountSwap").value = helpers.formatNumberDownRound(props.allocationNumber, 6);
            setAmount(helpers.formatNumberDownRound(props.allocationNumber, 6));
            setEnableBuyBtn(true);
            return;
        }
        if (props.remainingAllocation > 0 && props.remainingAllocation < props.walletInfo.tokenBalance) {
            document.getElementById("inputAmountSwap").value = helpers.formatNumberDownRound(props.remainingAllocation, 6);
            setAmount(helpers.formatNumberDownRound(props.remainingAllocation, 6));
            setEnableBuyBtn(true);
            return;
        }
        if (props.walletInfo.tokenBalance > 0 && props.remainingAllocation >= props.walletInfo.tokenBalance) {
            document.getElementById("inputAmountSwap").value = helpers.formatNumberDownRound(props.walletInfo.tokenBalance, 6);
            setAmount(helpers.formatNumberDownRound(props.walletInfo.tokenBalance, 6))
            setEnableBuyBtn(true);
            return;
        }
        setEnableBuyBtn(false);
    }

    const handleOnchangeAmount = (e) => {
        const amountInputValue = Number(e.target.value);
        // check balance of account
        if (0 < amountInputValue && amountInputValue <= props.remainingAllocation
            && amountInputValue <= props.walletInfo.remainingAllocation
            && amountInputValue <= props.walletInfo.tokenBalance) {
            setEnableBuyBtn(true);
        } else {
            setEnableBuyBtn(false)
        }
        setAmount(amountInputValue)
        props.handleInputAmount(amountInputValue)
        return;
    }

    const handleBuyClick = () => {
        if (web3Utils && selectedProject) {
            dispatch({
                type: ACTION_CONST.REQUEST_SUBMIT
            })
            web3Utils.buyTokens({
                contractAddress: selectedProject.contract,
                tokenAddress: selectedProject.tokenAddress,
                amount: Number(amount)
            }, (data) => {
                debugger
                if (data.status === "BUY_SUCCESS") {
                    dispatch({ type: ACTION_CONST.REQUEST_DONE })
                    props.handleBuyClick()
                    setEnableBuyBtn(false);
                    document.getElementById("inputAmountSwap").value = 0;
                    toast.success("Successfully Joined Pool!");
                    setShowModal(false);
                }
                if (data.status === "BUY_FAIL") {
                    dispatch({ type: ACTION_CONST.REQUEST_DONE })
                    toast.error("Failed to Join Pool");
                }
            }).catch(err => {
                dispatch({ type: ACTION_CONST.REQUEST_DONE })
                toast.error("Failed to Join Pool! Please try again!");
                console.log(err);
            })
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <BFButton disabled={props.disabled} buttonText='Join Pool' size="lg" className="px-5" onClick={() => setShowModal(true)} />
            <Modal size='md' className='bf-modal' centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Join {projectName} Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="bf-form-group">
                        <div className="bf-form-label">{symbol} Amount</div>
                        <div className="bf-amount-input">
                            <input type="number" className="form-control form-control-lg" placeholder={0.0} defaultValue={0} autoFocus onChange={(e) => handleOnchangeAmount(e)} id="inputAmountSwap" />
                            <button type="button" onClick={handleClickMax}>MAX</button>
                        </div>
                    </div>
                    <div className="text-end">Your balance: <b className="text-black">{props?.tokenBalance} {props?.symbol}</b></div>
                    <div className="mt-4">
                        <BFButton disabled={!enableBuyBtn} onClick={() => handleBuyClick()} buttonText="Join" size="lg" className="w-100 bf-modal-btn bf-modal-btn-primary justify-content-center" />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default BFInvestmentModal;
