import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";
import TaskCard from "../../components/ProjectManager/TaskCard";
import { Link } from "react-router-dom";

import { BsClipboard2PlusFill } from "react-icons/bs";
import AddButton from "../../components/ProjectManager/AddButton";
import TaskCardforProject from "../../components/ProjectManager/TaskCard copy";

function Tasks() {
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM />
        <div className="ml-3.5 mt-10">
          <div></div>
          <div className="flex justify-between m-0">
            <PageTitle title="Tasks" />
            <AddButton />
          </div>

          <TaskCard />
        </div>
      </section>
    </>
  );
}

export default Tasks;
