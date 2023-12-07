import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import { useOutside } from '../../../../../components/hooks/useOutside';
import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../../components/shared/button/CommonButton';
import CommonInput from '../../../../../components/shared/fields/CommonInput';
import ClassificatorsStore from '../../../../../store/classificatorsStore';
import ClientsStore, { IClient } from '../../../../../store/clientsStore';
import RecordingStore from '../../../../../store/recordingStore';
import SubproductsStore from '../../../../../store/subProductsStore';
import { apiPut } from '../../../../../utils/apiInstance';
import { FlexContainer } from '../../../../../utils/styleUtils';
import { ModalMenu } from '../../styles/form-styles';
import { useTranslation } from 'react-i18next';

interface IProps {
  recordingStore?: RecordingStore;
  clientsStore?: ClientsStore;
  classificatorsStore?: ClassificatorsStore;
  subproductsStore?: SubproductsStore;
  formik: any;
}

const NameField: FC<IProps> = observer((props) => {
  const { formik, clientsStore, classificatorsStore } = props;
  const { clients } = clientsStore!;
  const { ref, isShow, setIsShow } = useOutside(false);
  const { classificators, fetchClassificators } = classificatorsStore!;
  const { t } = useTranslation();
  const [clientSuggestions, setClientSuggestions] = useState<IClient[]>([]);
  const [nameClick, setNameClick] = useState(false);
  useEffect(() => {
    if (formik.values.name?.length >= 1) {
      const resultArray = searchResultClients(clients, formik.values.name);
      setClientSuggestions(resultArray);
    } else {
      setClientSuggestions([]);
    }
  }, [formik.values.name]);
  useEffect(() => {
    if (formik.values.name === '') {
      setNameClick(false);
    }
  }, [formik.values.name]);

  const searchResultClients = (array: IClient[], value: string) => {
    if (value?.length >= 1) {
      return array.filter(
        (item) =>
          item?.name?.toLocaleLowerCase().includes(value?.toLocaleLowerCase()) ||
          item?.phone?.toLocaleLowerCase().includes(value?.toLocaleLowerCase())
      );
    } else {
      return [];
    }
  };

  const handleClientSuggestionClick = (suggestion: IClient, e: React.MouseEvent) => {
    e.preventDefault();
    formik.setFieldValue('name', suggestion.name);
    formik.setFieldValue('phone', suggestion.phone);
    setClientSuggestions([]);
    setNameClick(true);
  };

  const existingClient = clients.find((client: IClient) => client.phone === formik.values.phone && client.name === formik.values.name);

  const handleCreateClassificator = async (name: string, color?: string) => {
    if (existingClient) {
      const existingClassificatorIndex = classificators?.find((item) => item.name === name && item.clientid === existingClient.id);

      if (existingClassificatorIndex) {
        await fetchClassificators();
      } else {
        const classificatorsEvent = {
          name: name,
          productid: formik.values.productId,
          clientid: existingClient.id,
          color: color
        };

        try {
          const response = await apiPut(`/classificator`, classificatorsEvent);
          if (response.status === 200) {
            await fetchClassificators();
            toast.success('Классификатор успешно добавлен');
          } else {
            toast.error('Ошибка при обновлении события');
          }
        } catch (error) {
          toast.error('Ошибка при обновлении события');
        }
      }
    }
  };

  return (
    <FlexContainer
      className={classnames('input formElement')}
      ref={ref}
    >
      {formik.values.name !== '' && formik.values.phone !== '' && (
        <>
          <div className='classificator'>
            <div
              className={classnames(isShow && 'active')}
              onClick={() => setIsShow((prev) => !prev)}
            >
              <IconInstance name={EIcon.plusoutline} />
            </div>

            {isShow && (
              <div className='classificatorList'>
                {classificators &&
                  classificators
                    .filter((item) => item.clientid === '' && item.productid === formik.values.productId)
                    .map((item) => (
                      <CommonButton
                        typeBtn='primary'
                        style={{ background: item.color, borderColor: item.color }}
                        key={item.name}
                        onClick={() => handleCreateClassificator(item.name, item.color)}
                      >
                        {item.name}
                      </CommonButton>
                    ))}
              </div>
            )}
          </div>
          <div className='activeCLassificator'>
            {classificators &&
              existingClient &&
              classificators
                .filter((item: any) => item.productid === formik.values.productId && item.clientid === existingClient.id)
                .slice(-1)
                .map((item: any) => (
                  <div
                    style={{ background: item.color }}
                    key={item.name}
                  >
                    {item.name}
                  </div>
                ))}
          </div>
        </>
      )}
      <CommonInput
        simple
        label={t('Введите ФИО клиента')}
        value={formik.values.name}
        name={'name'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        formik={formik}
      />
      <IconInstance name={EIcon.user} />

      {clientSuggestions.length > 0 && formik.values.name.trim() !== '' && !nameClick && (
        <ModalMenu>
          <ul>
            {clientSuggestions.map((client: IClient) => (
              <li
                key={client.id}
                onClick={(e: React.MouseEvent) => {
                  handleClientSuggestionClick(client, e);
                }}
              >
                {client.name} {client.phone}
              </li>
            ))}
          </ul>
        </ModalMenu>
      )}
    </FlexContainer>
  );
});

export default inject('recordingStore', 'classificatorsStore', 'subproductsStore', 'clientsStore')(NameField);
