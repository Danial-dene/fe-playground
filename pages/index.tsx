import {
  Button,
  Card,
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
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router =useRouter()
  const formRef = useRef<FormInstance>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const { status } = useSession();
  console.log("status", status);
  if (status === "authenticated") {
    router.push("/");
  }


  const onFinish = async (values: FormValues) => {
    setSubmitting(true);

    try {
      //@ts-ignore
      const { error } = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      if (error) message.error("Invalid email and password");
    } catch (e) {
      throw e;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Head>
        <title>FE Playground Login</title>
      </Head>
      <div className="login-container bg-[#0b4150] ">
        <div className="login-content px-4">
          <Card bordered={false} className=" rounded ">
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
                className="text-center py-4 font-medium text-primary"
              >
                FE Playground
              </Typography.Title>

              <Form
                ref={formRef}
                className="flex flex-col gap-4"
                onFinish={onFinish}
              >
                <Form.Item name="email">
                  <Input placeholder="E-mail" />
                </Form.Item>

                <Form.Item name="password">
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Form>

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
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
