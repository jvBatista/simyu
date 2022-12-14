import styled from "styled-components/native";

export const Container = styled.View`
    max-width: 85%;
    flex-grow: 1;
    padding-bottom: 4px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.white};
`;

export const Input = styled.TextInput`
    flex-grow: 1;
    color: white;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
