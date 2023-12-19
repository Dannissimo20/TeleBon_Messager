import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';

import { InformationWrapper } from '../../../../components/views/PageStyled.styled';
import { WorkbenchSubTitle } from '../../../../components/views/workbench/Workbench.styled';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { ProfileScheduleWrapper } from './ProfileSchedule.styled';

const ProfileSchedule: FC = () => {
  const { t } = useTranslation();

  return (
    <InformationWrapper>
      <WorkbenchSubTitle>{t('Мой график')}</WorkbenchSubTitle>
      <ProfileScheduleWrapper>
        <div>
          <div>
            <IconInstance name={EIcon.calendar} />
          </div>
          <WorkbenchSubTitle>ПН-ПТ, 09:00 - 18:00</WorkbenchSubTitle>
        </div>
        <CommonButton
          disabled
          typeBtn={'primary'}
        >
          {t('Изменить график')}
        </CommonButton>
      </ProfileScheduleWrapper>
    </InformationWrapper>
  );
};

export default ProfileSchedule;
