import { Link } from "react-router-dom";
// interfaces & components
import { IProject } from "../interfaces/DataInterfaces";
import Avatar from "./Avatar";
// styles
import "./ProjectList.css";

interface IProjectListProps {
  projects: IProject[];
}

const ProjectList = (props: IProjectListProps) => {
  const { projects } = props;

  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        // @ts-ignore
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((au) => (
                <li key={au.photoURL + "-" + au.id}>
                  <Avatar src={au.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
