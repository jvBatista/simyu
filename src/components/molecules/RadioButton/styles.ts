import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-right: 36px;
`;

interface RadioButton {
  checked: boolean;
}

export const Button = styled.TouchableOpacity<RadioButton>`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({ theme, checked }) => checked ? theme.colors.cyan : theme.colors.white};
`;
