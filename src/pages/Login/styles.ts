import styled from 'styled-components/native';
import { Form as UnformForm } from '@unform/mobile';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
`;

export const TitleView = styled.View`
  align-items: flex-start;
  margin-top: 56px;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.theme.g1};
  align-self: flex-start;
  text-align: left;
`;

export const Form = styled(UnformForm)`
  width: 100%;
  margin-top: 24px;
`;

export const CreateAccountButton = styled(TouchableOpacity)`
  border: 0;
  margin-top: 24px;
`;

export const CreateAccountText = styled.Text`
  color: ${props => props.theme.red};
  font-family: 'Inter-Medium';
  font-size: 18px;
  line-height: 22px;
`;
