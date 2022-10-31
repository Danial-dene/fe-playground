import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  message,
  Typography,
} from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import styles from "../styles/Home.module.css";
// import "../styles/index.scss";

type FormValues = {
  username: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const formRef = useRef<FormInstance>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const { status, data } = useSession();
  console.log("status", status);
  console.log("data", data);
  if (status === "authenticated") {
    router.push("/");
  }

  const onFinish = async (values: FormValues) => {
    setSubmitting(true);

    try {
      //@ts-ignore
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl: "/",
      });
      console.log("res", res);
      if (res.error) message.error("Invalid email and password");
    } catch (e) {
      throw e;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className=" grid h-full  bg-[#0b4150] justify-center items-center ">
      {" "}
      <Head>
        <title>FE Playground Login</title>
      </Head>
      <div className=" px-4">
        <Card bordered={false} className=" bg- rounded-xl m-20   ">
          <div>
            <div className="flex justify-center items-center px-20 ">
              <Image
                src="/images/logo.png"
                height={150}
                width={150}
                layout="fixed"
                objectFit="contain"
                draggable={false}
                contentEditable={false}
                quality={50}
                priority
                alt=""
                className="rounded-full"
              />
            </div>
            <Typography.Title
              level={4}
              className="text-center py-4 font-medium text-white"
            >
              FE Playground
            </Typography.Title>

            <Form
              ref={formRef}
              className="flex flex-col gap-4 "
              onFinish={onFinish}
            >
              <Form.Item name="username" rules={[{ required: true }]}>
                <Input placeholder="E-mail" />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Button
                loading={isSubmitting}
                onClick={() => {
                  formRef?.current?.submit();
                }}
                type="primary"
                className="w-full my-6"
              >
                Login
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
