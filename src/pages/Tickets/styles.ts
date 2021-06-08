import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { IUserTicket } from '.';

export const Container = styled.View`
  margin: 0 24px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.theme.g1};
  margin-bottom: 8px;
`;

export const TicketsList = styled(
  FlatList as new () => FlatList<IUserTicket>,
)``;

export const TicketContainer = styled.View`
  border-radius: 8px;
  border: 2px solid ${props => props.theme.g3};
  padding: 16px;
  margin-top: 16px;
`;

export const EventContainer = styled.View`
  flex-direction: row;
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
  text-transform: uppercase;
`;

export const EventName = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 16px;
  color: ${props => props.theme.g1};
  margin-top: 2px;
  width: 100%;
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

export const QrCodeContainer = styled.View`
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;
