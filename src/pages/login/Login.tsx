import { createRef, FormEvent, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA } from "../../firebase/captchaConfig";
import { useLogin } from "../../hooks/useLogin";
import "./Login.css";

interface ILoginProps {}

const Login = (props: ILoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();
  const [env, setEnv] = useState("");
  const [captcha, setCaptcha] = useState("");

  let captchaRef = createRef();

  useEffect(() => {
    setEnv(process.env.NODE_ENV.toUpperCase());
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password, captcha);
  };

  const handleCaptcha = () => {
    if (captchaRef) {
      //@ts-ignore
      setCaptcha(captchaRef?.current?.getValue());
    }
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <ReCAPTCHA
        //@ts-ignore
        ref={captchaRef}
        sitekey={
          env
            ? env === "PRODUCTION"
              ? CAPTCHA.PRODUCTION
              : CAPTCHA.DEVELOPMENT
            : CAPTCHA.PRODUCTION
        }
        onChange={handleCaptcha}
      />
      <button
        style={{ marginTop: "24px" }}
        className="btn"
        disabled={isPending}
      >
        {isPending ? "Please wait" : "Login"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
