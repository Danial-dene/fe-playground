import { Col, Divider, Layout, Menu, Row } from "antd";

import _ from "lodash";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  PieChartOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Icon } from "../commons/Icon";
console.log("Icon", typeof Icon);
const { Sider } = Layout;

type MenuItemProps = {
  label: string;
  collapsible?: boolean;
  items: SubMenuItemProps[];
};

type SubMenuItemProps = {
  label: string;
  key: React.Key;
  to?: string;
  icon: any;
  onClick?: () => void;
};

const items: MenuItemProps[] = [
  {
    label: "Main",
    items: [
      {
        label: "Dashboard",
        key: "dashboard",
        to: "/",
        icon: PieChartOutlined,
      },
    ],
  },
  {
    label: "Projects",
    items: [
      {
        label: "Customers",
        key: "customers",
        to: "/customers",
        icon: UserOutlined,
      },
    ],
  },
  {
    label: "Settings",
    collapsible: true,
    items: [
      {
        label: "Account Settings",
        key: "account-settings",
        to: "/account-settings",
        icon: SettingOutlined,
      },
      {
        label: "Log out",
        key: "logout",
        icon: PoweroffOutlined,
        onClick: () => {
          signOut();
        },
      },
    ],
  },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sectionCollapsed, setSectionCollapsed] = useState<string[]>(
    _.map(items, "label")
  );
  const router = useRouter();
  const { data: session, status } = useSession();

  const currentPath = `/${_.split(router.pathname, "/")[1]}`;

  const pushSection = (s: string) => {
    setSectionCollapsed((prev) => {
      const res = [...prev];
      if (!_.includes(prev, s)) {
        return [...res, s];
      } else {
        const index = prev.indexOf(s);
        res.splice(index, 1);
        return res;
      }
    });
  };

  return (
    <Sider
      trigger={null}
      collapsible
      onCollapse={(value) => setCollapsed(value)}
      collapsed={collapsed}
      className="sidebar scrollbar"
      style={{
        overflow: "auto",
        height: "100vh",
      }}
      width={270}
      theme="light"
    >
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 z-50">
          <div
            className={`flex flex-row px-4 py-2 items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
            style={{ backgroundColor: "#F9F8F6" }}
          >
            {!collapsed && (
              <div className="flex items-center">
                <Image src="/assets/logo.png" width={48} height={48} />
              </div>
            )}
            <div
              onClick={() => setCollapsed(!collapsed)}
              className="mt-auto pt-3 flex items-center trigger cursor-pointer mb-3"
            >
              {collapsed ? (
                <Icon name="menu-open" />
              ) : (
                <Icon name="menu-close" />
              )}
            </div>
          </div>
        </div>

        <div className="px-3 pt-4">
          {_.map(items, (o, i) => {
            return (
              <div key={`${i}`}>
                {i !== 0 && <Divider className="my-4" />}
                {o.collapsible &&
                  (!collapsed ? (
                    <a
                      className="menu-section"
                      onClick={() => pushSection(o.label)}
                    >
                      <Row justify="space-between">
                        <Col>
                          <span className="menu-section-label px-4 mb-2 inline-block text-[12px] tracking-[1px]">
                            {_.toUpper(o.label)}
                          </span>
                        </Col>
                        <Col>
                          {_.includes(sectionCollapsed, o.label) ? (
                            <Icon name="chevron-up" />
                          ) : (
                            <Icon name="chevron-down" />
                          )}
                        </Col>
                      </Row>
                    </a>
                  ) : (
                    <div
                      onClick={() => pushSection(o.label)}
                      className="mt-auto pt-3 flex justify-center trigger cursor-pointer mb-3"
                    >
                      {_.includes(sectionCollapsed, o.label) ? (
                        <Icon name="chevron-up" />
                      ) : (
                        <Icon name="chevron-down" />
                      )}
                    </div>
                  ))}
                {_.includes(sectionCollapsed, o.label) && (
                  <Menu
                    mode="inline"
                    selectedKeys={[
                      `${
                        _.find(reduceMenuItems(items), { to: currentPath })?.key
                      }`,
                    ]}
                  >
                    {_.map(o.items, (o: SubMenuItemProps, j) => {
                      const IconComp = o.icon;
                      const link = (
                        <div
                          className="menu-link-wrapper flex items-center"
                          onClick={o.onClick}
                        >
                          <IconComp />
                          {!collapsed && (
                            <span className="pl-1">{o.label}</span>
                          )}
                        </div>
                      );
                      return (
                        <Menu.Item key={`${o.key}`}>
                          {o.to && router.pathname !== o.to ? (
                            <Link href={o.to}>{link}</Link>
                          ) : (
                            link
                          )}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Sider>
  );
};

const reduceMenuItems = (arr: MenuItemProps[]) => {
  let items = [] as any;
  _.map(arr, (o) => {
    items = [...items, ...o.items];
  });
  return items;
};

export default SideBar;
