import { FC, PropsWithChildren } from 'react';

import { TitleContent, TitleWrap } from './CommonPageTitle.styled';

import { FlexWithAlign, PageSubtitle, PageTitle } from '../../../utils/styleUtils';

interface ICommonPageTitleProps extends PropsWithChildren {
  title: string | undefined;
  subtitle?: string;
}

export const CommonPageTitle: FC<ICommonPageTitleProps> = (props) => {
  const { title, children, subtitle } = props;

  return (
    <TitleWrap>
      <FlexWithAlign
        className={'title'}
        $column
        $gap={subtitle ? '16px' : '0'}
        $justify={'center'}
      >
        <PageTitle>{title}</PageTitle>
        {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
      </FlexWithAlign>
      {children && <TitleContent>{children}</TitleContent>}
    </TitleWrap>
  );
};
