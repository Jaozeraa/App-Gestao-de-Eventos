import React, {
  useState,
  useRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from 'react';
import { TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { useField } from '@unform/core';

import { Container, InputLabel, TextInput, ErrorMessage } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  containerStyle,
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    inputElementRef.current.setNativeProps({
      style: { fontFamily: 'Inter-Regular' },
    });
  }, []);

  return (
    <Container style={containerStyle}>
      <InputLabel>{label}</InputLabel>
      <TextInput
        {...rest}
        ref={inputElementRef}
        placeholderTextColor="#676360"
        defaultValue={defaultValue}
        autoCorrect={false}
        hasError={!!error}
        onChangeText={(text: string) => {
          inputValueRef.current.value = text;
        }}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Input;
