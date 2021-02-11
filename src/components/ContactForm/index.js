import { lazy, useState } from "react";

import { Row, Col, Button, Modal, Form, Input, Radio } from "antd";
import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";

import useForm from "./useForm";
import validate from "./validationRules";

import * as S from "./styles";
import ToggleButton from "../toggle";

import ContactContent from "../../content/ContactContent.json";

const Block = lazy(() => import("../Block"));
const CommonInput = lazy(() => import("../../common/Input"));
const CommonButton = lazy(() => import("../../common/Button"));
const TextArea = lazy(() => import("../../common/TextArea"));

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new option"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Option Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the option!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the description of the option!",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
          rules={[
            {
              required: true,
              message: "Please select the type of option!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={1}>Subcommand</Radio>
            <Radio value={2}>Subcommand Group</Radio>
            <Radio value={3}>String</Radio>
            <Radio value={4}>Integer</Radio>
            <Radio value={5}>Boolean</Radio>
            <Radio value={6}>User</Radio>
            <Radio value={7}>Channel</Radio>
            <Radio value={8}>Role</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Contact = ({ id, t }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    // options,
    // setOption,
    // guildID,
    // setGuildID,
    method,
    setMethod,
    guild,
    setGuild,
  } = useForm(validate);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const ValidationType = ({ type }) => {
    const ErrorMessage = errors[type];
    return errors[type] ? (
      <Zoom cascade>
        <S.Span>{ErrorMessage}</S.Span>
      </Zoom>
    ) : (
      <S.Span />
    );
  };

  return (
    <S.ContactContainer id={id}>
      <S.Contact>
        <Row type="flex" justify="space-between" align="middle">
          <Col lg={12} md={11} sm={24}>
            <Block
              padding={true}
              title={method ? ContactContent.createTitle : ContactContent.deleteTitle}
              texts={method ? ContactContent.createText : ContactContent.deleteText}
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <ToggleButton onChange={(state) => setMethod(state)} defaultChecked={method} />
            <br></br>
            <ToggleButton
              onChange={(state) => setGuild(state)}
              icons={{ checked: <>🏠</>, unchecked: <>🌐</> }}
              defaultChecked={guild}
            />
            <S.FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <CommonInput
                  type="text"
                  name="secret"
                  id="Secret"
                  placeholder="SECRET_CODE"
                  value={values.secret || ""}
                  onChange={handleChange}
                />
                <ValidationType type="secret" />
              </Col>

              {guild ? (
                <Col span={24}>
                  <CommonInput
                    type="text"
                    name="guildID"
                    id="Guild ID"
                    placeholder="785384884197392384"
                    value={values.guildID || ""}
                    onChange={handleChange}
                  />
                  <ValidationType type="guildID" />
                </Col>
              ) : null}

              <Col span={24}>
                <CommonInput
                  type="text"
                  name="name"
                  id="Command Name"
                  placeholder="ping"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Command Description = Check if the bot is alive!"
                  value={values.description || ""}
                  name="description"
                  id="Description"
                  onChange={handleChange}
                />
                <ValidationType type="description" />
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  New Option
                </Button>
                <CollectionCreateForm
                  visible={visible}
                  onCreate={onCreate}
                  onCancel={() => {
                    setVisible(false);
                  }}
                />
              </Col>

              <S.ButtonContainer>
                <CommonButton name="submit" type="submit">
                  {t("Submit")}
                </CommonButton>
              </S.ButtonContainer>
            </S.FormGroup>
          </Col>
        </Row>
      </S.Contact>
    </S.ContactContainer>
  );

  // return (
  //   <S.ContactContainer id={id}>
  //     <S.Contact>
  //       <Row type="flex" justify="space-between" align="middle">
  //         <Col lg={12} md={11} sm={24}>
  //           <Block padding={true} title={title} content={content} />
  //         </Col>
  //         <Col lg={12} md={12} sm={24}>
  //           <S.FormGroup autoComplete="off" onSubmit={handleSubmit}>
  //             <Col span={24}>
  //               <CommonInput
  //                 type="text"
  //                 name="name"
  //                 id="Name"
  //                 placeholder="Your Name"
  //                 value={values.name || ""}
  //                 onChange={handleChange}
  //               />
  //               <ValidationType type="name" />
  //             </Col>
  //             <Col span={24}>
  //               <CommonInput
  //                 type="text"
  //                 name="email"
  //                 id="Email"
  //                 placeholder="Your Email"
  //                 value={values.email || ""}
  //                 onChange={handleChange}
  //               />
  //               <ValidationType type="email" />
  //             </Col>
  //             <Col span={24}>
  //               <TextArea
  //                 placeholder="Your Message"
  //                 value={values.message || ""}
  //                 name="message"
  //                 id="Message"
  //                 onChange={handleChange}
  //               />
  //               <ValidationType type="message" />
  //             </Col>
  //             <S.ButtonContainer>
  //               <CommonButton name="submit" type="submit">
  //                 {t("Submit")}
  //               </CommonButton>
  //             </S.ButtonContainer>
  //           </S.FormGroup>
  //         </Col>
  //       </Row>
  //     </S.Contact>
  //   </S.ContactContainer>
  // );
};

export default withTranslation()(Contact);
