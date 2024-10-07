import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { BSC_EXPLORER } from '../../../_configs';
import { useActiveWeb3React } from '../../../hook';
import useCopyToClipboard from '../../../hook/CopyToClibboard';
import useAuth from '../../../hook/useAuth';
import { usePadTokenBalance } from '../../../hook/useState';
import BFButton from '../button';
import { ACTION_CONST } from '../../constants';
import { helpers } from '../../utils';

const BFYourWallet = () => {
    const dispatch = useDispatch();
    const bscPadTokenBalance = usePadTokenBalance();
    const [copied, setCopied] = useCopyToClipboard(1000);
    const { logout } = useAuth();
    const { account, chainId } = useActiveWeb3React();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        localStorage.clear();
        dispatch({
            type: ACTION_CONST.LOG_OUT_WALLET_SUCCESS
        })
        window.location.reload();
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>

            <BFButton onClick={() => setShowModal(true)} size='sm wd' buttonText={<><b>{helpers.formatTransactionHash(account, 3, 3)}</b>&nbsp;-&nbsp;{helpers.formatNumberDownRoundWithExtractMax(bscPadTokenBalance, 3)} BLASTFI</>} />

       

            <Modal className='bf-modal' centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Your wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <div className={`modal-copy-content ${copied ? 'copied' : ''}`} onClick={() => setCopied(account)}>
                        {account}
                        <i className={`icon ${!copied ? 'far fa-clone' : 'fas fa-check'}`}></i>
                    </div>
                    <a href={`${BSC_EXPLORER[chainId]}/address/${account}`} target="_blank" className='modal-link' rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt me-1"></i>
                        View on Scanner
                    </a>
                    <div className="mt-4 pt-1">
                        <BFButton onClick={handleLogout} buttonText="Logout" size='lg' className='w-100 bf-modal-btn bf-modal-btn-primary justify-content-center' />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BFYourWallet;


