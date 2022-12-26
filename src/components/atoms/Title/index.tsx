import React from 'react';
import {
  Text
} from './styles';

interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return (
    <Text>{text}</Text>
  );
};