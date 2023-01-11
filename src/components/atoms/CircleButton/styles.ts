import styled from 'styled-components/native';

interface ButtonVariants {
  variant: "default" | "secondary"
}

export const Container = styled.TouchableOpacity<ButtonVariants>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: ${({ theme, variant }) => variant === "default" ? theme.colors.orange : 'transparent'};
  border-width: ${({ variant }) => variant === "default" ? '0px' : '1px'};
  border-color: ${({ theme, variant }) => variant === "default" ? 'transparent' : theme.colors.white};
`;
