import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IEvent } from '.';

export const Container = styled.View`
  padding: 0 24px;
`;

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const WelcomeView = styled.View`
  flex-direction: column;
`;

export const WelcomeText = styled.Text`
  font-family: 'Inter-Medium';
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: ${props => props.theme.g2};
`;

export const UserNameText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.theme.red};
  margin-top: 2px;
`;

export const UserProfile = styled.TouchableOpacity`
  border-radius: 8px;
  width: 56px;
  height: 56px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  line-height: 28px;
`;

export const EventsList = styled(FlatList as new () => FlatList<IEvent>)`
  padding-top: 24px;
`;

export const EventContainer = styled.View`
  padding: 16px;
  margin-top: 24px;
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
