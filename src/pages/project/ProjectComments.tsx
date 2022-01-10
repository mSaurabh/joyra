import { formatDistanceToNow } from "date-fns";
import { FormEvent, useState } from "react";
// interfaces & components
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { FCOLL } from "../../firebase/firebase.props";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { IProject } from "../../interfaces/DataInterfaces";

interface IProjectCommentsProps {
  project: IProject;
}

const ProjectComments = (props: IProjectCommentsProps) => {
  const { project } = props;
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore(FCOLL.PROJECTS);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const commentToAdd = {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.ceil(Math.random() * 10000),
    };
    // @ts-ignore
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>{formatDistanceToNow(comment.createdAt.toDate())}</p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
