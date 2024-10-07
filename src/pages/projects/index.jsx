import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLatestBlockNumber } from "../../hook/useState";
import { actGetListProjects } from "../../redux/action/user";
import ClosedProjectsComponent from "./components/ClosedProjectsComponent";
import OpeningProjectsComponent from "./components/OpeningProjectsComponent";
import WaitingProjectsComponent from "./components/WaitingProjectsComponent";
import BFProjectsBanner from "./components/banner";
import './index.scss';

const ProjectsPage = () => {
    const dispatch = useDispatch();
    const latestBlock = useLatestBlockNumber();

    useEffect(() => {
        dispatch(actGetListProjects())
    }, [latestBlock, dispatch])

    return <div className="ai-projects">
        <BFProjectsBanner />
        <div className="ai-projects-list" id="BFProjects">
            <OpeningProjectsComponent />
            <WaitingProjectsComponent />
            <ClosedProjectsComponent />
        </div>
    </div>
}
export default ProjectsPage;