import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.ayu_500};
  padding: 16px 24px;
  padding-bottom: 8px;
`;

export const Row = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CenteredRow = styled.View`
  width: 100%;
  justify-content: center;
  padding-top: 8px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  transition: 100ms;
`;

interface ArrowButton {
  rotate: boolean;
}

export const ArrowButton = styled.TouchableOpacity<ArrowButton>`
  align-items: center;
  justify-content: center;
  transition: 100ms;
  transform: ${({ rotate }) => rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const DetailsContainer = styled.View`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 8px;
`;

export const OptionsInputContainer = styled.View`
`;

export const CheckboxContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    padding-top: 24px;
`;
