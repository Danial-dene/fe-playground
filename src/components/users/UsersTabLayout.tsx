import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const UsersTabLayout: React.FC<Props> = ({ children }) => {
  const route = useRouter();

  return (
    <div className="mt-0 overflow-hidden tab-layout">
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[route.pathname]}
        className="px-4 fixed w-full z-10"
      >
        <Menu.Item key="/users">
          <Link href="/users">All users</Link>
        </Menu.Item>
        <Menu.Item key="/users/departments">
          <Link href="/users/departments">Departments</Link>
        </Menu.Item>
        <Menu.Item key="/users/roles">
          <Link href="/users/roles">Roles & Permissions</Link>
        </Menu.Item>
      </Menu>
      <div className="absolute overflow-auto w-full h-full pt-12"> {children}</div>
    </div>
  );
};

export default UsersTabLayout;
