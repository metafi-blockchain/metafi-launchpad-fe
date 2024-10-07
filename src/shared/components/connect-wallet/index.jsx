import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connectorLocalStorageKey } from '../../../library/literals';
import { connectors } from '../../../constants';
import useAuth from '../../../hook/useAuth';
import BFButton from '../button';

const BFConnectWallet = ({ buttonSize = 'sm' }) => {
    const { login } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleConnectClick = useCallback((walletConfig) => {
        try {
            login(walletConfig.connectorId);
            window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
            setShowModal(false);

        } catch (error) {
            console.log(error);
        }
    }, [login])

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <BFButton size={buttonSize} buttonText='Connect wallet' onClick={() => setShowModal(true)} />
            <Modal size='sm' className='bf-modal' centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Connect to wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        connectors.filter(x => x.enable)?.map((entry, idx) => <BFButton
                            className={`w-100 bf-modal-btn ${idx === 0 ? 'mb-3' : ''}`}
                            size='lg'
                            key={idx}
                            icon={<img className="me-2" src={entry.icon} height="36" alt={entry.connectorId} />}
                            buttonText={entry.title}
                            onClick={() => handleConnectClick(entry)}
                        />)
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BFConnectWallet;


