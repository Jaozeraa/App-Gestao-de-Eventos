import styled from 'styled-components/native';
import { Form as UnformForm } from '@unform/mobile';
import Button from '../../components/Button';

export const Container = styled.View`
  padding: 0 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 8px;
  align-self: center;
  margin-bottom: 24px;
`;

export const Form = styled(UnformForm)``;

export const ExitButton = styled(Button)`
  background: ${props => props.theme.red_dark};
  margin-top: -8px;
`;
