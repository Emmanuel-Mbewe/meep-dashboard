import { IoGridOutline, IoHomeOutline, IoCallOutline } from "react-icons/io5"; // Import IoCallOutline
import { BsSpeedometer2 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { RiMessage2Line, RiFileListLine } from "react-icons/ri";

export default [
    {
        to: '/dashboard',
        name: 'Home',
        Icon: IoHomeOutline
    },
    {
        to: '/content',
        name: 'Create Content',
        Icon: BsSpeedometer2 // Assuming this icon is appropriate for Create Content
    },
    {
        to: '/manage',
        name: 'Manage Content',
        Icon: IoGridOutline
    },
    {
        to: '/messaging',
        name: 'Messaging',
        Icon: RiMessage2Line // Better suited icon for Messaging
    },
    // {
    //     to: '/profile',
    //     name: 'Profile',
    //     Icon: BiUserCircle
    // },
    {
        to: '/quizzes',
        name: 'Quizzes',
        Icon: RiFileListLine // Assuming this icon better matches Quizzes
    },
    {
        to: '/create-subjects',
        name: 'Ussd Quiz',
        Icon: IoCallOutline // Using a phone icon for USSD Quiz
    }
];