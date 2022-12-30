import React from 'react';
import { ActivityIndicator } from 'react-native';
import { CenteredColumn } from '../../components/templates/CenteredColumn';

export const Loading = () => {
  return (
    <CenteredColumn>
      <ActivityIndicator size="large" color="#FF8205" />
    </CenteredColumn >
  );
};