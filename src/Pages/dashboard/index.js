import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import DataCard from "@/ui-components/DataCard";
import ActionButton from "@/ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Section from "@/ui-components/Section";
import Link from "next/link";

import QuizzesAndResults from "../../components/QuizzesAndResults";
import Teacher_Modal from "@/ui-components/Teacher_Modal";
import HeaderSection from "@/ui-components/HeaderSection";

const Dashboard = () => {
  const [teacherModal, setTeacherModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [videoCount, setVideoCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0); // New state for document count
  const [isSubjectsVisible, setIsSubjectsVisible] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://meep-back.onrender.com/api/v1/subject');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchVideoCount = async () => {
      try {
        const response = await axios.get('https://meep-back.onrender.com/api/content/videos/count');
        setVideoCount(response.data.count);
      } catch (error) {
        console.error('Error fetching video count:', error);
      }
    };

    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('https://meep-back.onrender.com/api/students/count');
        setStudentCount(response.data.count);
      } catch (error) {
        console.error('Error fetching student count:', error);
      }
    };

    const fetchDocumentCount = async () => { // Fetch document count
      try {
        const response = await axios.get('https://meep-back.onrender.com/api/documents/count');
        setDocumentCount(response.data.count);
      } catch (error) {
        console.error('Error fetching document count:', error);
      }
    };

    fetchCourses();
    fetchVideoCount();
    fetchStudentCount();
    fetchDocumentCount(); // Call fetchDocumentCount
  }, []);

  const handleClose = () => {
    setTeacherModal(false);
  };

  const handleCancel = () => {
    setTeacherModal(false);
  };

  const handleSubmit = () => {
    alert('Submit is working..!');
    handleClose();
  };

  return (
    <>
      <Head>
        <title>Meep Dashboard</title>
        <link style={{ radius: '100%' }} rel="icon" href="/MeeP.png" />
      </Head>

      <HeaderSection
        heading={"Dashboard"}
        subHeading={"Welcome to MeeP dashboard"}
        rightItem={() => (
          <ActionButton
            onClick={() => setTeacherModal(true)}
            Icon={AiOutlinePlusCircle}
            label="Add New Teacher/Tutor"
          />
        )}
      />

      {/* <div style={{ backgroundColor: "#F3F4F6", borderRadius: "8px", padding: "20px", marginBottom: "20px", borderLeft: "4px solid #010100", marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3 style={{ fontSize: "1.25rem", color: "#010100", fontWeight: "bold" }}>Appointments</h3>
          <span style={{ color: "#4299E1", textDecoration: "underline", cursor: "pointer" }}>View All</span>
        </div>
        <p style={{ color: "#4A5568" }}>You have 3 new appointments</p>
      </div> */}

      <div style={{ backgroundColor: "#F3F4F6", borderRadius: "8px", padding: "20px", marginBottom: "20px", borderLeft: "4px solid #010100", marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3 style={{ fontSize: "1.25rem", color: "#010100", fontWeight: "bold" }}>Subjects</h3>
          <span
            style={{ color: "#4299E1", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setIsSubjectsVisible(!isSubjectsVisible)}
          >
            {isSubjectsVisible ? "View Less" : "View Details"}
          </span>
        </div>
        <p style={{ color: "#4A5568" }}>You teach {courses.length} subjects</p>
        {isSubjectsVisible && (
          <ul>
            {courses.map(course => (
              <li key={course.id} style={{ color: "#4A5568" }}>{course.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ backgroundColor: "#F3F4F6", borderRadius: "8px", padding: "20px", marginBottom: "20px", borderLeft: "4px solid #010100", marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3 style={{ fontSize: "1.25rem", color: "#010100", fontWeight: "bold" }}>Statistics</h3>
          <Link href="/quizzes">
            <span style={{ color: "#4299E1", textDecoration: "underline", cursor: "pointer" }}>View Details</span>
          </Link>
        </div>
        <p style={{ color: "#4A5568" }}>Take a detailed look at your statistics right here, empowering yourself to make informed decisions based on the data at hand.</p>
      </div>

      <Section>
        <DataCard label={"Teachers"} value={"4"} inverse={true} />
        <DataCard label={"Tutors"} value={"4"} inverse={true} />
        <DataCard label={"Students"} value={studentCount} inverse={true} />
        <DataCard label={"Videos"} value={videoCount} inverse={true} />
        <DataCard label={"Documents"} value={documentCount} inverse={true} /> {/* Display document count */}
        <DataCard label={"Subjects"} value={courses.length} inverse={true} />
      </Section>

      <QuizzesAndResults />

      {/* <Teacher_Modal
        isOpen={teacherModal}
        onClose={handleClose}
        heading={"MeeP Dashboard"}
        positiveText={"Save"}
        negativeText={"Cancel"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <p>Welcome to MeeP admin dashboard</p>
        </Teacher_Modal> */}
    </>
  );
};

export default Dashboard;

