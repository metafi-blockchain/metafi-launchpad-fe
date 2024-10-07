import React from "react";
import { Col, Row } from "react-bootstrap";
import { useComingSoonProjects, useOpeningProjects } from "../../../hook/useState";
import MFSection from "../../../shared/components/section";
import BFProjectComingCard from "./project-coming-card/index";

const WaitingProjectsComponent = () => {
  const waitingProjects = useComingSoonProjects()
  const openingProjects = useOpeningProjects();

  return (
    <MFSection title="PROJECTS COMING SOON" className={openingProjects?.length ? 'active' : 'highlight'
    }>
      {
        waitingProjects.length > 0 ?
          <Row>
            <Col md="6">
              <BFProjectComingCard item={
                {
                  id: waitingProjects[0]?.id,
                  website: waitingProjects[0]?.website,
                  logo: waitingProjects[0]?.logo,
                  icon: waitingProjects[0]?.icon,
                  name: waitingProjects[0]?.name,
                  time: waitingProjects[0]?.time,
                  description: waitingProjects[0]?.description,
                  twitter: waitingProjects[0]?.twitter,
                  medium: waitingProjects[0]?.medium,
                  placeholder: true
                }
              }
                size="lg" />
            </Col>
            <Col md="6">
              <BFProjectComingCard item={waitingProjects[0]} />
              <BFProjectComingCard item={waitingProjects[1]} />
              <BFProjectComingCard item={waitingProjects[2]} />
            </Col>
          </Row> : <div className="bf-nodata">No projects currently coming soon</div>
      }
    </MFSection >
  );
};

export default WaitingProjectsComponent;
