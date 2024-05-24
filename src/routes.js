import { IoGridOutline, IoHomeOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";

export default [
    {
        to: '/',
        name: 'Home',
        Icon: IoHomeOutline
    },
    {
        to: '/content',
        name: 'Create Content',
        Icon: BsSpeedometer2
    },
    {
        to: '/manage',
        name: 'Manage Content',
        Icon: IoGridOutline
    },
    {
        to: '/messaging',
        name: 'Messaging',
        Icon: IoGridOutline
    },
    {
        to: '/profile',
        name: 'Profile',
        Icon: BiUserCircle
    },
    {
        to: '/quizzes',
        name: 'Quizzes',
        Icon: IoGridOutline
    },
    {
        to: '/ussd-quiz',
        name: 'Ussd Quiz',
        Icon: IoGridOutline
    }
];