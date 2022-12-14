import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 24px;
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${({ theme }) => theme.colors.ayu_900};
    position: relative;
`;

interface Child {
    isLast: boolean
}

export const ChildContainer = styled.View<Child>`
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    padding-bottom: ${({ isLast }) => isLast ? '24px' : '32px'};
`;

export const ScrollArea = styled.ScrollView`
    width: 100%;
`;

