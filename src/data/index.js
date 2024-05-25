import { FiUser, FiLogOut} from "react-icons/fi";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

export const menuList = [
  {
    text: "Profile",
    Icon: FiUser,
    href: "/profile",
  },
  {
    text: "Logout",
    Icon: FiLogOut,
    href: "/login",
  },
];

export const headerLoginMenuList = [
    {
      text: 'Login',
      Icon: AiOutlineLogin,
      href:'/login'
    }
  ]


