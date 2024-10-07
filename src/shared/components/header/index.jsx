import exactMath from 'exact-math';
import $ from 'jquery';
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useActiveWeb3React } from '../../../hook';
import { useKycStatus, useLatestBlockNumber, usePadTokenBalance, useWeb3Utils } from "../../../hook/useState";
import { getKYC } from '../../../redux/services/account.api';
import { ACTION_CONST, ROUTES } from "../../constants";
import BFConnectWallet from '../connect-wallet';
import BFYourWallet from '../your-wallet';
import Web3Helper from '../../utils/walletExtensionUtils';
import BFButton from '../button';
import "./index.scss";
import { WHITE_LIST } from '../../../constants';

const BFHeader = () => {
  const dispatch = useDispatch();
  const walletUtils = useWeb3Utils()
  const bscPadTokenBalance = usePadTokenBalance();
  const latestBlock = useLatestBlockNumber()
  const kycStatus = useKycStatus();

  const [balancePadTokenBSC] = useState(0);
  const [balancePadTokenETH] = useState(0);
  const [showKYC, setShowKyc] = useState(false)
  const { account, library, error, chainId } = useActiveWeb3React()

  //login wallet
  useEffect(() => {
    if (error)
      return;
    if (account && library && library.provider) {
      const web3 = new Web3Helper(library.provider, account, chainId)
      dispatch({
        type: ACTION_CONST.ENABLE_WALLET_SUCCESS,
        data: web3
      })
      return;
    }
  }, [library, account, error, dispatch, chainId])
  //set balance
  useEffect(() => {
    // debugger
    if (!account || !walletUtils)  return;
     
    //get bnb balance
    walletUtils.web3.eth.getBalance(account).then(balance => {
      dispatch({
        type: ACTION_CONST.GET_BNB_BALANCE,
        data: exactMath.div(balance?.toString(), 10 ** 18)
      })
    }).catch(err => {
      console.log(err);
    })


  }, [latestBlock, walletUtils, account, dispatch]);

  useEffect(() => {

    if(!account || !WHITE_LIST.find(item => item.toLowerCase() === account.toLowerCase())) return
       
    setShowKyc(true)
    getKYCAddress(account);
   
  }, [account])

  useEffect(() => {
    dispatch({
      type: ACTION_CONST.GET_BLAST_WALLET_BALANCE,
      data: Number(balancePadTokenBSC) + Number(balancePadTokenETH)
    })
  }, [balancePadTokenBSC, balancePadTokenETH, dispatch])

  //get kyc
  const getKYCAddress = (address) => {

    getKYC(address, 'state').then(response => {
      address = address.toLowerCase()
      if (response) {
        const state = response.state;
        if (state === 1) {
          return dispatch({
            type: ACTION_CONST.GET_KYC_INFO,
            data: 'START'
          })
        }
        if (state === 2) {
          return dispatch({
            type: ACTION_CONST.GET_KYC_INFO,
            data: 'PENDING'
          })
        }
        if (state === 3) {
          return dispatch({
            type: ACTION_CONST.GET_KYC_INFO,
            data: 'APPROVED'
          })
        }
        if (state === 4) {
          return dispatch({
            type: ACTION_CONST.GET_KYC_INFO,
            data: 'ERROR'
          })
        }
      }

    }).catch(err => {
      console.log(err);
    })
  }

  const handleOnclickKyc = () => {
    getKYC(account, 'url').then(data => {
      if (data) {
        const url = data.url
        window.open(url, "_blank")
      }

    }).catch(err => {
      console.log(err);
    })
  }

  const handleTabChange = () => {
    $('.navbar-toggler').trigger('click');
  }

  return <header>
          <div className="container">
            <div className="mf-navbar">
              <Link className="mf-logo" to={""}><img src="images/metafi.png" alt="" /></Link>
              <div className="mf-navbar-nav">
                <ul id="MainMenu">
                  <li><Link className="active" to={ROUTES.PROJECTS}>Launchpad</Link></li>
                  <li><Link to=''>Staking</Link></li>
                  <button type="button" className="mf-close-menu" id="btnCloseMenu">
                    <img src="assets/images/close.svg" alt=""/>
                  </button>
                </ul>
                <div className="mf-navbar-wallet">
                {
                      !account ? <BFConnectWallet /> :
                        <>
                          <BFYourWallet />
                          {showKYC&&
                            <>
                              {kycStatus === 'START' &&
                                <BFButton className='ms-3' buttonText='KYC' icon={<i className="fas fa-bolt me-1"></i>} onClick={() => handleOnclickKyc()} />}
                              {kycStatus === 'PENDING' &&
                                <BFButton className='ms-3' buttonText="KYC" icon={<i className="fas fa-exclamation-triangle me-1"></i>} onClick={() => handleOnclickKyc()} />}
                              {kycStatus === 'APPROVED' &&
                                <BFButton className='ms-3' buttonText='KYC' variant="success readonly" icon={<i className="fas fa-check me-1"></i>} />}
                              {kycStatus === 'ERROR' &&
                                <BFButton className='ms-3' buttonText="KYC" variant="danger" icon={<i className="fas fa-times me-1"></i>} onClick={() => handleOnclickKyc()} />}
                            </>
                          }

                        </>
                    }

                  <button type="button" className="mf-open-menu" id="btnOpenMenu">
                    <img src="images/menu.svg" alt=""/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
};

export default BFHeader;
