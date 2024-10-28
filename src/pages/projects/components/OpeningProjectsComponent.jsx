import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useOpeningProjects } from '../../../hook/useState';
import BFProjectClosedCard from './project-closed-card';

const OpeningProjectsComponent = () => {
	const openingProjects = useOpeningProjects();

	return (
		<div class="container mb-4">
			<h2 class="mf-title">Opening Launchpads</h2>
			{openingProjects.length > 0 ? (
				<Row className="gx-md-5">
					{openingProjects.map((item, key) => {
						return (
							<Col xl="4" md="6" key={key}>
								<BFProjectClosedCard item={item} />
							</Col>
						);
					})}
				</Row>
			) : (
				<div className="mf-nodata">No projects currently open</div>
			)}
		</div>
	);
};

export default OpeningProjectsComponent;
