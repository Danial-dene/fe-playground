import React from "react";
import _ from "lodash";
import { ICONS, IconNames } from "../constants";

interface IconProps {
  name: IconNames;
  width?: number;
  height?: number;
  fill?: string;
}
export const Icon = (props: IconProps) => {
  const hasIcon = _.find(ICONS, { name: props.name });
  if (hasIcon) {
    const Comp = hasIcon.component;

    console.log("i", Comp);

    return <Comp {...props} />;
  }
  return null;
};
