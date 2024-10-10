import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { ROUTES } from '../../../../constants';

const BFProjectClosedCard = ({ item }) => {
	return (
		<div className="mf-launchpad-card closed">
			<div className="mf-launchpad-card-header">
				<div className="meta">
					<span>USDT</span>
					<span>Closed</span>
				</div>
				<div className="image">
					<img src="images/solana.png" alt="" />
				</div>
				<h3 className="name">{item.name}</h3>
				<div className="description">{item.description}</div>
			</div>

			<div className="mf-launchpad-card-body">
				<div className="socials">
					<span>Available on</span>
					<span>
                        {item.telegram && <a href={item.telegram} target="_blank">
							<img src="images/telegram.svg" alt="telegram" />
						</a>}
						
                        {item.twitter && <a href={item.twitter} target="_blank">
							<img src="images/x.svg" alt="telegram" />
						</a>}
						
                        {item.twitter && <a href={item.globe} target="_blank">
							<img src="images/globe.svg" alt="telegram" />
						</a>}
						
					</span>
				</div>
				<div className="stats">
					<div className="row">
						<div className="col-6">
							<span>Swap rate</span>
							<b>
								{' '}
								1 {item.symbol} = {item['rate']} {item['projectTokenSymbol']}
							</b>
						</div>
						<div className="col-6">
							<span>Cap</span>
							<b>{`${item.maxTotalParticipationAllocated || 0} ${
								item.symbol || ''
							}`}</b>
						</div>
						<div className="col-6">
							<span>Total Supply </span>
							<b>1,000,000</b>
						</div>
						<div className="col-6">
							<span>Access </span>
							<b>{item.isPrivate ? 'Private' : 'Public'}</b>
						</div>
						<div className="col-12">
							<span>Progress</span>
							<div
								className="progress"
								role="progressbar"
								aria-valuenow="98"
								aria-valuemin="0"
								aria-valuemax="100"
							>
								<div
									className="progress-bar"
									style={{
										width: `${
											(item.totalFundParticipated /
												item.maxTotalParticipationAllocated || 0) * 100
										}%`
									}}
								></div>
							</div>
							<div className="labels">
								<span>Allocation round</span>
								<span>2 participants</span>
							</div>
						</div>
					</div>
				</div>
				<div className="action">
					<Link to={`${ROUTES.PROJECTS}/${item.id}`} className="mf-btn btn">
						<span>View details</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default BFProjectClosedCard;
