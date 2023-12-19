import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import { Circle, Diagramm, RadioInputContainer, Wrapper } from './AdminUsers.styled';

import UserStore, { IUser } from '../../../../store/userStore';
import { FlexContainer } from '../../../../utils/styleUtils';
import SvgCircleAnimation from '../../../../utils/SvgCircleAnimation';
import AdminBarChart from '../barchart/AdminBarChart';
import AdminTable from '../table/AdminTable';

const AdminPage: FC<{ userStore?: UserStore }> = observer((props) => {
  const [isUser, setIsUser] = useState<IUser[]>([]);
  const { t } = useTranslation();
  const { userStore } = props;
  const { user } = userStore!;

  const fetchUserInfo = async () => {
    const productsList = await userStore?.fetchUsers();
    if (productsList) {
      setIsUser(productsList?.users);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
  };

  const filterUsersByYearAndMonth = (year: number | null) => {
    if (year === null) {
      return isUser;
    }

    const currentYearData = isUser.filter((user) => {
      const userYear = new Date(user.dtreg).getFullYear();

      return userYear === year;
    });

    return currentYearData;
  };

  const filteredDataUser = selectedYear ? filterUsersByYearAndMonth(selectedYear) : isUser;

  const dynamicChartData = () => {
    const labels: string[] = [];
    const values: number[] = [];

    if (selectedYear === null) {
      const uniqueYears = Array.from(new Set(isUser.map((user) => new Date(user.dtreg).getFullYear())));
      uniqueYears.sort();

      for (const year of uniqueYears) {
        labels.push(year.toString());
        const filteredUsers = filteredDataUser.filter((user) => {
          const userYear = new Date(user.dtreg).getFullYear();

          return userYear === year;
        });
        values.push(filteredUsers.length);
      }
    } else {
      for (let i = 0; i < 12; i++) {
        const monthName = new Date(selectedYear, i, 1).toLocaleString('default', { month: 'short' });
        const filteredUsers = filteredDataUser.filter((user) => {
          const userYear = new Date(user.dtreg).getFullYear();
          const userMonth = new Date(user.dtreg).getMonth();

          return userYear === selectedYear && userMonth === i;
        });

        labels.push(monthName);
        values.push(filteredUsers.length);
      }
    }

    return { labels, values };
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const getPreviousMonthYear = (currentYear: number, currentMonth: number) => {
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;

    if (previousMonth === -1) {
      previousMonth = 11;
      previousYear -= 1;
    }

    return { previousYear, previousMonth };
  };

  const { previousYear, previousMonth } = getPreviousMonthYear(currentYear, currentMonth);

  const currentMonthData = isUser.filter((user) => {
    const userYear = new Date(user.dtreg).getFullYear();

    const userMonth = new Date(user.dtreg).getMonth();

    return userYear === currentYear && userMonth === currentMonth;
  });

  const previousMonthData = isUser.filter((user) => {
    const userYear = new Date(user.dtreg).getFullYear();

    const userMonth = new Date(user.dtreg).getMonth();

    return userYear === previousYear && userMonth === previousMonth;
  });

  const calculateComparisonPercentage = (currentData: string | any[], previousData: string | any[]) => {
    const currentCount = currentData.length;
    const previousCount = previousData.length;

    if (previousCount === 0) {
      return currentCount > 0 ? 100 : 0;
    } else {
      const percentage = ((currentCount - previousCount) / previousCount) * 100;

      return parseFloat(percentage.toFixed(2));
    }
  };

  const comparisonPercentage = calculateComparisonPercentage(currentMonthData, previousMonthData);

  return (
    <Wrapper>
      <FlexContainer>
        <FlexContainer
          style={{ width: '70%' }}
          $column
        >
          <RadioInputContainer>
            <label>
              <input
                type='radio'
                value={''}
                checked={selectedYear === null}
                onChange={() => handleYearChange(null)}
              />
              <span>{t('Все время')}</span>
            </label>
            {Array.from(new Set(isUser.map((user) => new Date(user.dtreg).getFullYear()))).map((year) => (
              <label key={year}>
                <input
                  type='radio'
                  value={year}
                  checked={selectedYear === year}
                  onChange={() => handleYearChange(year)}
                />
                <span>{year}</span>
              </label>
            ))}
          </RadioInputContainer>
          <p>
            {t('Прирост пользователей')} <span>{comparisonPercentage.toFixed(2)}%</span> {t('по сравнению с прошлым')}
          </p>

          <Diagramm>
            <AdminBarChart
              data={dynamicChartData()}
              selectedYear={selectedYear}
            />
          </Diagramm>
        </FlexContainer>
        <FlexContainer
          $column
          style={{ width: 'fit-content', justifyContent: 'center', transition: '.5s ease' }}
        >
          <Circle>
            <h3>{t('Пользователи')}</h3>
            <div>
              <p className='subtitle'>{t('Всего пользователей')}</p>
              <SvgCircleAnimation number={isUser.length} />
            </div>
            <div className={`${selectedYear === null && 'hidden'}`}>
              <p className='subtitle'>
                {t('За')} {selectedYear} {t('год')}
              </p>
              <SvgCircleAnimation number={filteredDataUser.length} />
            </div>
          </Circle>
        </FlexContainer>
      </FlexContainer>
      <AdminTable data={isUser} />
    </Wrapper>
  );
});

export default inject('userStore', 'rootStore')(AdminPage);
