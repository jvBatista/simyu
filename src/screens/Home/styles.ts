import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 36px;
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${({ theme }) => theme.colors.ayu_900};
    gap: 20px;
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
`;
