import React, { useRef, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useField } from '@unform/core';
import { TextInputMaskProps } from 'react-native-masked-text';

import { Container, InputLabel, TextInput, ErrorMessage } from './styles';

interface InputProps extends TextInputMaskProps {
  name: string;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface InputValueReference {
  value: string;
}

const InputMask: React.FC<InputProps> = ({
  label,
  name,
  containerStyle,
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);
  const [textValue, setTextValue] = useState('');
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
        value={textValue}
        onChangeText={(text: string) => {
          inputValueRef.current.value = text;
          setTextValue(text);
        }}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default InputMask;
