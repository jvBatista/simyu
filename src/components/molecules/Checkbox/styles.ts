import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
`;

interface Checkbox {
  checked: boolean;
}

export const Box = styled.TouchableOpacity<Checkbox>`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ theme, checked }) => checked ? theme.colors.cyan : theme.colors.white};
  background-color: ${({ theme, checked }) => checked ? theme.colors.cyan : 'transparent'};
`;

export const Label = styled.Text`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme }) => theme.colors.cyan}
`;