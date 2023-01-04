import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom-width: 1px;
  padding-bottom: 4px;
  border-color: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

interface RowContent {
  opened: boolean;
}

export const Content = styled.View<RowContent>`
  width: 100%;
  padding-bottom: 4px;
  padding-top: 16px;
  display: ${({ opened }) => opened ? 'flex' : 'none'};
`;

export const IconContainer = styled.View<RowContent>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({opened})=> opened ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: 100ms;
`;
