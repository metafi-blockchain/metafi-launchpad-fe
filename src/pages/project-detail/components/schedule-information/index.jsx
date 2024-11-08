import React from 'react';
import './index.scss';
import moment from 'moment';
import { useInfoRound } from '../../../../hook/useState';

const BFScheduleInformation = () => {
    const roundInfo = useInfoRound();
	return (
		<div className="pool-information schedule">
			<img src="images/schedule-bg.png" alt="" className="w-100" />
			<div className="pool-information-inner">
				<span className="mb-3">Schedule</span>
				<ul>
					<li>
						<span>Round</span>
						<b>OPENS</b>
						<b>CLOSES</b>
					</li>

					{roundInfo.length > 0 &&
						roundInfo.map((item, key) => (
							<li key={key}>
								<span>{item.round}</span>
								<b>
									{moment(item.opens * 1000 || 0)
										.utc()
										.format('MM-DD HH:mm')}{' '}
									UTC
								</b>
								<b>
									{moment(item.closes * 1000 || 0)
										.utc()
										.format('MM-DD HH:mm')}{' '}
									UTC
								</b>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default BFScheduleInformation;
