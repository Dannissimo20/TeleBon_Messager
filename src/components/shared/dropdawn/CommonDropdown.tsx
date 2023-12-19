import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';

import classnames from 'classnames';
import makeAnimated from 'react-select/animated';

import { WrapperDropdown } from './CommonDropdown.styled';

const animatedComponents = makeAnimated();
interface IProps {
  currentValue?: any;
  options: any[];
  labelTitle?: string;
  valueTitle?: string;
  onChange?: (selectedValue: any) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onToggle?: (val: boolean) => void;
  additionalProps?: Record<string, any>;
  [key: string]: any;
}

const CommonDropdown: React.FC<IProps> = ({ additionalProps, currentValue, options, isMulti, onChange, placeholder, children }) => {
  const { t } = useTranslation();
  const transformedList = options?.map((option) => {
    if (option.label && option.value) {
      return option;
    } else {
      return { value: option.id, label: option.name || option.title || option?.name, additional: option };
    }
  });

  return (
    <WrapperDropdown>
      <ReactSelect
        options={transformedList}
        value={transformedList.find((option) => option.value === currentValue || option.label === currentValue)}
        placeholder={placeholder ? placeholder : `${t('Выбрать')}...`}
        classNamePrefix='custom-select'
        onChange={onChange}
        isSearchable={false}
        noOptionsMessage={() => t('Нет доступных опций')}
        //@ts-ignore
        getOptionLabel={(option) => (
          <div className={classnames(option.additional?.tarif && option.additional?.duration ? 'additionalItems' : 'additionalHidden')}>
            {option.color && (
              <span
                style={{ background: option.color }}
                className='additionalColor'
              ></span>
            )}
            <span>{option.label}</span>
            {option.additional && (
              <div>
                <p>
                  {t('Длительность')}: {option.additional?.duration} {t('мин')}
                </p>
                <span className='additionalWall'></span>
                <p>
                  {t('Стоимость')}: {option.additional?.tarif}₽
                </p>
              </div>
            )}
          </div>
        )}
        isMulti={additionalProps?.isMulti}
        {...additionalProps}
        components={animatedComponents}
      />
    </WrapperDropdown>
  );
};

export default CommonDropdown;
