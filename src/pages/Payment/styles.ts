import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Form as UnformForm } from '@unform/mobile';

export const Container = styled.View`
  padding: 0 24px;
`;

export const Header = styled.View`
  margin-bottom: 24px; ;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.theme.g1};
  width: 204px;
`;

export const EventContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.g3};
`;

export const EventImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const EventData = styled.View``;

export const EventType = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 12px;
  color: ${props => props.theme.red_dark};
`;

export const EventName = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 16px;
  color: ${props => props.theme.g1};
  margin-top: 2px;
`;

export const EventFooter = styled.View`
  margin-top: 8px;
  flex-direction: row;
`;

export const EventDate = styled.View`
  margin-right: 16px;
`;

export const EventDateInfo = styled.Text`
  font-family: 'Inter-Medium';
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.g2};
`;

export const EventButton = styled(RectButton)`
  border-radius: 8px;
  background: ${props => props.theme.red};
  height: 36px;
  width: 124px;
  align-items: center;
  justify-content: center;
`;

export const EventButtonText = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: ${props => props.theme.g5};
`;

export const Form = styled(UnformForm)`
  width: 100%;
  margin-top: 24px;
`;

export const DoubleInputView = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const PriceContainer = styled.View`
  margin-top: 32px;
`;

export const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const PriceInfo = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.g2};
`;

export const TotalPriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-color: ${props => props.theme.g3};
  border-top-width: 2px;
`;

export const TotalPriceInfo = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.g1};
`;
