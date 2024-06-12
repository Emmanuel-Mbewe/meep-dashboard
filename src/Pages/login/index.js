import { useState } from "react";
import { useRouter } from "next/router";
import Logo from "@/ui-components/Logo";
import Input from "@/ui-components/Input";
import FullButton from "@/ui-components/FullButton";
import Head from "next/head";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login process (dummy users with roles)
    const users = [
      { email: "admin@example.com", password: "admin", role: "Admin" },
      { email: "teacher@example.com", password: "teacher", role: "Teacher" },
      { email: "student@example.com", password: "student", role: "Student" }
    ];
    const user = users.find((u) => u.email === formData.email && u.password === formData.password);
    if (user) {
      // Successful login
      console.log("Login successful");
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(user));
      // Redirect to dashboard page
      router.push("/");
    } else {
      // Failed login
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Head>
        <title>Meep Dashboard</title>
        <link rel="icon" href="/MeeP.png" />
      </Head>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Logo width="150px" height="150px" />
          <div style={{ marginTop: "15px", fontSize: "32px", fontWeight: "bold" }}>MeeP Teacher Dashboard</div>
        </div>

        <div style={{ backgroundColor: "#f9f9f9", borderRadius: "20px", padding: "30px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ marginBottom: "20px", fontSize: "36px" }}>Login</h1>
            <p style={{ margin: "0", fontSize: "18px", color: "#666" }}>Please enter email and password to login</p>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              inputContainerStyle={{ padding: "20px 40px", fontSize: "18px" }}
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              label={"Email"}
              required
            />
            <Input
              inputContainerStyle={{ padding: "20px 40px", fontSize: "18px" }}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              label={"Password"}
              required
            />
            <FullButton label={"Login"} style={{ fontSize: "18px", padding: "15px 0" }} />
            {error && <div style={{ textAlign: "center", marginTop: "10px" }}><p style={{ color: "red" }}>{error}</p></div>}
          </form>
        </div>
      </div>
    </>
  );
};

Login.displayName = 'Login';

export default Login;
