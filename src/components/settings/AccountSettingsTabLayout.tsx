import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const SettingsTabLayout: React.FC<Props> = ({ children }) => {
  const route = useRouter();

  return (
    <div className="mt-0 overflow-hidden tab-layout">
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[route.pathname]}
        className="px-4 fixed w-full z-10"
      >
        <Menu.Item key="/account-settings/profile">
          <Link href="/account-settings/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="/account-settings/security">
          <Link href="/account-settings/security">Security</Link>
        </Menu.Item>
        <Menu.Item key="/account-settings/notifications">
          <Link href="/account-settings/notifications">Notifications</Link>
        </Menu.Item>
      </Menu>
      <div className="absolute overflow-auto w-full h-full pt-12"> {children}</div>
    </div>
  );
};

export default SettingsTabLayout;
