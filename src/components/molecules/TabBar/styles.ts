import styled from 'styled-components/native';

interface Tab {
  isFocused: boolean
}

export const Container = styled.View<Tab>`
  flex: 1;
  padding: 16px 0px;
  align-items: center;
  border-top-width: 2px;
  border-top-color: ${({ theme, isFocused }) => isFocused ? theme.colors.orange : theme.colors.ayu_900};
  background-color: ${({ theme }) => theme.colors.ayu_900};
`;