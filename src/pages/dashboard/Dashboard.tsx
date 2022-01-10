import { useState } from "react";
import ProjectList from "../../components/ProjectList";
import { FCOLL } from "../../firebase/firebase.props";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { IProject } from "../../interfaces/DataInterfaces";
import "./Dashboard.css";
import ProjectFilter from "./ProjectFilter";

interface IDashboardProps {}

const Dashboard = (props: IDashboardProps) => {
  const { error, documents }: { error: string; documents: IProject[] } =
    useCollection(FCOLL.PROJECTS, ["isDeleted", "==", false]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
    // console.log(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((au) => {
              if (au.id === user?.uid) assignedToMe = true;
            });
            return assignedToMe;
          default:
            return document.category === currentFilter;
        }
      })
    : [];

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
