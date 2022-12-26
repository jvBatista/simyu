import React from 'react';
import { TableRow } from '../../molecules/TableRow';
import {
  Container,
} from './styles';

interface TableProps {
  data: {
    label: string,
    value: string
  }[]
}

export const Table = ({ data }: TableProps) => {
  return (
    <Container>
      {
        data.map((item, index)=> <TableRow key={index} item={{label: item.label, value: item.value}} index={index} />)
      }
    </Container>
  );
};