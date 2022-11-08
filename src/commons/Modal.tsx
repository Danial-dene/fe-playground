import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal as AntModal, ModalProps } from "antd";

interface Props extends ModalProps {}
export interface ModalRef {
  pushModal: (v?: any) => void;
}

const Modal = forwardRef<ModalRef, Props>((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    pushModal: (status: any) => {
      setVisible(status !== undefined ? status : !visible);
    },
  }));

  return (
    <AntModal
      visible={visible}
      onCancel={() => setVisible(!visible)}
      {...props}
    >
      {props.children}
    </AntModal>
  );
});

export { Modal };
