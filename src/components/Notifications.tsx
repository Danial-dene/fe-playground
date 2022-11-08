import { Drawer, Avatar, Divider, Col, Badge } from "antd";
import React, { useState } from "react";
import _ from "lodash";
import { Icon } from "@commons";

const Notifications = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const notiArr = [
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
    {
      date: "25 Mar 2022",
      time: "1:40pm",
      projectName: "Project Synergy",
      user: "Aiman",
      activity: "tagged you in a comment",
      task: "Site planning",
    },
  ];

  return (
    <div>
      <Col>
        <Badge dot={notiArr.length ? true : false} offset={[-11, 11]}>
          <div
            onClick={showDrawer}
            className="flex w-9 h-9 bg-primary-light rounded-[18px] text-primary items-center justify-center cursor-pointer"
          >
            {/* <Icon name="bell" /> */}
          </div>
        </Badge>
      </Col>
      <Drawer
        title="Notifications"
        placement="right"
        onClose={onClose}
        width={"478px"}
        visible={visible}
        closable={false}
        extra={
          <div onClick={onClose} className="cursor-pointer">
            {/* <Icon name="cross" /> */}
          </div>
        }
      >
        {_.map(notiArr, (o, i) => (
          <div key={`${i}`}>
            <div className="flex flex-row gap-[16px] items-center">
              <div>
                <Avatar
                  style={{ color: "#2A64F9", backgroundColor: "#E8EFFF" }}
                >
                  <span className="text-base font-semibold">A</span>
                </Avatar>
              </div>
              <div>
                <p className="text-gray90 text-base]">
                  {o.date}, {o.time}{" "}
                  <span className="text-gray50">&#8226;</span> {o.projectName}
                </p>
                <p className="text-gray100 text-base">
                  <span className="font-semibold">{o.user}</span> {o.activity}:{" "}
                  <span className="font-semibold text-primary">{o.task}</span>
                </p>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default Notifications;
