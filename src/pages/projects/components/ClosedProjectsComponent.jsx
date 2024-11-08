import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useCloseProjects } from '../../../hook/useState';
import BFProjectClosedCard from './project-closed-card';

const ClosedProjectsComponent = () => {
	const closedProjects = useCloseProjects();

	return (
		<div class="container mb-4">
			<h2 class="mf-title">Closed Launchpads</h2>
			{closedProjects.length > 0 ? (
				<Row className="gx-md-5">
					{closedProjects.map((item, key) => {
						return (
							<Col xl="4" md="6" key={key}>
								<BFProjectClosedCard item={item} />
							</Col>
						);
					})}
				</Row>
			) : (
				<div className="mf-nodata">No projects currently closed</div>
			)}
		</div>
	);
};

export default ClosedProjectsComponent;
