import { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import * as S from "./styles";

const Button = lazy(() => import("../../common/Button"));

const MiddleBlock = ({ title, content, button, t }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Fade bottom>
          <S.ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              {content.map((c, index) => (
                <S.Content key={index}>{t(c)}</S.Content>
              ))}
              {button ? (
                <a href="https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FSkillz4Killz%2Fslash-manager&env=APPLICATION_ID,BOT_TOKEN,SECRET_CODE">
                  <Button name="holder" type="holder">
                    {t(button)}
                  </Button>
                </a>
              ) : (
                ""
              )}
            </Col>
          </S.ContentWrapper>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(MiddleBlock);
