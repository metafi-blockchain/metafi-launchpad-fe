import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Lightbox } from 'react-modal-image';
import Slider from 'react-slick';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { NATIVE_COIN_SYMBOL } from '../../_configs';
import { ACTION_CONST, ROUTES } from '../../constants';
import { useActiveWeb3React } from '../../hook';
import {
	useBlockingUI,
	useInfoRound,
	useLatestBlockNumber,
	useSelectedProject,
	useWeb3Utils
} from '../../hook/useState';
import {
	actGetListProjects,
	actSelectedProject,
	actSetCurrentContract
} from '../../redux/action/user';
import { getProject } from '../../redux/services/project';
import BFConnectWallet from '../../shared/components/connect-wallet';
import MFSection from '../../shared/components/section';
import { getCountDown } from '../../shared/utils/helper';
import { helpers } from '../../shared/utils/helpers';
import { history } from '../../shared/utils/history';
import { addTokenToMetamask } from '../../shared/utils/metamaskUtils';
import BFApproveModal from './components/approve-modal';
import BFDescriptionTab from './components/description-tab';
import BFTokenmetricsTab from './components/tokenmetrics-tab';
import BFInvestmentModal from './components/invest-modal';
import BFPoolInformation from './components/pool-information';
import BFScheduleInformation from './components/schedule-information';
import BFTokenInformation from './components/token-information';
import BFYourAllocation from './components/your-allocation';
import './index.scss';

const ProjectDetailPage = () => {
	const dispatch = useDispatch();
	let params = useParams();
	const [contractAddress, setContractAddress] = useState('');
	const [tokenBalance, setTokenBalance] = useState(0);
	const [ethBalance, setEthBalance] = useState(0);
	const [remainingAllocation, setMaxTokenAllocation] = useState(0);
	const [userParticipation, setUserParticipation] = useState(0);
	const [amountPurchased, setAmountPurchased] = useState(0);
	const [countBuy, setCountBuy] = useState(0);
	const [enableJoinProject, setEnableJoinProject] = useState(false);
	const [projectState, setProjectState] = useState(null);
	const [tier, setTier] = useState('');
	const [roundState, setRoundState] = useState(0);
	const [textRoundState, setTextRoundState] = useState('');
	const [roundTime, setRoundTime] = useState(0);
	const [selectedImage, setSelectedImage] = useState(null);
	const [allocationNumber, setAllocationNumber] = useState(0);
	const [allocationInfo, setAllocationInfo] = useState([]);
	const [layoutAllocation, setLayoutAllocation] = useState(1);
	const [yourAllocationVisible, setYourAllocationVisible] = useState(false);
	const [enableApprove, setEnableApprove] = useState(false);
	const showBlockUI = useBlockingUI();
	const [walletInfo, setWalletInfo] = useState({
		remainingAllocation: 0,
		tokenBalance: 0
	});
	const { account } = useActiveWeb3React();
	const latestBlock = useLatestBlockNumber();
	const selectedProject = useSelectedProject();
	const web3Utils = useWeb3Utils();
	const roundInfo = useInfoRound();
	const [closeTime, setCloseTime] = useState(0);
	const [openTime, setOpenTime] = useState(0);
	const [fcfsOpenTime, setFcfsOpenTime] = useState(0);
	const [activeTab, setActiveTab] = useState(3);

	useEffect(() => {
		const { id } = params;
		getProjectDetails(id)
			.then(project => {
				let contract = project.contract;
				if (contract && typeof contract === 'string') {
					setContractAddress(contract);
					dispatch(actSetCurrentContract(contract));
					dispatch(actSelectedProject(contract));
					console.log(project);
				} else {
					history.push(ROUTES.PROJECTS);
					return;
				}
			})
			.catch(e => {
				console.log(e);
				history.push(ROUTES.PROJECTS);
			});
	}, [showBlockUI, dispatch, params]);

	//Job interval
	useEffect(() => {
		if (contractAddress) {
			dispatch(actSetCurrentContract(contractAddress));
			dispatch(actSelectedProject(contractAddress));
		}
	}, [latestBlock, contractAddress, dispatch]);

	useEffect(() => {
		if (selectedProject) {
			if (selectedProject.closeTime !== closeTime) {
				setCloseTime(selectedProject.closeTime);
			}
			if (selectedProject.openTime !== openTime) {
				setOpenTime(selectedProject.openTime);
			}
			if (selectedProject.fcfsOpenTime !== fcfsOpenTime) {
				setFcfsOpenTime(selectedProject.fcfsOpenTime);
			}
			setYourAllocationVisible(selectedProject.yourAllocationVisible);
			setProjectState(selectedProject);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProject]);

	useEffect(() => {
		if (openTime > 0) {
			getCountDown(
				`idOpenTime-${selectedProject['contract']}`,
				openTime * 1000,
				job => {
					dispatch({
						type: ACTION_CONST.SET_JOB_COUNT_DOWN_OPEN,
						data: job
					});
				},
				job => {
					getWalletInfo(contractAddress);
					dispatch(actSelectedProject(contractAddress));
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openTime, dispatch, contractAddress]);

	useEffect(() => {
		if (closeTime > 0) {
			getCountDown(
				`idTimeClose-${selectedProject['contract']}`,
				closeTime * 1000,
				job => {
					//do smt when start new count down
					dispatch({
						type: ACTION_CONST.SET_JOB_COUNT_DOWN_CLOSE,
						data: job
					});
				},
				job => {
					getWalletInfo(contractAddress);
					dispatch(actSelectedProject(contractAddress));
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [closeTime, dispatch, amountPurchased]);

	useEffect(() => {
		if (fcfsOpenTime > 0) {
			getCountDown(
				`idFcfsOpenTime-${selectedProject['contract']}`,
				fcfsOpenTime * 1000,
				job => {
					//do smt when start new count down
					dispatch({
						type: ACTION_CONST.SET_JOB_COUNT_DOWN_FCFS_TIME,
						data: job
					});
				},
				job => {
					getWalletInfo(contractAddress);
					dispatch(actSelectedProject(contractAddress));
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fcfsOpenTime, dispatch, amountPurchased]);

	useEffect(() => {
		//round time dc chay lai khi call wallet ==> sinh ra nhieu rountime nay
		if (roundTime > 0 && selectedProject) {
			getCountDown(
				`idRoundTime-${selectedProject['contract']}`,
				roundTime * 1000,
				function start(job) {
					//do smt when countdown expired
					dispatch({
						type: ACTION_CONST.SET_JOB_COUNT_DOWN_ROUND,
						data: job
					});
				},
				function end(job) {
					getWalletInfo(contractAddress);
					dispatch(actSelectedProject(contractAddress));
					//do smt when countdown expired
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roundTime, selectedProject, dispatch]);

	//check enable disable approve button
	useEffect(() => {
		if (Number(remainingAllocation) > Number(allocationNumber)) {
			setEnableApprove(true);
		} else {
			setEnableApprove(false);
		}
	}, [allocationNumber, remainingAllocation, amountPurchased]);

	useEffect(() => {
		if (account && web3Utils && projectState) {
			dispatch(actGetListProjects());
			// console.log("count===>", count++);

			fetchData(contractAddress);
		}
		async function fetchData(contract) {
			if (contract) {
				await getWalletInfo(contract);
				await getAllowance();
				await getYourAllocation(contract);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		account,
		web3Utils,
		countBuy,
		contractAddress,
		projectState,
		latestBlock,
		dispatch
	]);

	const getWalletInfo = async contract => {
		if (web3Utils) {
			web3Utils
				.getInfoWallet(contract)
				.then(data => {
					setWalletInfo({
						remainingAllocation:
							data.remainingAllocation / 10 ** projectState.decimal,
						tokenBalance: data.tokenBalance / 10 ** projectState.decimal,
						ethBalance: data.ethBalance
					});
					setEthBalance(data.ethBalance);
					setTokenBalance(data.tokenBalance / 10 ** projectState.decimal);
					setUserParticipation(
						data.userParticipation / 10 ** projectState.decimal
					);
					setMaxTokenAllocation(
						data.remainingAllocation / 10 ** projectState.decimal
					);
					setTier(data.tier);
					setRoundState(data.roundState);
					setTextRoundState(data.roundStateText);
					if (document.getElementById('idTextRoundState')) {
						document.getElementById('idTextRoundState').innerHTML =
							data.roundStateText;
					}
					if (roundTime !== data.roundTimestamp) {
						setRoundTime(data.roundTimestamp);
					}
					if (!(data.roundState === 1 || data.roundState === 3)) {
						setEnableJoinProject(false);
						return;
					}
					if (
						projectState.state === 'C' ||
						projectState.state === 'P' ||
						projectState.address === 'TBA'
					) {
						setEnableJoinProject(false);
						return;
					} else {
						if (data.remainingAllocation > 0) {
							setEnableJoinProject(true);
							return;
						}
					}
					setEnableJoinProject(false);
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	const getProjectDetails = async id => {
		try {
			const res = await getProject(id);
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const getAllowance = async () => {
		web3Utils
			.getAllowance(selectedProject.tokenAddress, selectedProject.contract)
			.then(data => {
				setAllocationNumber(data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const getYourAllocation = contract => {
		web3Utils
			.getInfoAllocations(contract)
			.then(data => {
				setLayoutAllocation(data.layout);
				setAllocationInfo(data.infoAllocation);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleAddTokenToMetamask = async () => {
		if (projectState.projectTokenContract) {
			addTokenToMetamask(
				{
					tokenAddress: projectState.projectTokenContract,
					tokenSymbol: selectedProject.projectTokenSymbol,
					tokenDecimals: projectState.decimal,
					tokenImage: ''
				},
				res => {
					if (res.status === 'ADD_TOKEN_SUCCESS') {
						toast.success('Successfully added token to MetaMask');
					}
					if (res.status === 'ADD_TOKEN_FAILS') {
						toast.error('Failed to add token to MetaMask');
					}
				}
			);
		} else {
			toast.error('Token incorrect!');
		}
	};

	var settings = {
		dots: true,
		infinite: false,
		center: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	};

	return (
		<>
			{selectedProject ? (
				<div>
					<div class="mf-detail-banner">
						<img src="images/detail-banner.png" class="w-100" alt="" />
					</div>

					<div>
						<Container>
							<div class="mf-detail-header">
								<h1 class="mf-title">{selectedProject.name}</h1>
								<div class="socials">
									<a href="#" target="_blank">
										<img src="images/telegram.svg" alt="telegram" />
									</a>
									<a href="#" target="_blank">
										<img src="images/x.svg" alt="telegram" />
									</a>
									<a href="#" target="_blank">
										<img src="images/globe.svg" alt="telegram" />
									</a>

									{/* {selectedProject.pancakeswap && (
											<a
												href={selectedProject.pancakeswap}
												target="_blank"
												rel="noopener noreferrer"
											>
												<img
													height="20"
													src="/images/pancake-swap.png"
													alt=""
												/>
											</a>
										)}
										{selectedProject.website && (
											<a
												href={selectedProject.website}
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fas fa-globe-americas"></i>
											</a>
										)}
										{selectedProject.twitter && (
											<a
												href={selectedProject.twitter}
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-twitter"></i>
											</a>
										)}
										{selectedProject.medium && (
											<a
												href={selectedProject.medium}
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-medium-m"></i>
											</a>
										)}
										{selectedProject.telegram && (
											<a
												href={selectedProject.telegram}
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-telegram-plane"></i>
											</a>
										)} */}
								</div>
							</div>

							<div class="mf-detail-tags">
								{selectedProject.tags?.map(data => (
									<span className="active">{data}</span>
								))}
							</div>

							<div class="mf-detail-description">
								{selectedProject.description}
							</div>

							<div class="mf-detail-summary">
								<div class="row gx-xl-5">
									<div class="col-lg-4 mb-lg-0 mb-5">
										<Slider {...settings} className="slider">
											{selectedProject.images?.map(data => (
												<div class="image">
													<img
														class="w-100"
														onClick={() => {
															setSelectedImage(
																`https://blastfi.net/assets/${data.directus_files_id}`
															);
														}}
														src={`https://blastfi.net/assets/${data.directus_files_id}`}
														alt={selectedProject.name}
														key={data.directus_files_id}
													/>
												</div>
											))}
											<img
												src={`https://blastfi.net/assets/${selectedProject.logo}`}
												alt={selectedProject.name}
											/>

											{selectedImage && (
												<Lightbox
													small={selectedImage}
													large={selectedImage}
													alt={selectedProject.name}
													onClose={() => {
														setSelectedImage(null);
													}}
												/>
											)}
										</Slider>
									</div>
									<div class="col-lg-8">
										<div class="info">
											<div class="row gx-lg-5">
												<div class="col-xl-4 mb-xl-0 mb-4">
													<div class="token">
														<div class="icon">
															<img src="images/usdb-token.png" alt="" />
														</div>
														<span>USDB</span>
													</div>

													<div class="row">
														<div class="col-xl-12 col-md-6">
															<div class="value-group">
																<div class="label">Your balance</div>
																{account ? (
																	<>
																		<div class="value">
																			{helpers.formatNumberDownRound(
																				tokenBalance,
																				4
																			)}{' '}
																			{selectedProject.symbol}
																		</div>
																		{selectedProject.symbol !==
																			NATIVE_COIN_SYMBOL && (
																			<div class="value">
																				{helpers.formatNumberDownRound(
																					ethBalance,
																					4
																				) || 0}{' '}
																				{NATIVE_COIN_SYMBOL}
																			</div>
																		)}
																	</>
																) : (
																	<></>
																)}

																{/* {selectedProject.state !== 'P' && (
																	<>
																		<div className="pp-card-col mb-3 mb-md-0">
																			Your approved amount:
																			<br />
																			<b className="text-white text-white">
																				{helpers.formatNumberDownRound(
																					allocationNumber,
																					4
																				)}{' '}
																				{selectedProject.symbol}
																			</b>
																		</div>

																		<div className="pp-card-col w-100 mt-3">
																			{tier && (
																				<div>
																					Your tier
																					<br />
																					<b className="text-white text-white">
																						{tier}
																					</b>
																				</div>
																			)}
																		</div>


																		{!account ? (
													<div className="my-4">
														<BFConnectWallet buttonSize="lg w-100" />
													</div>
												) : (
													<></>
												)}
																	</>
																)} */}
															</div>
														</div>
														<div class="col-xl-12 col-md-6">
															<div class="value-group">
																<div class="label">Your approved</div>
																<div class="value">
																	{helpers.formatNumberDownRound(
																		allocationNumber,
																		4
																	)}{' '}
																	{selectedProject.symbol}
																</div>
															</div>
														</div>
													</div>
												</div>

												<div class="col-xl-8">
													<div class="token">
														<div class="icon red">
															<img src="images/native-token.png" alt="" />
														</div>
														<span>Native token</span>
													</div>

													{account && (
														<div class="value-group">
															<div class="row">
																<div class="col-md-6">
																	<div class="label">Swapped</div>
																	<div class="value">
																		{helpers.formatNumberDownRound(
																			userParticipation,
																			4
																		)}{' '}
																		{selectedProject.symbol}
																	</div>
																	{selectedProject.symbol !==
																		NATIVE_COIN_SYMBOL && (
																		<div class="value">
																			{helpers.formatNumberDownRound(
																				ethBalance,
																				4
																			) || 0}{' '}
																			{NATIVE_COIN_SYMBOL}
																		</div>
																	)}
																</div>
																<div class="col-md-6">
																	<div class="label">Remaining Allocation</div>

																	<div className="value">
																		{helpers.formatNumberDownRound(
																			remainingAllocation,
																			4
																		)}{' '}
																		{selectedProject.symbol}
																	</div>
																</div>
															</div>
														</div>
													)}

													<div class="value-group">
														{selectedProject.state !== 'O' ? (
															<>
																<div class="label">Swap progress</div>
																<div
																	class="progress"
																	role="progressbar"
																	aria-label="Basic example"
																	aria-valuenow="60"
																	aria-valuemin="0"
																	aria-valuemax="100"
																>
																	<div
																		class="progress-bar"
																		style={{
																			width: `${(
																				(selectedProject.totalFundParticipated /
																					selectedProject.maxTotalParticipationAllocated ||
																					0) * 100
																			).toFixed(2)}%`
																		}}
																	></div>
																</div>
																<div class="value d-flex align-items-center justify-content-between">
																	<span>
																		{(
																			(selectedProject.totalFundParticipated /
																				selectedProject.maxTotalParticipationAllocated ||
																				0) * 100
																		).toFixed(2)}
																		%
																	</span>
																	<span>
																		{selectedProject.totalFundParticipated.toFixed(
																			4
																		)}
																		/
																		{
																			selectedProject.maxTotalParticipationAllocated
																		}{' '}
																		{selectedProject.symbol}
																	</span>
																</div>
															</>
														) : (
															<>
																<div className="pp-card-col w-100 ai-project-progress-wrap light-progress disabled">
																	<div className="ai-project-progress text-center">
																		<div className="ai-project-progress-percent ai-project-progress-percent-card"></div>
																	</div>
																	<div className="ai-project-progress-label">
																		<span className="participants-center">
																			Allocation round
																		</span>
																		<span
																			className="participants-center"
																			style={{ top: '8px' }}
																		>
																			{
																				selectedProject.totalCountUserParticipated
																			}{' '}
																			Participants
																		</span>
																	</div>
																</div>
															</>
														)}
													</div>
												</div>
											</div>

											<div class="value-group pt-4">
												{account && selectedProject.state !== 'P' ? (
													<>
														<BFApproveModal
															disabled={!enableApprove}
															remainingAllocation={remainingAllocation}
															walletInfo={walletInfo}
															handleBuyClick={() => setCountBuy(countBuy + 1)}
															handleInputAmount={n => setAmountPurchased(n)}
															tokenBalance={helpers.formatNumberDownRound(
																tokenBalance,
																4
															)}
														/>
														<BFInvestmentModal
															disabled={
																!enableJoinProject || allocationNumber == 0
															}
															walletInfo={walletInfo}
															allocationNumber={allocationNumber}
															remainingAllocation={remainingAllocation}
															handleBuyClick={() => setCountBuy(countBuy + 1)}
															countClick={countBuy}
															tokenBalance={helpers.formatNumberDownRound(
																tokenBalance,
																4
															)}
															symbol={selectedProject?.symbol}
															handleInputAmount={n => setAmountPurchased(n)}
														/>
													</>
												) : (
													<></>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* {(selectedProject.state === 'O' ||
															selectedProject.state === 'F') && (
															<>
																<span className="pp-status-open text-warning">
																	<i className="mdi mdi-circle text-warning"></i>{' '}
																	{'Open'}
																</span>
															</>
														)}
														{selectedProject.state === 'C' && (
															<>
																<span className="pp-status-closed text-danger">
																	<i className="mdi mdi-circle text-danger"></i>{' '}
																	{'Closed'}
																</span>
															</>
														)}
														{selectedProject.state === 'P' && (
															<>
																{selectedProject.openTime !== undefined ? (
																	<span className="pp-status-opening text-warning">
																		<i className="mdi mdi-circle  text-warning"></i>{' '}
																		{'Opens in'}{' '}
																		<b
																			id={`idOpenTime-${selectedProject['contract']}`}
																		>
																			0d 0h 0m 0s
																		</b>
																	</span>
																) : (
																	<span className="pp-status-opening text-warning">
																		<i className="mdi mdi-circle  text-warning"></i>
																		{'TBA'}
																	</span>
																)}
															</>
														)} */}

							{/* If not connect show open time  else show round time.(if state = 4 ==> show closes)*/}
							{/* <Col md="7">
								<div className="position-relative">
									{selectedProject.state !== 'P' && (
										<div>
											{selectedProject.state === 'O' && (
												<div className="pp-card-info">
													{account ? (
														roundState !== 4 ? (
															<div className="pp-card-col w-100">
																{textRoundState && (
																	<div>
																		<span id="idTextRoundState">
																			{' '}
																			{textRoundState}
																		</span>
																		<br />
																	</div>
																)}
																<b
																	id={`idRoundTime-${selectedProject['contract']}`}
																	className="text-white"
																>
																	{' '}
																	0d 0h 0m 0s
																</b>
															</div>
														) : (
															<div className="items-morex">ROUND CLOSED</div>
														)
													) : (
														<div className="pp-card-col w-100">
															First Come First Serve <u>opens</u> in:
															<br />
															<b
																id={`idFcfsOpenTime-${selectedProject['contract']}`}
																className="text-white"
															>
																{' '}
																0d 0h 0m 0s
															</b>
														</div>
													)}
												</div>
											)}

											{selectedProject.state === 'F' && (
												<div className="pp-card-info">
													{account ? (
														roundState !== 4 ? (
															<div className="pp-card-col w-100">
																<span id="idTextRoundState">
																	{' '}
																	{textRoundState}
																</span>
																<br />
																<b
																	id={`idRoundTime-${selectedProject['contract']}`}
																	className="text-white"
																>
																	{' '}
																	0d 0h 0m 0s
																</b>
															</div>
														) : (
															<div className="items-morex">ROUND CLOSED</div>
														)
													) : (
														<div className="pp-card-col w-100">
															Closing in:
															<br />
															<b
																id={`idTimeClose-${selectedProject['contract']}`}
																className="text-white"
															>
																{' '}
																0d 0h 0m 0s
															</b>
														</div>
													)}
												</div>
											)}

											{selectedProject.state === 'C' && (
												<div className="pp-card-info text-white">
													<div className="items-morex">CLOSED</div>
												</div>
											)}
										</div>
									)}
								</div>
							</Col> */}

							<MFSection
								activeLink={activeTab}
								selectedProject={selectedProject}
								showAddToken={allocationInfo.length >= 0}
								onAddToken={handleAddTokenToMetamask}
							/>
							{/* {activeTab === 0 ? (
									<>
										{yourAllocationVisible && (
											<BFYourAllocation
												allocationInfo={allocationInfo}
												tokenSymbol={selectedProject.projectTokenSymbol}
												decimals={projectState.decimal}
												contractAddress={contractAddress}
												tokenAddress={projectState.projectTokenContract}
												handleBuyClick={() => setCountBuy(countBuy + 1)}
												claim={selectedProject.claim}
												layout={layoutAllocation}
											/>
										)}
									</>
								) : activeTab === 3 ? (
									<BFDescriptionTab data={selectedProject} />
								) : activeTab === 2 ? (
									<Row className="gx-xl-5">
										<Col lg="6">
											<BFPoolInformation selectedProject={selectedProject} />
										</Col>
										<Col lg="6">
											<BFTokenInformation
												selectedProject={selectedProject}
												showAddToken={allocationInfo.length >= 0}
												onAddToken={handleAddTokenToMetamask}
											/>
											<BFScheduleInformation roundInfo={roundInfo} />
										</Col>
									</Row>
								) : (
									<BFTokenmetricsTab data={selectedProject} />
								)} */}
						</Container>
					</div>
				</div>
			) : (
				<div className="p-4 text-center">Loading...</div>
			)}
		</>
	);
};

export default ProjectDetailPage;
