import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  padding: 0 24px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const SuccessImage = styled.Image`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: ${props => props.theme.g1};
  margin-bottom: 8px; ;
`;

export const Description = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${props => props.theme.g2};
  width: 240px;
`;

export const OkButton = styled(Button)`
  width: 332px;
`;
