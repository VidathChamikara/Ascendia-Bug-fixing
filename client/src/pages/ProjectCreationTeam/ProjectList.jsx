import React from "react";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import ProjectCard from "../../components/project/ProjectCard";
import { Link } from "react-router-dom";

import { BsClipboard2PlusFill } from "react-icons/bs";
import AddProjectButton from "../../components/ProjectCreationTeam/AddProjectButton";
import TaskCardforProject from "../../components/ProjectManager/TaskCard copy";

function ProjectsList() {
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPCTeam />
        <div className="ml-3.5 mt-10">
          <div></div>
          <div className="flex justify-between m-0">
            <PageTitle title="Projects" />
            <AddProjectButton />
          </div>

          <ProjectCard />
        </div>
      </section>
    </>
  );
}

export default ProjectsList;