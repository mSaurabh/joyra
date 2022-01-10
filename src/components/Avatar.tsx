import "./Avatar.css";

interface IAvatarProps {
  src: string | null | undefined;
}

const Avatar = (props: IAvatarProps) => {
  const { src } = props;

  return (
    <div className="avatar">
      <img src={src ? src : ""} alt={"user avatar"} />
    </div>
  );
};

export default Avatar;
