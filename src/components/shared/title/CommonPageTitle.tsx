import { PropsWithChildren } from 'react';

import { PageTitle } from '../../../utils/styleUtils';
import {  TitleWrap } from './CommonPageTitle.styled';

interface ICommonPageTitleProps extends PropsWithChildren {
  title: string;
}

export const CommonPageTitle: React.FC<ICommonPageTitleProps> = (props) => {
  const { title, children } = props;

  return (
    <TitleWrap>
      <PageTitle>{title}</PageTitle>
    </TitleWrap>
  );
};
