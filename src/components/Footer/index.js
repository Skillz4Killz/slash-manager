import { lazy, Fragment } from "react";
import { Row } from "antd";
// import i18n from "i18next";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import * as S from "./styles";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Container = lazy(() => import("../../common/Container"));

const Footer = ({ t }) => {
  // const handleChange = (event) => {
  //   i18n.changeLanguage(event.target.value);
  // };

  const SocialLink = ({ href, src }) => {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" key={src} aria-label={src}>
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Fragment>
      <Fade bottom>
        <S.Extra>
          <Container border="true">
            <Row type="flex" justify="space-between" align="middle" style={{ paddingTop: "3rem" }}>
              <S.FooterContainer>
                <p>Made by Skillz4Killz</p>
                <a href="https://discord.gg/5vBgXk3UcZ">Need Help? Click To Join Discord!</a>
                <SocialLink href="https://github.com/Skillz4Killz/slash-manager" src="github.svg" />
              </S.FooterContainer>
            </Row>
          </Container>
        </S.Extra>
      </Fade>
    </Fragment>
  );
};

export default withTranslation()(Footer);
