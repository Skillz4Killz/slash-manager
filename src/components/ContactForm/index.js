import { Fragment, lazy, useState } from "react";

import { Row, Col, Button, Modal, Form, Input, Radio, Switch, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const [mainType, setMainType] = useState(3);
  const [secondType, setSecondType] = useState(3);
  const [thirdType, setThirdType] = useState(3);

  const onTypeChange = ({ type, secType, threeType }) => {
    console.log("on type", type, secType, threeType);
    if (type) {
      setMainType(type);
      if (type !== 1) {
        setSecondType(3);
        setThirdType(3);
      }
    }
    if (secType) {
      setSecondType(mainType === 1 ? secType : 3);
    }
    if (threeType) {
      setThirdType(mainType === 1 && secondType === 2 ? threeType : 3);
    }
  };

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
        onValuesChange={onTypeChange}
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
          name="type"
          className="collection-create-form_last-form-item"
          rules={[
            {
              required: true,
              message: "Please select the type of option!",
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value={1}>Subcommand</Radio.Button>
            <Radio.Button value={2}>Subcommand Group</Radio.Button>
            <Radio.Button value={3}>String</Radio.Button>
            <Radio.Button value={4}>Integer</Radio.Button>
            <Radio.Button value={5}>Boolean</Radio.Button>
            <Radio.Button value={6}>User</Radio.Button>
            <Radio.Button value={7}>Channel</Radio.Button>
            <Radio.Button value={8}>Role</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Required" name="required">
          <Switch />
        </Form.Item>

        {mainType === 3 ? (
          <Form.List name="choices" onFinish={onFinish}>
            {(fields, { add, remove }) => (
              <Fragment>
                {fields.map((field) => (
                  <Space key={field.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[{ required: true, message: "Missing choice name" }]}
                    >
                      <Input placeholder="Choice Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "value"]}
                      fieldKey={[field.fieldKey, "value"]}
                      rules={[{ required: true, message: "Missing choice value" }]}
                    >
                      <Input placeholder="Choice Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </Fragment>
            )}
          </Form.List>
        ) : null}

        {mainType === 1 ? (
          <Fragment>
            <Form.Item
              name="subname"
              label="Subcommand Name"
              rules={[
                {
                  required: true,
                  message: "Please input the name of the subcommand!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="subdescription"
              label="Subcommand Description"
              rules={[
                {
                  required: true,
                  message: "Please input the description of the subcommand!",
                },
              ]}
            >
              <Input type="textarea" />
            </Form.Item>
            <Form.Item
              name="secType"
              className="collection-create-form_last-form-item"
              rules={[
                {
                  required: true,
                  message: "Please select the type of option!",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value={2}>Subcommand Group</Radio.Button>
                <Radio.Button value={3}>String</Radio.Button>
                <Radio.Button value={4}>Integer</Radio.Button>
                <Radio.Button value={5}>Boolean</Radio.Button>
                <Radio.Button value={6}>User</Radio.Button>
                <Radio.Button value={7}>Channel</Radio.Button>
                <Radio.Button value={8}>Role</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Required" name="secrequired">
              <Switch />
            </Form.Item>

            {secondType === 3 ? (
              <Form.List name="users" onFinish={onFinish}>
                {(fields, { add, remove }) => (
                  <Fragment>
                    {fields.map((field) => (
                      <Space key={field.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          fieldKey={[field.fieldKey, "name"]}
                          rules={[{ required: true, message: "Missing choice name" }]}
                        >
                          <Input placeholder="Choice Name" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "value"]}
                          fieldKey={[field.fieldKey, "value"]}
                          rules={[{ required: true, message: "Missing choice value" }]}
                        >
                          <Input placeholder="Choice Value" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </Fragment>
                )}
              </Form.List>
            ) : null}
          </Fragment>
        ) : null}

        {secondType === 2 ? (
          <Fragment>
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
              name="threeType"
              className="collection-create-form_last-form-item"
              rules={[
                {
                  required: true,
                  message: "Please select the type of option!",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value={3}>String</Radio.Button>
                <Radio.Button value={4}>Integer</Radio.Button>
                <Radio.Button value={5}>Boolean</Radio.Button>
                <Radio.Button value={6}>User</Radio.Button>
                <Radio.Button value={7}>Channel</Radio.Button>
                <Radio.Button value={8}>Role</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Required" name="required">
              <Switch />
            </Form.Item>

            {thirdType === 3 ? (
              <Form.List name="users" onFinish={onFinish}>
                {(fields, { add, remove }) => (
                  <Fragment>
                    {fields.map((field) => (
                      <Space key={field.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          fieldKey={[field.fieldKey, "name"]}
                          rules={[{ required: true, message: "Missing choice name" }]}
                        >
                          <Input placeholder="Choice Name" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "value"]}
                          fieldKey={[field.fieldKey, "value"]}
                          rules={[{ required: true, message: "Missing choice value" }]}
                        >
                          <Input placeholder="Choice Value" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </Fragment>
                )}
              </Form.List>
            ) : null}
          </Fragment>
        ) : null}
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
    options,
    setOption,
    // guildID,
    // setGuildID,
    method,
    setMethod,
    guild,
    setGuild,
  } = useForm(validate);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: onCreate", values);
    setOption([...options, values]);
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
            <Form
              layout="vertical"
              name="form_main"
              initialValues={{
                isGuild: true,
              }}
              onValuesChange={({ isGuild, isCreate }) => {
                if (isGuild !== undefined) setGuild(isGuild);
                if (isCreate !== undefined) setMethod(isCreate);
              }}
            >
              <Form.Item
                name="isCreate"
                className="collection-create-form_last-form-item"
                rules={[
                  {
                    required: true,
                    message: "Would you like to create or delete a command?",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value={true}>📝 Create</Radio.Button>
                  <Radio.Button value={false}>🗑️ Delete</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="isGuild"
                className="collection-create-form_last-form-item"
                rules={[
                  {
                    required: true,
                    message: "Please select the type of command!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value={true}>🏠 Guild</Radio.Button>
                  <Radio.Button value={false}>🌐 Global</Radio.Button>
                </Radio.Group>
              </Form.Item>
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
              <br />

              {options && options.length ? (
                <Fragment>
                  <h6>Options</h6>
                  <Col span={24}>
                    {options.map((option, index) => (
                      <Fragment key={index}>
                        <Row type="flex" justify="space-between" align="middle">
                          <p>
                            {index + 1}.) {option.name}: {option.description} |{" "}
                            {option.required ? "Required" : "Optional"}
                          </p>
                          <MinusCircleOutlined
                            onClick={(event) => {
                              options.splice(index, 1);
                              setOption(options);
                              handleChange(event);
                            }}
                          />
                        </Row>
                      </Fragment>
                    ))}
                  </Col>
                  <br />
                </Fragment>
              ) : null}

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
            </Form>
          </Col>
        </Row>
      </S.Contact>
    </S.ContactContainer>
  );
};

export default withTranslation()(Contact);
