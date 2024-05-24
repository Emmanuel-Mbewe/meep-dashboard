import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./login.module.css";
import Logo from "@/ui-components/Logo";
import Input from "@/ui-components/Input";
import FullButton from "@/ui-components/FullButton";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send login request)
    console.log("Form data:", formData);
    // Redirect to dashboard page
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <section className={styles["login-container"]}>
        <div className={styles["brand-container"]}>
          <Logo />
          <div className={styles["logo-explain"]}>MeeP Dashboard</div>
        </div>

        <div className={styles["form-container"]}>
          <div className="t-center" style={{ margin: "15px 0" }}>
            <div className={styles["sm-brand-container"]}>
              <Logo />
            </div>
            <h1>Login</h1>
            <p>Please enter email and password to login</p>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              inputContainerStyle={{ padding: "15px 30px" }}
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              label={"Email"}
            />
            <Input
              inputContainerStyle={{ padding: "15px 30px" }}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              label={"Password"}
            />
            <FullButton label={"Login"} />
          </form>

          <p className="tc-grey t-center">
            Don't have an account?{" "}
            <Link className="link" href={`/signup`}>
              Signup for free
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

Login.displayName = 'Login';

export default Login;