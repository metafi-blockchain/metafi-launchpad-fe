import React from 'react';
import { Col } from 'react-bootstrap';
import { useComingSoonProjects } from '../../../hook/useState';
import BFProjectClosedCard from './project-closed-card';

const WaitingProjectsComponent = () => {
	const waitingProjects = useComingSoonProjects();

	return (
		<div class="container mb-4">
			<h2 class="mf-title">Incomming Launchpads</h2>
			{waitingProjects.length > 0 ? (
				waitingProjects.map((item, key) => {
					return (
						<Col xl="4" md="6" key={key}>
							<BFProjectClosedCard item={item} type="upcoming" />
						</Col>
					);
				})
			) : (
				<div className="mf-nodata">No projects currently coming soon</div>
			)}
		</div>
	);
};

export default WaitingProjectsComponent;
