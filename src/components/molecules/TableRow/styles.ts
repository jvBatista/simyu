import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

interface TableCell {
  index: number;
}

export const LabelContainer = styled.View<TableCell>`
  width: 75%;
  padding: 16px 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, index }) => index % 2 == 0 ? '' : theme.colors.ayu_500};
`;

export const ValueContainer = styled.View<TableCell>`
  width: 25%;
  padding: 16px 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, index }) => index % 2 == 0 ? theme.colors.ayu_500 : ''};
`;