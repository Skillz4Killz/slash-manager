import { Fragment, lazy, useState } from "react";

import { Row, Col, Button, Form, Radio } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";

import useForm from "./useForm";
import validate from "./validationRules";
import CollectionCreateForm from "./options";

import * as S from "./styles";
import { DragSortingTable } from "../table";

import ContactContent from "../../content/ContactContent.json";

const Block = lazy(() => import("../Block"));
const CommonInput = lazy(() => import("../../common/Input"));
const CommonButton = lazy(() => import("../../common/Button"));
const TextArea = lazy(() => import("../../common/TextArea"));

const ALLTYPES = new Map([
  [1, "Subcommand"],
  [2, "Subcommand Group"],
  [3, "String"],
  [4, "Integer"],
  [5, "Boolean"],
  [6, "User"],
  [7, "Channel"],
  [8, "Role"],
]);

const Contact = ({ id, t }) => {
  const {
    values,
    errors,
    handleChange,
    // handleSubmit,
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
  const [title, setTitle] = useState(ContactContent.createTitle);
  const [texts, setTexts] = useState(ContactContent.createText);

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
              title={title || ContactContent.createTitle}
              texts={texts || ContactContent.createTexts}
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form
              layout="vertical"
              name="form_main"
              initialValues={{
                isGuild: true,
                isCreate: true,
              }}
              onValuesChange={({ isGuild, isCreate }) => {
                if (isGuild !== undefined) {
                  setGuild(isGuild);
                  setTitle(method ? ContactContent.createTitle : ContactContent.deleteTitle);
                  setTexts(method ? ContactContent.createText : ContactContent.deleteText);
                }
                if (isCreate !== undefined) {
                  setMethod(isCreate);
                  setTitle(isCreate ? ContactContent.createTitle : ContactContent.deleteTitle);
                  setTexts(isCreate ? ContactContent.createText : ContactContent.deleteText);
                }
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
                  onFocus={() => {
                    setTitle(ContactContent.secretTitle);
                    setTexts(ContactContent.secretText);
                  }}
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
              {method ? (
                <Fragment>
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
                </Fragment>
              ) : null}

              {options && options.length ? (
                <Fragment>
                  <h6>Options</h6>
                  <Col span={24}>
                    <DragSortingTable
                      options={options.map((o, index) => ({
                        ...o,
                        type: ALLTYPES.get(o.type) || o.type,
                        required: o.required ? "Yes" : "No",
                        action: (
                          <MinusCircleOutlined
                            onClick={(event) => {
                              options.splice(index, 1);
                              setOption(options);
                              handleChange(event);
                            }}
                          />
                        ),
                      }))}
                      setOption={setOption}
                    ></DragSortingTable>
                  </Col>
                  <br />
                </Fragment>
              ) : null}

              {method ? (
                <Fragment>
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
                </Fragment>
              ) : null}

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
