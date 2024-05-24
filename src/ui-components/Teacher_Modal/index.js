import React, { useState } from "react";

const Teacher_Modal = ({
  isOpen = false,
  onClose = () => {},
  heading = "",
  positiveText = "",
  negativeText = "",
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [teachingSubject, setTeachingSubject] = useState("");
  const [sex, setSex] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    const newTeacher = {
      fullName,
      email,
      username,
      password,
      teachingSubject,
      sex,
      serialNumber,
      status,
    };
    onSubmit(newTeacher);
    onClose(); // Close the Teacher_Modal after submission
  };

  return (
    <>
      {isOpen ? (
        <section
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              {/* <h1 style={{ margin: 0, color: "#010100", fontSize:'24px' }}>{heading}</h1> */}
              <h3 style={{ margin: 0, marginTop: "10px", fontSize:'18px'}}>Add a Teacher/Tutor</h3>
              <button
                onClick={onClose}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  float: "right",
                  fontSize: "1.2rem",
                }}
              >
                X
              </button>
            </div>

            <form>
              <div style={{ marginBottom: "15px" }}>
                <div>
                <label htmlFor="fullName" style={{ marginRight: "10px" }}>
                  Full Name:
                </label>
                </div>
                <div>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px"}}
                  required
                />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div>
                <label htmlFor="email" style={{ marginRight: "45px" }}>
                  Email:
                </label>
                </div>
                <div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px"}}
                  required
                />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div>
                <label htmlFor="username" style={{ marginRight: "20px" }}>
                  Username:
                </label>
                </div>
                <div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px"}}
                  required
                />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div>
                <label htmlFor="password" style={{ marginRight: "25px" }}>
                  Password:
                </label>
                </div>
                <div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px" }}
                  required
                />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div>
                <label
                  htmlFor="teachingSubject"
                  style={{ marginRight: "5px" }}
                >
                  Teaching Subject:
                </label>
                </div>
                <div>
                <input
                  type="text"
                  id="teachingSubject"
                  value={teachingSubject}
                  onChange={(e) => setTeachingSubject(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px" }}
                  required
                />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div>
                <label htmlFor="sex" style={{ marginRight: "78px" }}>
                  Sex:
                </label>
                </div>
                <div>
                <input
                  type="text"
                  id="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px" }}
                  required
                />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div>
                <label
                  htmlFor="serialNumber"
                  style={{ marginRight: "10px" }}
                >
                  Serial Number:
                </label>
                </div>
                <div>
                <input
                  type="text"
                  id="serialNumber"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px"}}
                  required
                />
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div>
                <label htmlFor="status" style={{ marginRight: "57px" }}>
                  Status:
                </label>
                </div>
                <div>
                <input
                  type="text"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ width: "calc(100% - 10px)" , padding: "7px"}}
                  required
                />
                </div>
              </div>
            </form>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={onCancel}
                style={{
                  padding: "8px 20px",
                  marginRight: "10px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#ccc",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {negativeText}
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  padding: "8px 20px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#010100",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {positiveText}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Teacher_Modal;