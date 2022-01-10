import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// components
import { timestamp } from "../../firebase/config";
import { FCOLL } from "../../firebase/firebase.props";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import {
  categories,
  ICategory,
  IProject,
  IUser,
} from "../../interfaces/DataInterfaces";
// styles
import "./Create.css";

interface ICreateProps {}

const Create = (props: ICreateProps) => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<ICategory>();
  const [assignedUsers, setAssignedUsers] = useState<any>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { error, documents }: { error: string; documents: IUser[] } =
    useCollection(FCOLL.USERS);
  const { addDocument, response } = useFirestore(FCOLL.PROJECTS);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!category) {
      setFormError("Please select a project category.");
      return;
    } else if (assignedUsers.length === 0) {
      setFormError("Please assign a user(s) to the project.");
      return;
    }

    // console.log(assignedUsers);
    const assignedUsersList = assignedUsers.map((user: any) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const createdBy = {
      displayName: user!.displayName,
      photoURL: user!.photoURL,
      id: user!.uid,
    };
    const project: IProject = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      assignedUsersList: assignedUsersList,
      createdBy: createdBy,
      comments: [],
    };

    await addDocument(project);
  };

  useEffect(() => {
    if (response.success) {
      navigate("/");
    } else {
      setFormError(response.error);
    }
  }, [response]);

  useEffect(() => {
    if (documents) {
      const options = documents.map((d) => {
        return { value: d, label: d.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <label>
          <span>Set Due Date:</span>
          <input
            required
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option!)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        {formError && <p className="error">{formError}</p>}
        <button className="btn">Add Project</button>
      </form>
    </div>
  );
};

export default Create;
