import { Button, Card, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { UserAuthService } from "src/api";

type FormData = { oldPassword: string; newPassword: string };

const SecurityForm: React.FC<any> = () => {
  const [form] = useForm();
  const [, forceUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // To disable change password button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  // Change new password
  const onFinish = async (formData: FormData) => {
    setLoading(true);
    const oldPassword = formData.oldPassword;
    const newPassword = formData.newPassword;
    UserAuthService.changePassword({ body: { oldPassword, newPassword } })
      .then(() => {
        setSuccess(true);
        message.success("Change password successfully");
      })
      .catch(() => {
        message.error("Current password is invalid");
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Card style={{ width: 640 }}>
        <Form
          layout="vertical"
          form={form}
          requiredMark={false}
          onFinish={onFinish}
        >
          <h1 className="font-bold mb-6 text-lg">Security</h1>

          <Form.Item
            className="text-gray90"
            label="Enter your current password"
            name="oldPassword"
            rules={[
              { required: true, message: "Current password is required" },
            ]}
          >
            <Input.Password className="rounded-lg h-10" />
          </Form.Item>

          <Form.Item
            className="text-gray90"
            label="Enter your new password"
            name="newPassword"
          >
            <Input.Password className="rounded-lg h-10" />
          </Form.Item>

          <Form.Item
            className="text-gray90"
            label="Re-enter your new password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: false, message: "Repeat New Password is required" },
              ({ getFieldValue }: any) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password className="rounded-lg h-10" />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="font-medium rounded-lg h-10"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Confirm password change
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SecurityForm;
