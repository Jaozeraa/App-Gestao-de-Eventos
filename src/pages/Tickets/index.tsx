import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import api from '../../services/api';
import { ITicket } from '../Details';
import { IEvent } from '../Events';
import { useFocusEffect } from '@react-navigation/native';

import {
  Container,
  HeaderTitle,
  TicketsList,
  TicketContainer,
  EventContainer,
  EventImage,
  EventData,
  EventType,
  EventName,
  EventFooter,
  EventDate,
  EventDateInfo,
  QrCodeContainer,
} from './styles';

export interface IUserTicket extends ITicket {
  event: IEvent;
}

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<IUserTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await api.get<IUserTicket[]>('userTickets');
        setTickets(response.data);
        setIsLoading(false);
      })();
    }, []),
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <ActivityIndicator size="large" color="#E13352" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <HeaderTitle>Seus ingressos</HeaderTitle>
        <TicketsList
          data={tickets}
          keyExtractor={ticket => ticket.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{ marginBottom: 24, height: '100%' }}
          renderItem={({ item: ticket }) => (
            <TicketContainer>
              <EventContainer>
                <EventImage source={{ uri: ticket.event.promo_image_url }} />
                <EventData>
                  <EventType>{ticket.event.type}</EventType>
                  <EventName>{ticket.event.name}</EventName>
                  <EventFooter>
                    <EventDate>
                      <EventDateInfo>{ticket.event.state_city}</EventDateInfo>
                      <EventDateInfo style={{ marginTop: 4 }}>
                        {format(new Date(ticket.event.date), 'dd/MM - HH:mm')}
                      </EventDateInfo>
                    </EventDate>
                  </EventFooter>
                </EventData>
              </EventContainer>
              <QrCodeContainer>
                <QRCode size={200} value={ticket.id} />
              </QrCodeContainer>
            </TicketContainer>
          )}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Tickets;
