import React, { useEffect, useState } from 'react';
import { InvestProps } from '../../../screens/Comparison';
import { taxLabels } from '../../../utils/labels';
import { ArrowDown, InvestIcon, TrashIcon } from '../../atoms/Icons/Icons';
import { RegularInput } from '../../atoms/RegularInput';
import { RegularText } from '../../atoms/RegularText';
import { Checkbox } from '../../molecules/Checkbox';
import { RadioButton } from '../../molecules/RadioButton';
import { InputSection } from '../InputSection';
import {
  ArrowButton,
  Button,
  CenteredRow,
  CheckboxContainer,
  Container,
  DetailsContainer,
  OptionsInputContainer,
  RadioContainer,
  Row,
} from './styles';

interface InvestCardProps {
  id: number,
  updateData: (id: number, data: InvestProps) => void,
  deleteInvest: (id: number) => void,
  initialValue: number,
  monthlyAdd: number
}

export const InvestCard = ({
  id,
  updateData,
  deleteInvest,
  initialValue,
  monthlyAdd
}: InvestCardProps) => {
  const [name, setName] = useState(`Investimento ${id + 1}`);
  const [incomeRate, setIncomeRate] = useState(100);
  const [rateType, setRateType] = useState<'cdi' | 'aa' | 'am'>('cdi');
  const [applyIR, setApplyIR] = useState(true);
  const [applyIOF, setApplyIOF] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    updateData(id, {
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


  return (
    <Container>
      {
        opened ? (
          <Row>
            <RegularInput value={name} setValue={setName} />

            <Button onPress={() => deleteInvest(id)} style={{ paddingLeft: 24 }}>
              <TrashIcon red/>
            </Button>
          </Row>
        ) : (
          <Row>
            <RegularText
              size='larger'
              weight='semibold'
              variant={id % 2 == 0 ? 'cyan' : 'orange'}
            >
              {name}
            </RegularText>

            <InvestIcon id={id} />
          </Row>
        )
      }


      {opened &&
        <DetailsContainer>
          <OptionsInputContainer>
            <RadioContainer>
              <RadioButton
                label="CDI"
                buttonFunction={() => setRateType('cdi')}
                checked={rateType == 'cdi'} />
              <RadioButton
                label="% a.a"
                buttonFunction={() => setRateType('aa')}
                checked={rateType == 'aa'} />
              <RadioButton
                label="% a.m"
                buttonFunction={() => setRateType('am')}
                checked={rateType == 'am'} />
            </RadioContainer>

            <InputSection
              type={'labeled'}
              label={'com taxa de'}
              labeledText={taxLabels[rateType]}
              changeUnit={1}
              maxValue={1000}
              value={incomeRate}
              setValue={setIncomeRate}
              includesDecimals
            />
          </OptionsInputContainer>

          <CheckboxContainer>
            <Checkbox
              checked={applyIR}
              label={'aplicar imposto de renda'}
              buttonFunction={() => setApplyIR(!applyIR)} />
            <Checkbox
              checked={applyIOF}
              label={'aplicar IOF'}
              buttonFunction={() => setApplyIOF(!applyIOF)} />
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