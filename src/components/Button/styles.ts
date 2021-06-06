import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ContainerWrapper = styled.View`
  margin-top: 32px;
`;

export const ButtonWrapper = styled(RectButton)`
  height: 50px;
  width: 100%;
  border-radius: 8px;
  background: ${props => props.theme.red};
  border: 0;
  align-items: center;
  justify-content: center;
  opacity: 0.5;

  ${props =>
    props.enabled &&
    css`
      opacity: 1;
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: ${props => props.theme.g5};
`;
