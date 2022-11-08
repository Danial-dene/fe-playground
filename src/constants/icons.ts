import Calendar from "../../public/assets/icons/calendar.svg";
import Camera from "../../public/assets/icons/camera.svg";
import ChevronDown from "../../public/assets/icons/chevron-down.svg";
import ChevronRight from "../../public/assets/icons/chevron-right.svg";
import ChevronUp from "../../public/assets/icons/chevron-up.svg";
import Close from "../../public/assets/icons/close.svg";
import Contacts from "../../public/assets/icons/contacts.svg";
import Dashboard from "../../public/assets/icons/dashboard.svg";
import Dots from "../../public/assets/icons/dots.svg";
import Filter from "../../public/assets/icons/filter.svg";
import Logout from "../../public/assets/icons/logout.svg";
import Mail from "../../public/assets/icons/mail.svg";
import MenuClose from "../../public/assets/icons/menu-close.svg";
import MenuOpen from "../../public/assets/icons/menu-open.svg";
import Pen from "../../public/assets/icons/pen.svg";
import Plus from "../../public/assets/icons/plus.svg";
import Project from "../../public/assets/icons/project.svg";
import Search from "../../public/assets/icons/search.svg";
import Settings from "../../public/assets/icons/settings.svg";
import User from "../../public/assets/icons/user.svg";
import Users from "../../public/assets/icons/users.svg";
import {
  DownOutlined,
  CalendarOutlined,
  CameraOutlined,
  RightOutlined,
  UpOutlined,
  CloseOutlined,
  ContactsOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
type IconProps = {
  name: string;
  component: any;
};
const ICONS: IconProps[] = [
  { name: "calendar", component: CalendarOutlined },
  { name: "camera", component: CameraOutlined },
  { name: "chevron-down", component: DownOutlined },
  { name: "chevron-right", component: RightOutlined },
  { name: "chevron-up", component: UpOutlined },
  { name: "close", component: CloseOutlined },
  { name: "contacts", component: ContactsOutlined },
  { name: "dashboard", component: DownOutlined },
  { name: "dots", component: DownOutlined },
  { name: "filter", component: DownOutlined },
  { name: "logout", component: DownOutlined },
  { name: "mail", component: DownOutlined },
  { name: "menu-close", component: MenuFoldOutlined },
  { name: "menu-open", component: MenuUnfoldOutlined },
  { name: "pen", component: DownOutlined },
  { name: "plus", component: DownOutlined },
  { name: "project", component: DownOutlined },
  { name: "search", component: DownOutlined },
  { name: "settings", component: DownOutlined },
  { name: "user", component: DownOutlined },
  { name: "users", component: DownOutlined },
];

export type IconNames =
  | "calendar"
  | "camera"
  | "chevron-down"
  | "chevron-right"
  | "chevron-up"
  | "close"
  | "contacts"
  | "dashboard"
  | "dots"
  | "filter"
  | "logout"
  | "mail"
  | "menu-close"
  | "menu-open"
  | "pen"
  | "plus"
  | "project"
  | "search"
  | "settings"
  | "user"
  | "users";

export { ICONS };
