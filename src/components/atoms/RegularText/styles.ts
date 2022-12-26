import styled from 'styled-components/native';

interface TextVariants {
  size: { size: string, height: string };
  variant: 'white' | 'cyan' | 'green' | 'red' | 'orange';
  weight: 'regular' | 'medium' | 'semibold';
  spaced: boolean;
}

export const Text = styled.Text<TextVariants>`
  color: ${({ theme, variant }) => theme.colors[variant]};
  font-family: ${({ theme, weight }) => theme.fonts[weight]};
  font-size: ${({ size }) => size.size};
  line-height: ${({ size }) => size.height};
`;