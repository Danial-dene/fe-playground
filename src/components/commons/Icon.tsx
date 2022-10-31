import React from "react";
import _ from "lodash";
import { ICONS } from "../../constants";


interface IconProps {
  name: string;
  width?: number;
  height?: number;
  fill?: string;
}
const Icon = (props: IconProps) => {
  const hasIcon = _.find(ICONS, { name: props.name });
  if (hasIcon) {
    const Comp = hasIcon.component;
    return <Comp {...props} />;
  }
  return null;
};

export { Icon };
