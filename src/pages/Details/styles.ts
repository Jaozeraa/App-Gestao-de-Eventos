import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

import { ITicket } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const PromoImage = styled.Image`
  width: 100%;
  height: 375px;
`;

export const EventDetailsContainer = styled.View`
  border-radius: 8px;
  background: ${props => props.theme.g5};
  flex: 1;
  margin-top: -24px;
`;

export const EventBasicData = styled.View`
  padding: 24px;
`;

export const EventName = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.g1};
`;

export const EventDateContainer = styled.View`
  margin-top: 16px;
  flex-direction: row;
`;

export const EventDateContent = styled.View`
  margin-left: 8px;
`;

export const EventCity = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.g1};
  margin-bottom: 8px;
`;

export const EventAddress = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.g2};
`;

export const EventDate = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.g1};
  margin-top: 8px;
`;

export const EventPriceContainer = styled.View`
  width: 100%;
  padding: 16px 24px;
  background: ${props => props.theme.g4};
`;

export const EventPriceLabel = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.g2};
`;

export const EventPrice = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 24px;
  line-height: 29px;
  color: ${props => props.theme.g1};
  margin-top: 8px;
`;

export const EventTickets = styled(FlatList as new () => FlatList<ITicket>)`
  padding: 24px 24px 24px 8px;
`;

interface TicketContainerProps {
  selected: boolean;
}

export const TicketContainer = styled(RectButton)<TicketContainerProps>`
  position: relative;
  margin-left: 16px;
  opacity: 0.5;

  ${props =>
    props.selected &&
    css`
      opacity: 1;
    `}
`;

export const TicketImage = styled.Image``;

export const TicketContent = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
`;

export const TicketInfo = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.g2};
  margin-bottom: 24px;
`;

export const TicketPrice = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.g1};
`;

export const EventAnotherData = styled.View`
  padding: 0 24px 32px 24px;
`;

export const EventDescription = styled.Text`
  font-family: 'Inter-Medium';
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.g2};
`;

export const QrCodeContainer = styled.View`
  margin-top: 24px;
  align-items: center;
  justify-content: center;
`;
