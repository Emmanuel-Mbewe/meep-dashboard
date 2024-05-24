import { useState } from "react";
import DataCard from "@/ui-components/DataCard";
import ActionButton from "@/ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Section from "@/ui-components/Section";
import Link from "next/link"; // Import Link from Next.js

import QuizzesAndResults from "../../components/QuizzesAndResults";
import Teacher_Modal from "@/ui-components/Teacher_Modal";
import HeaderSection from "@/ui-components/HeaderSection";

export default function Dashboard() {
  const [teacher_modal, setTeacher_modal] = useState(false);

  const handleClose = () => {
    setTeacher_modal(false);
  };

  const handleCancel = () => {
    setTeacher_modal(false);
  };

  const handleSubmit = () => {
    alert('Submit is working..!');
    handleClose();
  };

  return (
    <>
      <HeaderSection
        heading={"Dashboard"}
        subHeading={"Welcome to MeeP dashboard"}
        rightItem={() => (
          <ActionButton
            onClick={() => setTeacher_modal(true)}
            Icon={AiOutlinePlusCircle}
            label="Add New Teacher/Tutor"
          />
        )}
      />
      <div style={{ backgroundColor: "#F3F4F6", borderRadius: "8px", padding: "20px", marginBottom: "20px", borderLeft: "4px solid #010100;", marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3 style={{ fontSize: "1.25rem", color: "#010100", fontWeight: "bold" }}>Appointments</h3>
          <Link href="/appointments"> {/* Use Link component for navigation */}
            <span style={{ color: "#4299E1", textDecoration: "underline", cursor: "pointer" }}>View All</span>
          </Link>
        </div>
        <p style={{ color: "#4A5568" }}>You have 3 new appointments</p>
      </div>

      <div style={{ backgroundColor: "#F3F4F6", borderRadius: "8px", padding: "20px", marginBottom: "20px", borderLeft: "4px solid #010100;", marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3 style={{ fontSize: "1.25rem", color: "#010100", fontWeight: "bold" }}>Subjects</h3>
          <Link href="/subjects"> {/* Use Link component for navigation */}
            <span style={{ color: "#4299E1", textDecoration: "underline", cursor: "pointer" }}>View Details</span>
          </Link>
        </div>
        <p style={{ color: "#4A5568" }}>You teach 3 subjects</p>
      </div>

      <div style={{ backgroundColor: "#F3F4F6", borderRadius: "8px", padding: "20px", marginBottom: "20px", borderLeft: "4px solid #010100;", marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3 style={{ fontSize: "1.25rem", color: "#010100", fontWeight: "bold" }}>Statistics</h3>
          <Link href="/quizzes"> {/* Use Link component for navigation */}
            <span style={{ color: "#4299E1", textDecoration: "underline", cursor: "pointer" }}>View Details</span>
          </Link>
        </div>
        <p style={{ color: "#4A5568" }}>Take a detailed look at your statistics right here, empowering yourself to make informed decisions based on the data at hand.</p>
      </div>

      <Section>
        <Link href="/teachers"> {/* Use Link component for navigation */}
          <DataCard
            label={"Teachers"}
            value={"7"}
            inverse={true}
          />
        </Link>
        <Link href="/tutors"> {/* Use Link component for navigation */}
          <DataCard
            label={"Tutors"}
            value={"4321 +"}
            inverse={true}
          />
        </Link>
        <Link href="/students"> {/* Use Link component for navigation */}
          <DataCard
            label={"Students"}
            value={"32+"}
            inverse={true}
          />
        </Link>
        <Link href="/videos"> {/* Use Link component for navigation */}
          <DataCard
            label={"Videos"}
            value={"70"}
            inverse={true}
          />
        </Link>
        <Link href="/quizzes"> {/* Use Link component for navigation */}
          <DataCard
            label={"Documents"}
            value={"4321 +"}
            inverse={true}
          />
        </Link>
        
      </Section>

      <QuizzesAndResults />

      <Teacher_Modal
        isOpen={teacher_modal}
        onClose={handleClose}
        heading={"MeeP Dashboard"}
        positiveText={"Save"}
        negativeText={"Cancel"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <p>Welcome to MeeP admin dashboard</p>
      </Teacher_Modal>
    </>
  );
}