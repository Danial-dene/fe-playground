import { Card as AntdCard, CardProps as AntdCardProps, Spin } from "antd";
import _ from "lodash";
import { LoadingOutlined } from "@ant-design/icons";

interface CardProps extends AntdCardProps {}

const Card: React.FC<CardProps> = (props) => {
  return (
    <AntdCard bordered={false} {...props} loading={false}>
      <Spin
        spinning={props.loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        {props.children}
      </Spin>
    </AntdCard>
  );
};

export { Card };
