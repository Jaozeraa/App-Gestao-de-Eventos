import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import api from '../../services/api';
import * as ImagePicker from 'react-native-image-picker';
import avatarImg from '../../assets/avatar.png';

import {
  Container,
  UserAvatarButton,
  UserAvatar,
  Form,
  ExitButton,
} from './styles';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          Alert.alert('Erro ao atualizar seu avatar.');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.assets[0].uri,
        });

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
        });
      },
    );
  }, [user.id, updateUser]);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string | any[]) => !!val.length,
            then: Yup.string()
              .min(6, 'No mínimo 6 dígitos')
              .required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string | any[]) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um error ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation, updateUser],
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
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar
                source={{
                  uri: user.avatar_url || avatarImg,
                }}
              />
            </UserAvatarButton>

            <Form
              initialData={{ name: user.name, email: user.email }}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Input
                autoCapitalize="words"
                name="name"
                label="Nome"
                placeholder="Nome"
              />

              <Input
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                label="E-mail"
                placeholder="E-mail"
                containerStyle={{ marginTop: 16 }}
              />

              <Input
                secureTextEntry
                name="old_password"
                label="Senha atual"
                placeholder="Senha atual"
                textContentType="newPassword"
                containerStyle={{ marginTop: 32 }}
              />
              <Input
                secureTextEntry
                name="password"
                label="Nova senha"
                placeholder="Nova senha"
                textContentType="newPassword"
                containerStyle={{ marginTop: 16 }}
              />
              <Input
                secureTextEntry
                label="Confirmar senha"
                name="password_confirmation"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                containerStyle={{ marginTop: 16 }}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
              <ExitButton onPress={signOut}>Deslogar do app</ExitButton>
            </Form>
          </Container>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
