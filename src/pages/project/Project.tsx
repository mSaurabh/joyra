import { useParams } from "react-router-dom";
//styles
import { FCOLL } from "../../firebase/firebase.props";
import { useDocument } from "../../hooks/useDocument";
import { IProject } from "../../interfaces/DataInterfaces";
import "./Project.css";
import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";

interface IProjectProps {}

export const Project = (props: IProjectProps) => {
  const { id } = useParams();
  const {
    error,
    document: project,
  }: { error: string; document: IProject | undefined } = useDocument(
    FCOLL.PROJECTS,
    id!
  );

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!project) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="project-details">
        <ProjectSummary project={project} />
        <ProjectComments project={project} />
      </div>
    );
  }
};
