import { lazy, useState } from "react";

import { Row, Col } from "antd";
import Zoom from "react-reveal/Zoom";
import { withTranslation } from "react-i18next";

import useForm from "./useForm";
import validate from "./validationRules";

import * as S from "./styles";
import * as IS from "../../common/Input/styles";
import ToggleButton from "../toggle";

import ContactContent from "../../content/ContactContent.json";

const Block = lazy(() => import("../Block"));
const Input = lazy(() => import("../../common/Input"));
const Button = lazy(() => import("../../common/Button"));
const TextArea = lazy(() => import("../../common/TextArea"));

const Contact = ({ id, t }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    options,
    setOption,
    guildID,
    setGuildID,
    method,
    setMethod,
    guild,
    setGuild,
  } = useForm(validate);

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
                <Input
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
                  <Input
                    type="text"
                    name="guildid"
                    id="Guild ID"
                    placeholder="785384884197392384"
                    value={values.guildID || ""}
                    onChange={handleChange}
                  />
                  <ValidationType type="guildid" />
                </Col>
              ) : null}

              <Col span={24}>
                <Input
                  type="text"
                  name="name"
                  id="Command Name"
                  placeholder="ping"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Command Description = Check if the bot is alive!"
                  value={values.description || ""}
                  name="description"
                  id="Description"
                  onChange={handleChange}
                />
                <ValidationType type="message" />
              </Col>
              {/**
                <Row type="flex" justify="space-between" align="middle">
                <Col span={8}>
                <TextArea
                placeholder="Your Command Description = Check if the bot is alive!"
                value={values.description || ""}
                name="description"
                id="Description"
                onChange={handleChange}
                />
                <ValidationType type="message" />
                </Col>
                <Col span={8}>
                <TextArea
                placeholder="Your Command Description = Check if the bot is alive!"
                value={values.description || ""}
                name="description"
                id="Description"
                onChange={handleChange}
                />
                <ValidationType type="message" />
                </Col>
                <Col span={8}>
                <Button name="addoption">{t("Add Option")}</Button>
                </Col>
                </Row>
              */}
              <S.ButtonContainer>
                <Button name="submit" type="submit">
                  {t("Submit")}
                </Button>
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
  //               <Input
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
  //               <Input
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
  //               <Button name="submit" type="submit">
  //                 {t("Submit")}
  //               </Button>
  //             </S.ButtonContainer>
  //           </S.FormGroup>
  //         </Col>
  //       </Row>
  //     </S.Contact>
  //   </S.ContactContainer>
  // );
};

export default withTranslation()(Contact);
