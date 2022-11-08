import { LayoutProps, Layout } from "antd";
import _ from "lodash";

interface FooterProps extends LayoutProps {}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div
      className="sticky px-5 py-5 bg-white w-full shadow-3xl"
      style={{ bottom: 0, boxShadow: "0px 2px 15px 3px rgba(0,0,0,0.1)" }}
    >
      {props.children}
    </div>
  );
};

export { Footer };
