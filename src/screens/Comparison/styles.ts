import styled from 'styled-components/native';


export const CenteredRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface CardContainer {
  cardIndex: number
}

export const CardContainer = styled.View<CardContainer>`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: ${({ cardIndex }) => cardIndex ? '24px' : '0px'};
`;

export const RadioContainer = styled.View`
    width: 100%;
    flex-direction: row;
    padding-bottom: 8px;
`;

export const OptionsInputContainer = styled.View`
`;