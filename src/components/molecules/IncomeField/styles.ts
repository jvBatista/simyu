import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.ayu_500};
  padding: 24px;
  padding-top: 8px;
`;

export const InfoRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  padding: 8px 0px;
`;

export const Line = styled.View`
  width: 100%;
  border-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  margin: 8px 0px;
`;

export const CenteredRow = styled(InfoRow)`
  justify-content: center;
  padding-top: 4px;
  padding-bottom: 16px;
`;

interface ArrowButton {
  rotate: boolean;
}

export const Button = styled.TouchableOpacity<ArrowButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({rotate})=> rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: 100ms;
`;

interface Details {
  opened: boolean;
}

export const DetailsContainer = styled.View<Details>`
  width: 100%;
  padding-top: 16px;
  display: ${({ opened }) => opened ? 'flex' : 'none'};
`;