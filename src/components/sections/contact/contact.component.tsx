import React, { useEffect, useState } from "react";
import { useForm as useFormspree } from "@formspree/react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { Layout, Form, Row, Col, Input, Button, Card, message } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";
import ReactGA from "react-ga";

import { Social } from "&components/sections/social/social.component";
import { Section } from "&components/common/section/section.component";
import styles from "./contact.module.css";
import { formspreeKey, recaptchaKey } from "&config/meta";

const fields = { NAME: "name", EMAIL: "email", MESSAGE: "message" };
const initialValues = { _name: "", _replyto: "", message: "" };

export function Contact() {
  const { t } = useTranslation();
  const { currentTheme, themes } = useThemeSwitcher();
  const [state, handleSubmit] = useFormspree(formspreeKey, { debug: true });
  const [canSubmit, setCanSubmit] = useState(false);
  const [form] = Form.useForm<typeof initialValues>();

  const theme = currentTheme === themes.dark ? "dark" : "light";

  message.config({ maxCount: 1 });

  useEffect(() => {
    if (state.succeeded && !state.submitting) {
      message.success(t("SUBMIT_SUCCESS"));
    }

    if (state.errors.length > 0) {
      message.error(t("SUBMIT_ERROR"));
    }
  }, [state, t]);

  const onSubmit = async (e: any) => {
    try {
      await form.validateFields();
      await handleSubmit(e?.nativeEvent);
      form.resetFields();

      ReactGA.event({ category: "Contact", action: "Submit" });
    } catch (e) {
      message.error(t("SUBMIT_ERROR"));
      ReactGA.event({ category: "Contact", action: "Error" });
    }
  };

  return (
    <Layout className={styles.full}>
      <Section full title={t("CONTACT")}>
        <Form
          form={form}
          layout="vertical"
          name="contact-form"
          requiredMark={false}
          onSubmitCapture={onSubmit}
          initialValues={initialValues}
        >
          <Row justify="center">
            <Col xs={24} sm={24} md={20} lg={16} xl={12}>
              <Card>
                <Form.Item
                  name={fields.NAME}
                  rules={[{ required: true, message: t("REQUIRED") }]}
                >
                  <Input
                    id="name"
                    type="text"
                    name={fields.NAME}
                    placeholder={t("NAME")}
                  />
                </Form.Item>
                <Form.Item
                  name={fields.EMAIL}
                  rules={[
                    { required: true, message: t("REQUIRED") },
                    { type: "email", message: t("EMAIL_INVALID") },
                  ]}
                >
                  <Input
                    id="email"
                    type="email"
                    name={fields.EMAIL}
                    placeholder={t("EMAIL")}
                  />
                </Form.Item>
                <Form.Item
                  name={fields.MESSAGE}
                  rules={[{ required: true, message: t("REQUIRED") }]}
                >
                  <Input.TextArea
                    rows={4}
                    name={fields.MESSAGE}
                    placeholder={t("MESSAGE")}
                  />
                </Form.Item>
                <Form.Item>
                  <ReCAPTCHA
                    theme={theme}
                    sitekey={recaptchaKey}
                    onChange={() => setCanSubmit(true)}
                    onErrored={() => setCanSubmit(false)}
                    onExpired={() => setCanSubmit(false)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    block
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={state.submitting}
                    disabled={!canSubmit}
                  >
                    {t("SUBMIT")}
                  </Button>
                </Form.Item>
                <Social />
              </Card>
            </Col>
          </Row>
        </Form>
      </Section>
    </Layout>
  );
}
