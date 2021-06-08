import React, { useRef, useCallback, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  Container,
  TitleView,
  Title,
  Form,
  CreateAccountButton,
  CreateAccountText,
} from './styles';

import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface LogInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const { logIn } = useAuth();
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: LogInFormData) => {
      try {
        setButtonIsLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await logIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        setButtonIsLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [logIn],
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
        <Container>
          <Image source={logoImg} />
          <TitleView>
            <Title>Faça seu login</Title>
          </TitleView>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              label="E-mail"
              name="email"
              placeholder="Digite seu e-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Input
              label="Senha"
              name="password"
              placeholder="Digite sua senha"
              containerStyle={{ marginTop: 16 }}
              secureTextEntry
            />

            <Button
              enabled={!buttonIsLoading}
              onPress={() => formRef.current?.submitForm()}
            >
              Entrar
            </Button>
          </Form>
          <CreateAccountButton onPress={() => navigate('SignUp')}>
            <CreateAccountText>Criar uma conta</CreateAccountText>
          </CreateAccountButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
