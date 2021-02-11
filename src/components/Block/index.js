import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import * as S from "./styles";

const Block = ({ title, texts, t }) => {
  return (
    <S.Container>
      <Fade left>
        <h6>{t(title)}</h6>
        <S.TextWrapper>
          {texts?.map((text, index) => (
            <p key={index}>{t(text)}</p>
          ))}
        </S.TextWrapper>
      </Fade>
    </S.Container>
  );
};

export default withTranslation()(Block);
