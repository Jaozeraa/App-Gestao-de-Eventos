import React from 'react';
import { SafeAreaView } from 'react-native';

import {
  Container,
  SuccessImage,
  Title,
  Description,
  OkButton,
} from './styles';
import ticketImg from '../../assets/success_ticket.png';
import { IEvent } from '../Events';
import { useNavigation, useRoute } from '@react-navigation/native';

interface RouteParams {
  event: IEvent;
}

const Success: React.FC = () => {
  const route = useRoute();
  const params = route.params as RouteParams;
  const { reset } = useNavigation();
  const { event } = params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <SuccessImage source={ticketImg} />
        <Title>Presença confirmada!</Title>
        <Description>
          {`${event.type} - ${event.name}, ${event.formattedDate}`}
        </Description>
        <OkButton
          onPress={() =>
            reset({
              routes: [{ name: 'Events' }],
              index: 0,
            })
          }
        >
          Entendido
        </OkButton>
      </Container>
    </SafeAreaView>
  );
};

export default Success;
