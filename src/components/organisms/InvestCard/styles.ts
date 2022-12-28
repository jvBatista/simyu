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
  align-items: flex-end;
  justify-content: space-between;
`;

export const CenteredRow = styled.View`
  width: 100%;
  justify-content: center;
  padding-top: 8px;
`;

interface ArrowButton {
  rotate: boolean;
}

export const Button = styled.TouchableOpacity<ArrowButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ rotate }) => rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: 100ms;
`;

export const DetailsContainer = styled.View`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 8px;
`;

export const RadioContainer = styled.View`
    width: 100%;
    flex-direction: row;
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
