import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ContainerWrapper, ButtonWrapper, ButtonText } from './styles';

interface ButtonProps extends RectButtonProps {
  children: string;
  enabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  enabled = true,
  ...rest
}) => {
  return (
    <ContainerWrapper>
      <ButtonWrapper enabled={enabled} {...rest}>
        <ButtonText>{children}</ButtonText>
      </ButtonWrapper>
    </ContainerWrapper>
  );
};

export default Button;
