import { withTranslation } from "react-i18next";

import * as S from "./styles";

const Input = ({ id, name, placeholder, onChange, t, type, value, onFocus }) => (
  <S.Container>
    <label htmlFor={name}>{t(id)}</label>
    <S.Input
      spellcheck="false"
      placeholder={t(placeholder)}
      name={name}
      id={name}
      onChange={onChange}
      type={type}
      value={value}
      onFocus={onFocus}
    />
  </S.Container>
);

export default withTranslation()(Input);
