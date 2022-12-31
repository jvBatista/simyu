import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-top: 36px;
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${({ theme }) => theme.colors.ayu_900};
    position: relative;
`;

export const ChildContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    padding-bottom: 32px;
`;

export const ScrollArea = styled.ScrollView`
    width: 100%;
`;

