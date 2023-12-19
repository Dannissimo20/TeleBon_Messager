import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { reports } from './analytics.data';
import { Container, Info, Line, ListA, ListAnalyticsContent, Progress, WrapperAnalyticsContent } from './Analytics.styled';

import { FlexContainer } from '../../../utils/styleUtils';
import SvgCircleAnimation from '../../../utils/SvgCircleAnimation';

const AnalyticsContent: FC = () => {
  const { t } = useTranslation();

  return (
    <FlexContainer>
      <WrapperAnalyticsContent>
        {reports.length > 0 ? (
          <ListAnalyticsContent>
            {reports.map((report, i) => {
              const normalizedValue = (Number(report.value) / 70).toFixed(2);

              return (
                <li key={i}>
                  <h3 className='subtitle'>{t(report.name)}</h3>
                  <Container className='progress'>
                    <Line>
                      <Progress
                        backgroundcolor={report.background}
                        $width={normalizedValue}
                      />
                    </Line>
                    <Info>
                      <span>{report.value}</span>
                      <span>7000</span>
                    </Info>
                  </Container>
                </li>
              );
            })}
          </ListAnalyticsContent>
        ) : (
          <div>{t('Нет ни одного субпродукта')}</div>
        )}
      </WrapperAnalyticsContent>
      <ListA>
        <li>
          <h3 className='subtitle'>{t('Индекс качества')}</h3>
          <SvgCircleAnimation number={7.5} />
        </li>
        <li>
          <h3 className='subtitle'>{t('Результат')}</h3>
          <SvgCircleAnimation number={9.2} />
        </li>
      </ListA>
    </FlexContainer>
  );
};

export default AnalyticsContent;
