import {
  Breadcrumb as AntdBreadcrumb,
  BreadcrumbProps as AntdBreadcrumbProps,
} from "antd";
import _ from "lodash";
import { Icon } from "./Icon";

import styles from "./Breadcrumb.module.scss";

type BreadcrumbItemsType = {
  label: string;
  onClick?: () => void;
};
interface BreadcrumbProps extends AntdBreadcrumbProps {
  items: BreadcrumbItemsType[];
  onClose?: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  return (
    <AntdBreadcrumb separator="" className={styles.antdBreadcrumb}>
      <AntdBreadcrumb.Item
        className="close-item"
        onClick={() => {
          if (props.onClose) props.onClose();
        }}
      >
        <Icon name="close" />
      </AntdBreadcrumb.Item>
      {_.map(props.items, (o, i) => {
        const lastIndex = _.size(props.items) - 1;
        return (
          <>
            <AntdBreadcrumb.Item
              onClick={() => {
                if (o.onClick) o.onClick();
              }}
              className="breadcrumb-item"
            >
              <span style={o.onClick && { cursor: "pointer" }}>{o.label}</span>
            </AntdBreadcrumb.Item>
            {lastIndex !== i && (
              <AntdBreadcrumb.Separator>
                <Icon name="chevron-right" />
              </AntdBreadcrumb.Separator>
            )}
          </>
        );
      })}
    </AntdBreadcrumb>
  );
};

export { Breadcrumb };
