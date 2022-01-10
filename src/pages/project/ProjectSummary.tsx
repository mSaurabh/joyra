import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// interfaces and components
import Avatar from "../../components/Avatar";
import { FCOLL } from "../../firebase/firebase.props";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { IProject } from "../../interfaces/DataInterfaces";

interface IProjectSummaryProps {
  project: IProject;
}

const ProjectSummary = (props: IProjectSummaryProps) => {
  const { project } = props;
  const { user } = useAuthContext();
  const { deleteDocument, response } = useFirestore(FCOLL.PROJECTS);
  const navigate = useNavigate();

  const handleClick = async (e: FormEvent) => {
    //@ts-ignore
    await deleteDocument(project.id);
    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p>By {project.createdBy.displayName}</p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
              <p>{user.displayName}</p>
            </div>
          ))}
        </div>
        {project.createdBy.id === user?.uid && (
          <button className="btn" onClick={handleClick}>
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectSummary;
