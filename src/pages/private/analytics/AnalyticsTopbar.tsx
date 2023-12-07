import React, { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { EIcons, Icon as IconInstance } from '../../../components/icons';
import CommonButton from '../../../components/shared/button/CommonButton';
import { Box, ButtonContent, List, NavMenuItem, NavMenuWrapper, PageHeader, Title, Wrapper } from './Analytics.styled';
import { headData } from './analytics.data';

const AnalyticsTopbar: FC = () => {
  const { analyticsId } = useParams();

  return (
    <>
      <Wrapper>
        <PageHeader>
          <Title>
            <IconInstance name={EIcons.analytics} />
            Аналитика
          </Title>
          <Box>
            <CommonButton>
              <ButtonContent>
                <IconInstance name={EIcons.report} />
                <span>Сформировать отчет</span>
              </ButtonContent>
            </CommonButton>
            <CommonButton>
              <ButtonContent>
                <IconInstance name={EIcons.calendar} />
                <span>День</span>
                <span>Неделя</span>
                <span>Месяц</span>
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
              <NavLink to={`/analytics/${item.to}`}>{item.name}</NavLink>
            </NavMenuItem>
          ))}
        </List>
      </NavMenuWrapper>
    </>
  );
};

export default AnalyticsTopbar;
