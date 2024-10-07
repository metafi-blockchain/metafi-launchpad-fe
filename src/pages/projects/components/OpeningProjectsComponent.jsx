import React from "react";
import { useOpeningProjects } from "../../../hook/useState";
import MFSection from "../../../shared/components/section";
import BFProjectOpenCard from "./project-open-card";

const OpeningProjectsComponent = () => {
  const openingProjects = useOpeningProjects();

  return (
    <MFSection title="PROJECTS OPEN NOW" className={openingProjects?.length ? 'highlight' : ''}>
      {openingProjects.length > 0 ?
        <BFProjectOpenCard item={openingProjects[0]} />
        : <div className="mf-nodata">No projects currently open</div>}
    </MFSection>
  )
};

export default OpeningProjectsComponent;
