import styled from 'styled-components/native';

export const Text = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.colors.orange};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 24px;
  line-height: 28px;
`;