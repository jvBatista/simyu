import React, { useEffect, useState } from 'react';
import { RegularText } from '../../components/atoms/RegularText';
import { Title } from '../../components/atoms/Title';
import { ContentRow } from '../../components/molecules/ContentRow';
import { TableRow } from '../../components/molecules/TableRow';
import { SingleColumn } from '../../components/templates/SingleColumn';
import { IRLabels } from '../../utils/labels';
import { IOF, IR } from '../../utils/taxes';
import { Row } from './styles';

export const Info = () => {

  const IRData = IR.map((element, index) => (
    {
      label: IRLabels[index],
      tax: element.tax
    }
  ));

  return (
    <SingleColumn>
      <Title text="consulte as taxas atuais" />

      <ContentRow title={'CDI'}>
        <Row>
          <RegularText size='giant' variant='cyan' weight='semibold' spaced>
            13.65%
          </RegularText>
          <RegularText weight='medium'>
            1.07%
          </RegularText>
        </Row>
      </ContentRow>

      <ContentRow title="Tabela IR">
        {
          IRData.map((item, index) => (
            <TableRow
              item={{ label: item.label, value: `${item.tax}%` }}
              index={index}
              key={index}
            />
          ))
        }
      </ContentRow>

      <ContentRow title="Tabela IOF">
        {
          IOF.map((item, index) => (
            <TableRow
              item={{ label: `dia ${item.day.toString().padStart(2, "0")}`, value: `${item.tax}%` }}
              index={index}
              key={index}
            />
          ))
        }
      </ContentRow>
    </SingleColumn>
  );
}