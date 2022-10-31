import { Col, Dropdown, Layout, Menu, Row, Space, Typography } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useHeader } from "./HeaderProvider";

const { Header } = Layout;
const { Title } = Typography;

const NavBar: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { title } = useHeader();

  return (
    <Header className="navbar">
      <Row
        align="middle"
        justify="space-between"
        style={{ height: "100%" }}
        className="w-full"
      >
        <Col span={12}>
          <Title level={4}>
            <div>{title}</div>
          </Title>
        </Col>
        {/* <Notifications /> */}
      </Row>
    </Header>
  );
};

export default NavBar;
