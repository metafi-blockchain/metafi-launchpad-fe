import React from 'react';
import './index.scss';
import BFDescriptionTab from '../../../pages/project-detail/components/description-tab';
import BFPoolInformation from '../../../pages/project-detail/components/pool-information';
import BFTokenInformation from '../../../pages/project-detail/components/token-information';
import BFScheduleInformation from '../../../pages/project-detail/components/schedule-information';

const MFSection = ({
	selectedProject,
	onAddToken,
	showAddToken
}) => {
	return (
		<div class="mf-detail-tabs">
			<ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
				<li class="nav-item" role="presentation">
					<button
						class="nav-link active"
						id="description-tab"
						data-bs-toggle="tab"
						data-bs-target="#description-tab-pane"
						type="button"
						role="tab"
						aria-controls="description-tab-pane"
						aria-selected="true"
					>
						description
					</button>
				</li>
				<li class="nav-item" role="presentation">
					<button
						class="nav-link"
						id="pool-info-tab"
						data-bs-toggle="tab"
						data-bs-target="#pool-info-tab-pane"
						type="button"
						role="tab"
						aria-controls="pool-info-tab-pane"
						aria-selected="false"
					>
						pool info
					</button>
				</li>
				<li class="nav-item" role="presentation">
					<button
						class="nav-link"
						id="tokenmetrics-tab"
						data-bs-toggle="tab"
						data-bs-target="#tokenmetrics-tab-pane"
						type="button"
						role="tab"
						aria-controls="tokenmetrics-tab-pane"
						aria-selected="false"
					>
						tokenmetrics
					</button>
				</li>
				<li class="nav-item" role="presentation">
					<button
						class="nav-link"
						id="your-allocation-tab"
						data-bs-toggle="tab"
						data-bs-target="#your-allocation-tab-pane"
						type="button"
						role="tab"
						aria-controls="your-allocation-tab-pane"
						aria-selected="false"
					>
						your allocation
					</button>
				</li>
			</ul>
			<div class="tab-content" id="myTabContent">
				<BFDescriptionTab data={selectedProject}/>
				<div
					class="tab-pane fade"
					id="pool-info-tab-pane"
					role="tabpanel"
					aria-labelledby="pool-info-tab"
					tabIndex="0"
				>
					<div class="row gx-xl-5">
						<div class="col-xl-6 col-lg-5">
							<BFPoolInformation selectedProject={selectedProject} />
						</div>
						<div class="col-xl-6 col-lg-7 ps-xxl-4 ps-xl-0 ps-lg-4">
							<BFTokenInformation onAddToken={onAddToken} selectedProject={selectedProject} showAddToken={showAddToken}/>
							<BFScheduleInformation />
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="tokenmetrics-tab-pane"
					role="tabpanel"
					aria-labelledby="tokenmetrics-tab"
					tabIndex="0"
				>
					<div class="tokenmetrics">
						<img src="images/token-bg.png" class="w-100" alt="" />
						<div class="tokenmetrics-inner">
							<div class="row gx-lg-4 h-100 align-items-lg-center">
								<div class="col-lg-3 col-md-7 order-lg-1 order-2">
									<div class="legends">
										<div class="legend legend-1">
											<span>Seed</span>
											<b>7.5%</b>
										</div>
										<div class="legend legend-2">
											<span>Partners & Advisors</span>
											<b>9.5%</b>
										</div>
										<div class="legend legend-3">
											<span>Team & Development</span>
											<b>10%</b>
										</div>
										<div class="legend legend-4">
											<span>Community & Ecosystem Growth</span>
											<b>22%</b>
										</div>
									</div>
								</div>
								<div class="col-lg-6 mb-4 mb-lg-0 order-lg-2 order-1 text-center">
									<div class="token-img">
										<img src="images/token.png" alt="" />
									</div>
								</div>
								<div class="col-lg-3 col-md-5 order-3">
									<div class="legends">
										<div class="legend legend-5">
											<span>Liquidity</span>
											<b>15%</b>
										</div>
										<div class="legend legend-6">
											<span>Reserve</span>
											<b>1.8%</b>
										</div>
										<div class="legend legend-7">
											<span>Staking Rewards</span>
											<b>25%</b>
										</div>
										<div class="legend legend-8">
											<span>Public Round</span>
											<b>3.5%</b>
										</div>
										<div class="legend legend-9">
											<span>Private Round</span>
											<b>5%</b>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="your-allocation-tab-pane"
					role="tabpanel"
					aria-labelledby="your-allocation-tab"
					tabIndex="0"
				>
					<div class="allocation">
						<div class="allocation-inner">
							<div class="allocation-head">
								<div>NO.</div>
								<div>ALLOCATION</div>
								<div>PERCENTAGE</div>
								<div>DATE</div>
								<div>CLAIMED</div>
								<div>ACTION</div>
							</div>
							<div class="allocation-body">
								<div class="allocation-item">
									<div>1</div>
									<div>
										<span>ALLOCATION</span>0.0000
									</div>
									<div>
										<span>PERCENTAGE</span>100.00%
									</div>
									<div>
										<span>DATE</span>DXE LISTING
									</div>
									<div>
										<span>CLAIMED</span>0.000
									</div>
									<div>
										<button type="button" class="mf-btn btn">
											<span>CLAIM TOKENS</span>
										</button>
									</div>
								</div>
								<div class="allocation-item">
									<div>2</div>
									<div>
										<span>ALLOCATION</span>0.0000
									</div>
									<div>
										<span>PERCENTAGE</span>100.00%
									</div>
									<div>
										<span>DATE</span>DXE LISTING
									</div>
									<div>
										<span>CLAIMED</span>0.000
									</div>
									<div>
										<button type="button" class="mf-btn btn">
											<span>CLAIM TOKENS</span>
										</button>
									</div>
								</div>
								<div class="allocation-item">
									<div>3</div>
									<div>
										<span>ALLOCATION</span>0.0000
									</div>
									<div>
										<span>PERCENTAGE</span>100.00%
									</div>
									<div>
										<span>DATE</span>DXE LISTING
									</div>
									<div>
										<span>CLAIMED</span>0.000
									</div>
									<div>
										<button type="button" class="mf-btn btn">
											<span>CLAIM TOKENS</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<section className="mf-completed-launchpads">
	// 		<div className="container">
	// 			<h2 className="mf-title">{title || ''}</h2>
	// 			<div className="mf-launchpads">
	// 				<>{children}</>
	// 			</div>
	// 		</div>
	// 	</section>
	// );
};
export default MFSection;
