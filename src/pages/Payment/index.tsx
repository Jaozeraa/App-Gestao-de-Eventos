import { useNavigation, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { format } from 'date-fns';
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import formatValue from '../../utils/formatValue';
import { ITicket } from '../Details';
import { IEvent } from '../Events';

import {
  Container,
  Header,
  HeaderTitle,
  EventContainer,
  EventImage,
  EventData,
  EventType,
  EventName,
  EventFooter,
  EventDate,
  EventDateInfo,
  Form,
  DoubleInputView,
  PriceContainer,
  PriceRow,
  PriceInfo,
  TotalPriceRow,
  TotalPriceInfo,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import InputMask from '../../components/InputMask';

interface RouteParams {
  ticket: ITicket;
  event: IEvent;
}

interface PaymentFormData {
  number: string;
  expiration_date: string;
  cvv: string;
}

const Payment: React.FC = () => {
  const route = useRoute();
  const formRef = useRef<FormHandles>(null);
  const { reset } = useNavigation();
  const params = route.params as RouteParams;
  const { ticket, event } = params;
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: PaymentFormData) => {
      try {
        setButtonIsLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          number: Yup.string().required('Número do cartão é obrigatório'),
          expiration_date: Yup.string().required(
            'Data de validade é obrigatória',
          ),
          cvv: Yup.string()
            .required('CVV é obrigatório')
            .min(3, 'CVV inválido'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post(`/userTickets/${ticket.id}`);

        reset({
          routes: [{ name: 'Success', params: { event } }],
          index: 0,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na compra de ingressos',
          'Ocorreu um erro ao realizar sua compra. Tente novamente',
        );
      } finally {
        setButtonIsLoading(false);
      }
    },
    [reset],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            <Header>
              <HeaderTitle>Bora confirmar sua presença =)</HeaderTitle>
            </Header>
            <EventContainer>
              <EventImage source={{ uri: event.promo_image_url }} />
              <EventData>
                <EventType>{event.type}</EventType>
                <EventName>{event.name}</EventName>
                <EventFooter>
                  <EventDate>
                    <EventDateInfo>{event.state_city}</EventDateInfo>
                    <EventDateInfo style={{ marginTop: 4 }}>
                      {format(new Date(event.date), 'dd/MM - HH:mm')}
                    </EventDateInfo>
                  </EventDate>
                </EventFooter>
              </EventData>
            </EventContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputMask
                type={'credit-card'}
                label="Número do cartão"
                name="number"
                placeholder="Digite o número"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={19}
              />
              <DoubleInputView>
                <InputMask
                  type={'custom'}
                  options={{
                    mask: '99/9999',
                  }}
                  label="Data de validade"
                  name="expiration_date"
                  placeholder="Digite a data"
                  autoCorrect={false}
                  maxLength={7}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  containerStyle={{ flex: 1, marginRight: 8 }}
                />
                <Input
                  label="CVV"
                  name="cvv"
                  placeholder="Digite o código"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  maxLength={3}
                  containerStyle={{ flex: 1, marginLeft: 8 }}
                />
              </DoubleInputView>
            </Form>
            <PriceContainer>
              <PriceRow>
                <PriceInfo>{ticket.info}</PriceInfo>
                <PriceInfo>{formatValue(ticket.price)}</PriceInfo>
              </PriceRow>
              <PriceRow>
                <PriceInfo>Desconto</PriceInfo>
                <PriceInfo>R$ 00,00</PriceInfo>
              </PriceRow>
              <TotalPriceRow>
                <TotalPriceInfo>Total</TotalPriceInfo>
                <TotalPriceInfo>{formatValue(ticket.price)}</TotalPriceInfo>
              </TotalPriceRow>
            </PriceContainer>
            <Button
              enabled={!buttonIsLoading}
              onPress={() => formRef.current?.submitForm()}
            >
              Finalizar
            </Button>
          </Container>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Payment;
