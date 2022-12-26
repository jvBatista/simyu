import React from 'react';
import {
  Text
} from './styles';

interface RegularTextProps {
  children: React.ReactNode,
  size?: 'default' | 'smaller' | 'larger' | 'giant';
  variant?: 'white' | 'cyan' | 'green' | 'red' | 'orange';
  weight?: 'regular' | 'medium' | 'semibold';
  spaced?: boolean;
}

export const RegularText = ({
  children,
  size = 'default',
  variant = 'white',
  weight = 'regular',
  spaced = false,
}: RegularTextProps) => {

  const fontSizes = {
    default: { size: '18px', height: '20px' },
    smaller: { size: '16px', height: '18px' },
    larger: { size: '20px', height: '20px' },
    giant: { size: '28px', height: '30px' },
  }

  return (
    <Text
      size={fontSizes[size]}
      variant={variant}
      weight={weight}
      spaced
    >
      {children}
    </Text>
  );
};