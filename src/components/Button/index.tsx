import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ContainerWrapper, ButtonWrapper, ButtonText } from './styles';

interface ButtonProps extends RectButtonProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <ContainerWrapper>
      <ButtonWrapper {...rest}>
        <ButtonText>{children}</ButtonText>
      </ButtonWrapper>
    </ContainerWrapper>
  );
};

export default Button;
