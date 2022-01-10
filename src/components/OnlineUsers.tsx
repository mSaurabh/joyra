import { FCOLL } from "../firebase/firebase.props";
import { useCollection } from "../hooks/useCollection";
import { IUser } from "../interfaces/DataInterfaces";
import Avatar from "./Avatar";
import "./OnlineUsers.css";

interface IOnlineUsersProps {}

const OnlineUsers = (props: IOnlineUsersProps) => {
  const { error, documents }: { error: string; documents: IUser[] } =
    useCollection(FCOLL.USERS);
  // console.log(documents);
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
