import { Layout } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UserAuthService } from "src/api";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const { Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isCheckedFirstTime, setIsCheckedFirstTime] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) {
      // here
      router.push("/login"); //Redirect to login
    }
  }, [isUser, status]);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut(); // sign out upon error
    }
  }, [session]);

  if (!isUser) {
    return null;
  }

  return (
    <Layout hasSider style={{ minHeight: "100vh", maxHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <NavBar />
        <Content className="relative">
          <div className="h-full	w-full scrollbar">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
