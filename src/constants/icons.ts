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
type IconProps = {
  name: string;
  component: any;
};
const ICONS: IconProps[] = [
  { name: "calendar", component: Calendar },
  { name: "camera", component: Camera },
  { name: "chevron-down", component: ChevronDown },
  { name: "chevron-right", component: ChevronRight },
  { name: "chevron-up", component: ChevronUp },
  { name: "close", component: Close },
  { name: "contacts", component: Contacts },
  { name: "dashboard", component: Dashboard },
  { name: "dots", component: Dots },
  { name: "filter", component: Filter },
  { name: "logout", component: Logout },
  { name: "mail", component: Mail },
  { name: "menu-close", component: MenuClose },
  { name: "menu-open", component: MenuOpen },
  { name: "pen", component: Pen },
  { name: "plus", component: Plus },
  { name: "project", component: Project },
  { name: "search", component: Search },
  { name: "settings", component: Settings },
  { name: "user", component: User },
  { name: "users", component: Users },
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
