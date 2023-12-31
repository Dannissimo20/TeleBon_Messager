import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { headData } from './analytics.data';
import { Box, ButtonContent, List, NavMenuItem, NavMenuWrapper, PageHeader, Title, Wrapper } from './Analytics.styled';

import { EIcons, Icon as IconInstance } from '../../../components/icons';
import CommonButton from '../../../components/shared/button/CommonButton';

const AnalyticsTopbar: FC = () => {
  const { t } = useTranslation();
  const { analyticsId } = useParams();

  return (
    <>
      <Wrapper>
        <PageHeader>
          <Title>
            <IconInstance name={EIcons.analytics} />
            {t('Аналитика')}
          </Title>
          <Box>
            <CommonButton>
              <ButtonContent>
                <IconInstance name={EIcons.report} />
                <span>{t('Сформировать отчет')}</span>
              </ButtonContent>
            </CommonButton>
            <CommonButton>
              <ButtonContent>
                <IconInstance name={EIcons.calendar} />
                <span>{t('День')}</span>
                <span>{t('Неделя')}</span>
                <span>{t('Месяц')}</span>
              </ButtonContent>
            </CommonButton>
          </Box>
        </PageHeader>
      </Wrapper>
      <NavMenuWrapper>
        <List>
          {headData.map((item: { name: string; to: string }) => (
            <NavMenuItem
              key={item.to}
              className={analyticsId === item.to ? 'active' : ''}
            >
              <NavLink to={`/analytics/${item.to}`}>{t(item.name)}</NavLink>
            </NavMenuItem>
          ))}
        </List>
      </NavMenuWrapper>
    </>
  );
};

export default AnalyticsTopbar;
