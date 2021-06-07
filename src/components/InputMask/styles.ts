import { TextInputMask } from 'react-native-masked-text';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const InputLabel = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 8px;
`;

interface TextInputProps {
  hasError: boolean;
}

export const TextInput = styled(TextInputMask)<TextInputProps>`
  height: 50px;
  width: 100%;
  color: ${props => props.theme.g1};
  background: ${props => props.theme.g3};
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.g3};
  font-family: 'Inter-Regular';
  font-size: 14px;
  line-height: 17px;

  ${props =>
    props.hasError &&
    css`
      border-color: ${props => props.theme.red_dark};
    `}
`;

export const ErrorMessage = styled.Text`
  color: ${props => props.theme.red_dark};
  font-family: 'Inter-Regular';
  font-size: 14px;
  line-height: 17px;
  margin-top: 8px;
`;
