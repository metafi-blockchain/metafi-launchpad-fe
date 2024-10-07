import React, { useState, } from "react";

import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { ACTION_CONST } from "../../../../constants";
import { useProjectName, useProjectSymbol, useSelectedProject, useWeb3Utils } from "../../../../hook/useState";
import BFButton from "../../../../shared/components/button";
import { helpers } from "../../../../shared/utils/helpers";

const BFApproveModal = (props) => {
    const dispatch = useDispatch();
    const selectedProject = useSelectedProject();
    const web3Utils = useWeb3Utils();
    const [amount, setAmount] = useState(0);
    const projectName = useProjectName();
    const symbol = useProjectSymbol();
    const [enableAprBtn, setEnableAprBtn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOnchangeAmount = (e) => {
        const amountInputValue = Number(e.target.value);
        if (0 < amountInputValue
            && amountInputValue <= props.walletInfo.remainingAllocation
            && amountInputValue <= props.walletInfo.tokenBalance) {
            setEnableAprBtn(true);
        } else {
            setEnableAprBtn(false)
        }

        setAmount(amountInputValue)
        props.handleInputAmount(amountInputValue)
        return;
    }

    const handleClickMax = () => {
        if (props.walletInfo.tokenBalance > 0 && props.walletInfo.remainingAllocation <= props.walletInfo.tokenBalance) {
            setAmount(helpers.formatNumberDownRound(props.walletInfo.remainingAllocation, 6))
            document.getElementById('inputAmountApprove').value = helpers.formatNumberDownRound(props.walletInfo.remainingAllocation, 6);
            setEnableAprBtn(true);
            return;
        }
        if (props.walletInfo.remainingAllocation > 0 && props.walletInfo.remainingAllocation > props.walletInfo.tokenBalance) {
            setAmount(helpers.formatNumberDownRound(props.walletInfo.tokenBalance, 6))
            document.getElementById('inputAmountApprove').value = helpers.formatNumberDownRound(props.walletInfo.tokenBalance, 6)
            setEnableAprBtn(true);
            return;
        }
        setEnableAprBtn(false);
    }

    const handleApprove = () => {
        if (web3Utils && selectedProject) {
            dispatch({
                type: ACTION_CONST.REQUEST_SUBMIT
            })
            web3Utils.approve({
                contractAddress: selectedProject.contract,
                tokenContractAddress: selectedProject.tokenAddress,
                amount: Number(amount)
            }, (data) => {

                if (data.status === "APPROVED") {
                    dispatch({ type: ACTION_CONST.REQUEST_DONE })
                    props.handleBuyClick()
                    document.getElementById("inputAmountApprove").value = 0;
                    setEnableAprBtn(false);
                    toast.success("Approve Success!");
                    setShowModal(false);
                }
                if (data.status === "APPROVE_FAILS") {
                    dispatch({ type: ACTION_CONST.REQUEST_DONE })
                    toast.error("Failed to Approve Tokens");
                }
            }).catch(err => {
                toast.error("Token Approve Fails! Please try again!");
                dispatch({ type: ACTION_CONST.REQUEST_DONE })
            })
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <BFButton disabled={props.disabled} buttonText='Approve' size="lg" className="px-5" onClick={() => setShowModal(true)} />
            <Modal size='md' className='bf-modal' centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Join {projectName} Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="bf-form-group">
                        <div className="bf-form-label">{symbol} Amount</div>
                        <div className="bf-amount-input">
                            <input type="number" className="form-control form-control-lg" placeholder={0.0} defaultValue={0} autoFocus onChange={(e) => handleOnchangeAmount(e)} id="inputAmountApprove" />
                            <button type="button" onClick={handleClickMax}>MAX</button>
                        </div>
                    </div>
                    <div className="text-end">Your balance: <b className="text-black">{props?.tokenBalance} {props?.symbol}</b></div>
                    <div className="mt-4">
                        <BFButton disabled={!enableAprBtn} onClick={() => handleApprove()} buttonText="Approve" size="lg" className="w-100 bf-modal-btn bf-modal-btn-primary justify-content-center" />
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
};

export default BFApproveModal;




