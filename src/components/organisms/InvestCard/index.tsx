import React, { useEffect, useState } from 'react';
import { InvestProps } from '../../../screens/Comparison';
import { taxLabels } from '../../../utils/labels';
import { ArrowDown, InvestIcon, TrashIcon } from '../../atoms/Icons/Icons';
import { RegularInput } from '../../atoms/RegularInput';
import { RegularText } from '../../atoms/RegularText';
import { Checkbox } from '../../molecules/Checkbox';
import { InputSection } from '../InputSection';
import { OptionsRow } from '../OptionsRow';
import {
  ArrowButton,
  Button,
  CenteredRow,
  CheckboxContainer,
  Container,
  DetailsContainer,
  OptionsInputContainer,
  Row,
} from './styles';

interface InvestCardProps {
  id: string,
  updateData: (index: number, data: InvestProps) => void,
  deleteInvest: (id: string) => void,
  initialValue: number,
  monthlyAdd: number,
  index: number
}

export const InvestCard = ({
  id,
  updateData,
  deleteInvest,
  initialValue,
  monthlyAdd,
  index
}: InvestCardProps) => {
  const [name, setName] = useState(`Investimento ${index + 1}`);
  const [incomeRate, setIncomeRate] = useState(100);
  const [rateType, setRateType] = useState<'cdi' | 'aa' | 'am'>('cdi');
  const [applyIR, setApplyIR] = useState(true);
  const [applyIOF, setApplyIOF] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    updateData(index, {
      id,
      name,
      incomeRate,
      rateType,
      applyIOF,
      applyIR
    });
  }, [
    name,
    incomeRate,
    rateType,
    applyIOF,
    applyIR,
    initialValue,
    monthlyAdd
  ]);

  const rateTypes = [
    { label: 'CDI', value: 'cdi' },
    { label: '% a.a', value: 'aa' },
    { label: '% a.m', value: 'am' },
  ];


  return (
    <Container>
      {
        opened ? (
          <Row>
            <RegularInput defaultValue={name} updateValue={setName} />

            <Button onPress={() => deleteInvest(id)} style={{ paddingLeft: 24 }}>
              <TrashIcon red />
            </Button>
          </Row>
        ) : (
          <Row>
            <RegularText
              size='larger'
              weight='semibold'
              variant={index % 2 == 0 ? 'cyan' : 'orange'}
            >
              {name}
            </RegularText>

            <InvestIcon id={index} />
          </Row>
        )
      }


      {opened &&
        <DetailsContainer>
          <OptionsInputContainer>
            <OptionsRow options={rateTypes} updateValue={(value) => {
              if (value == 'cdi' || value == 'aa' || value == 'am') setRateType(value)
            }}
            />

            <InputSection
              type={'labeled'}
              label={'com taxa de'}
              labeledText={taxLabels[rateType]}
              changeUnit={1}
              maxValue={1000}
              defaultValue={incomeRate}
              updateValue={setIncomeRate}
              includesDecimals
            />
          </OptionsInputContainer>

          <CheckboxContainer>
            <Checkbox
              label={'aplicar imposto de renda'}
              updateValue={setApplyIR} />
            <Checkbox
              label={'aplicar IOF'}
              updateValue={setApplyIOF} />
          </CheckboxContainer>
        </DetailsContainer>
      }

      <CenteredRow>
        <ArrowButton onPress={() => setOpened(!opened)} rotate={opened}>
          <ArrowDown width={16} />
        </ArrowButton>
      </CenteredRow>
    </Container >
  );
};