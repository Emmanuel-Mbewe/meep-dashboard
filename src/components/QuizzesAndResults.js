import {
  FaCloudDownloadAlt,
  FaRegFilePdf,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { useState } from "react";
import ActionButton from "@/ui-components/ActionButton";
import Table from "@/ui-components/Table";
import Teacher_Modal from "@/ui-components/Teacher_Modal";

const table_column_heading = [
  {
    key: "quiz",
    heading: "Quiz",
  },
  {
    key: "quiz-date",
    heading: "Quiz date",
    icon: FaLongArrowAltDown,
  },
  {
    key: "students",
    heading: "Students",
  },
  {
    key: "action-btn",
    heading: "",
  },
];

const table_data = [
  {
    id: 1,
    quiz: {
      value: <a href="https://www.ilo.org/public/libdoc/ilo/1992/92B09_22_engl.pdf" download="quiz001.pdf">Quiz #001 - Apr 2024</a>,
      link: "https://www.ilo.org/public/libdoc/ilo/1992/92B09_22_engl.pdf",
      icon: FaRegFilePdf,
    },
    "quiz-date": {
      value: "Apr 20, 2024",
    },
    students: {
      value: "10 Students",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="Download"
          Icon={FaCloudDownloadAlt}
          inverse={true}
          onClick={() => {
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = "https://www.ilo.org/public/libdoc/ilo/1992/92B09_22_engl.pdf";
            link.download = "quiz001.pdf";
            // Trigger the click event to start the download
            document.body.appendChild(link);
            link.click();
            // Clean up
            document.body.removeChild(link);
          }}
        />
      ),
    },
  },  
  {
    id: 2,
    quiz: {
      value: "Quiz #001 - Apr 2024",
      link: " https://www.ilo.org/public/libdoc/ilo/1992/92B09_22_engl.pdf",
      icon: FaRegFilePdf,
    },
    "quiz-date": {
      value: "Apr 20, 2024",
    },
    students: {
      value: "10 Students",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="Download"
          Icon={FaCloudDownloadAlt}
          inverse={true}
          onClick={() => {
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = " https://www.ilo.org/public/libdoc/ilo/1992/92B09_22_engl.pdf";
            link.download = "quiz001.pdf";
            // Trigger the click event to start the download
            document.body.appendChild(link);
            link.click();
            // Clean up
            document.body.removeChild(link);
          }}
        />
      ),
    },
  },  
];

const QuizzesAndResults = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <Table
        mainHeading={"Performance Trend"}
        subHeading={"Download your previous quiz results."}
        headingRightItem={() => (
          <div></div>
        )}
        heading={table_column_heading}
        data={table_data}
      />
      <Teacher_Modal
        isOpen={modal}
        heading={"Download all Results"}
        onClose={handleClose}
        positiveText={'Download'}
        negativeText={'Cancel'}
      />
    </>
  );
};

export default QuizzesAndResults;