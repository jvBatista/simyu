import styled from "styled-components/native";

export const Container = styled.View`
    flex-grow: 1;
`;

export const Input = styled.TextInput`
    width: 100%;
    padding-bottom: 4px;
    color: white;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.white};
`;
