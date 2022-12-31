import styled from 'styled-components/native';

interface TabButton {
  selected: boolean
}

export const Container = styled.TouchableOpacity<TabButton>`
  border-top-width: 2px;
  border-top-color: ${({ theme, selected }) => selected ? theme.colors.orange : theme.colors.ayu_900};
`;

export const CustomText = styled.Text`
  width: 100%;
`;