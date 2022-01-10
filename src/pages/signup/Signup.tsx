import { ChangeEvent, FormEvent, useState } from "react";
import useSignup from "../../hooks/useSignup";
import "./Signup.css";

interface ISignupProps {}

export const Signup = (props: ISignupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailError, setThumbnailError] = useState("");
  const { signup, isPending, error } = useSignup();
  const [randomImages, setRandomImages] = useState<string[]>([]);
  // const { getImages } = useCloudinary();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail!, "captcha");
  };

  // useEffect(() => {
  //   getImages().then((results) => {
  //     console.log(results.length);
  //   });
  // }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnail(undefined);
    setThumbnailError("");

    let selected;
    if (e.target.files) {
      selected = e.target.files[0];
    }

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    if (selected.size > 1000000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }
    setThumbnail(selected);
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          disabled={isPending}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          disabled={isPending}
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
          disabled={isPending}
        />
      </label>
      <label>
        <span>Profile Image:</span>
        <input
          type="file"
          required
          onChange={(e) => handleFileChange(e)}
          disabled={isPending}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <button className="btn" disabled={isPending}>
        {isPending ? "Please wait" : "Signup"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
