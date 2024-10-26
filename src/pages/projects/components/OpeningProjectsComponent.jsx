import React from 'react';
import { useOpeningProjects } from '../../../hook/useState';
import BFProjectOpenCard from './project-open-card';

const OpeningProjectsComponent = () => {
	const openingProjects = useOpeningProjects();

	return (
		<div class="container">
			<h2 class="mf-title">Opening Launchpads</h2>
			{openingProjects.length > 0 ? (
				<BFProjectOpenCard item={openingProjects[0]} />
			) : (
				<div className="mf-nodata">No projects currently open</div>
			)}
		</div>
	);
};

export default OpeningProjectsComponent;
