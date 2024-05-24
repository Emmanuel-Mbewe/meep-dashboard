import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import FullButton from "@/ui-components/FullButton";
import Input from "@/ui-components/Input";
import Logo from "@/ui-components/Logo";
import styles from "./signup.module.css";
import axios from "axios";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", formData);
      console.log(response.data);
      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error response
    }
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
            <h1>Signup</h1>
            <p>Create a new Account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              inputContainerStyle={{ padding: "15px 30px" }}
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstName}
              name="firstName"
              label={"First Name"}
            />
            <Input
              inputContainerStyle={{ padding: "15px 30px" }}
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastName}
              name="lastName"
              label={"Last Name"}
            />
            <Input
              inputContainerStyle={{ padding: "15px 30px" }}
              type="email"
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
            <FullButton label={"Signup"} />
          </form>

          <p className="tc-grey t-center">
            If you already have an account.{" "}
            <Link className="link" href={`/login`}>
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;