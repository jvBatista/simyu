import styled from 'styled-components/native';

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const CenteredRow = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export const CardContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
`;

export const SliderContainer = styled.View`
  align-items: center;
  justify-content: center;
`;