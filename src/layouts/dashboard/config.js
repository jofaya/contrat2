import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <DashboardIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Recherche",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <MagnifyingGlassIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Monitoring",
    path: "/companies",
    icon: (
      <SvgIcon fontSize="small">
        <EyeIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
  {
    title: "Login",
    path: "/auth/login",
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Register",
    path: "/auth/register",
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Error",
  //   path: "/404",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   ),
  // },
];
