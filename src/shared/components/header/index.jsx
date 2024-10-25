import exactMath from 'exact-math';
import $ from 'jquery';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useActiveWeb3React } from '../../../hook';
import {useLatestBlockNumber, useWeb3Utils } from "../../../hook/useState";
import { ACTION_CONST, ROUTES } from "../../constants";
import BFConnectWallet from '../connect-wallet';
import BFYourWallet from '../your-wallet';
import Web3Helper from '../../utils/walletExtensionUtils';
import "./index.scss";

const BFHeader = () => {
  const dispatch = useDispatch();
  const walletUtils = useWeb3Utils()
  const latestBlock = useLatestBlockNumber()

  const [balancePadTokenBSC] = useState(0);
  const [balancePadTokenETH] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const { account, library, error, chainId } = useActiveWeb3React()

  const handleToggleOpenMenu = (show) => {
    setShowMenu(show);
    if(show) {
      $('body').addClass('overflow-hidden');
    } else {
      $('body').removeClass('overflow-hidden');
    }
  }

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
    dispatch({
      type: ACTION_CONST.GET_BLAST_WALLET_BALANCE,
      data: Number(balancePadTokenBSC) + Number(balancePadTokenETH)
    })
  }, [balancePadTokenBSC, balancePadTokenETH, dispatch])




  return <header>
          <div className="container">
            <div className="mf-navbar">
              <Link className="mf-logo" to={""}><img src="images/metafi.png" alt="" /></Link>
              <div className="mf-navbar-nav">
                <ul id="MainMenu" className={showMenu ? 'show' : ''}>
                  <li><Link className="active" to={ROUTES.PROJECTS}>Launchpad</Link></li>
                  <li><Link to=''>Staking</Link></li>
                  <button type="button" className="mf-close-menu" id="btnCloseMenu" onClick={() => handleToggleOpenMenu(false)}>
                    <img src="images/close.svg" alt=""/>
                  </button>
                </ul>
                <div className="mf-navbar-wallet">
                {
                      !account ? <BFConnectWallet /> :
                        <>
                          <BFYourWallet />
                        </>
                    }

                  <button type="button" className="mf-open-menu" id="btnOpenMenu" onClick={() => handleToggleOpenMenu(true)}>
                    <img src="images/menu.svg" alt=""/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
};

export default BFHeader;
