import moment from 'moment';
import React from 'react';
import './index.scss';

const BFPoolInformation = ({ selectedProject }) => {
	return (
		<div class="pool-information pool">
			<img src="images/pool-info-bg.png" alt="" class="w-100 h-100" />
			<div class="pool-information-inner">
				<span>POOL INFORMATION</span>
				<ul>
					<li>
						<span>Opens</span>

						<b>
							{' '}
							{selectedProject.openTime === undefined ? (
								<td className="text-end">TBA</td>
							) : (
								<td className="text-end">
									{moment(selectedProject.openTime * 1000 || 0)
										.utc()
										.format('MM-DD HH:mm')}{' '}
									UTC
								</td>
							)}
						</b>
					</li>
					<li>
						<span>FCFS Opens</span>
						<b>
							{' '}
							{selectedProject.fcfsOpenTime === undefined ? (
								<td className="text-end">TBA</td>
							) : (
								<td className="text-end">
									{moment(selectedProject.fcfsOpenTime * 1000 || 0)
										.utc()
										.format('MM-DD HH:mm')}{' '}
									UTC
								</td>
							)}
						</b>
					</li>
					<li>
						<span>Closes</span>
						<b>
							{' '}
							{selectedProject.closeTime === undefined ? (
								<td className="text-end">TBA</td>
							) : (
								<td className="text-end">
									{moment(selectedProject.closeTime * 1000 || 0)
										.utc()
										.format('MM-DD HH:mm')}{' '}
									UTC
								</td>
							)}
						</b>
					</li>
					<li>
						<span>Swap Rate</span>
						<b>
							{' '}
							{selectedProject.openTime !== undefined ? (
								<td className="text-end">
									<span id="idBusdConvert">
										<span>1 {selectedProject.symbol}</span>
										<span>
											{' '}
											= {selectedProject['rate'].toFixed(4)}{' '}
											{selectedProject.projectTokenSymbol}
										</span>
									</span>
								</td>
							) : (
								<td className="text-end">
									<span id="idBusdConvert">TBA</span>
								</td>
							)}
						</b>
					</li>
					<li>
						<span>Cap</span>
						<b>
							{' '}
							{selectedProject.openTime !== undefined ? (
								<td className="text-end">
									{selectedProject.maxTotalParticipationAllocated}{' '}
									{selectedProject.symbol}
								</td>
							) : (
								<td className="text-end">TBA</td>
							)}
						</b>
					</li>
					<li>
						<span>Total Users Participated</span>
						<b>{selectedProject.totalCountUserParticipated || 0}</b>
					</li>
					<li>
						<span>Total Funds Swapped</span>
						<b>
							{' '}
							{selectedProject.openTime !== undefined ? (
								<td className="text-end">
									{selectedProject.totalFundParticipated.toFixed(4) || 0}{' '}
									{selectedProject.symbol || ''}
								</td>
							) : (
								<td className="text-end">0</td>
							)}
						</b>
					</li>
					<li>
						<span>Access Type</span>
						<b>{selectedProject.isPrivate ? "PRIVATE" : "PUBLIC"}</b>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default BFPoolInformation;
