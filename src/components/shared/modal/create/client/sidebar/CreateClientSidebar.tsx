import { SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { Box, ButtonInner, Form, Title, Wrapper } from './CreateClientSidebar.styled';

import ClientsStore from '../../../../../../store/clientsStore';
import FilialStore from '../../../../../../store/filialStore';
import { apiPost, apiPut } from '../../../../../../utils/apiInstance';
import { getNumberCompleteYears } from '../../../../../../utils/helperFunctions';
import { Padding } from '../../../../../../utils/styleUtils';
import { validationClientAddSchema } from '../../../../../../utils/validation-input';
import { EIcons, Icon as IconInstance } from '../../../../../icons';
import { ReactComponent as Cancel } from '../../../../../icons/cancel.svg';
import { ReactComponent as Plus } from '../../../../../icons/plus.svg';
import CommonButton from '../../../../button/CommonButton';
import CommonDropdown from '../../../../dropdawn/CommonDropdown';
import CommonInputPhone from '../../../../fields/common-input-phone/CommonInputPhone';
import CommonInput from '../../../../fields/CommonInput';

interface IProps {
  clientsStore?: ClientsStore;
  filialStore?: FilialStore;
  closeSidebar?: () => void;
  edit?: boolean;
  sidebarPayload?: any;
}

const statusList = [
  { value: 1, label: 'Первичный' },
  { value: 2, label: 'Вторичный' }
];

const communicationMethods = [
  { value: 1, label: 'Любой' },
  { value: 2, label: 'Только смс + мессенджеры' }
];
const communicationIntervals = [
  { value: '9-12', label: '9-12' },
  { value: '12-15', label: '12-15' },
  { value: '15-18', label: '15-18' },
  { value: '18-21', label: '18-21' }
];
const CreateClientSidebar: React.FC<IProps> = observer((props) => {
  const { closeSidebar, edit, sidebarPayload, filialStore, clientsStore } = props;
  const { filials } = filialStore!;
  const [pending, setPending] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [isViber, setIsViber] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);
  const [ageClient, setAgeClient] = useState('');

  useEffect(() => {
    if (sidebarPayload) {
      setAgeClient(getNumberCompleteYears(sidebarPayload.birthday));
    }
  }, []);

  const initialValues = {
    email: '',
    birthday: '',
    phone: '',
    name: '',
    filial: filialStore?.activeFilial?.name,
    status: '',
    sex: false,
    dopphone: '',
    comment: '',
    commethod: '',
    comminterval: '',
    telegram: false,
    viber: false,
    whatsapp: false
  };
  const formik = useFormik({
    initialValues: sidebarPayload
      ? {
          ...sidebarPayload,
          comminterval:
            communicationIntervals.find(
              (item) => item.value.includes(String(sidebarPayload.comstart)) && item.value.includes(String(sidebarPayload.comfinish))
            )?.label || '',
          commethod: communicationMethods.find((item) => item.value === sidebarPayload.commethod)?.label || ''
        }
      : initialValues,
    validationSchema: validationClientAddSchema,
    onSubmit: () => {},
    validateOnBlur: true
  });
  const createClient = async (values: any) => {
    setPending(true);
    const { comminterval, sex, commethod } = values;
    const [comstart, comfinish] = comminterval.split('-');
    const sexBoolean = String(sex) === 'true';
    const commethodNum = communicationMethods.find((item) => item.label === commethod)?.value;
    const res = await apiPut('/client', {
      ...values,
      comstart: Number(comstart),
      comfinish: Number(comfinish),
      sex: sexBoolean,
      commethod: commethodNum,
      filial: filialStore?.activeFilial?.id
    });
    if (res?.status === 200) {
      setPending(false);
      closeSidebar?.();
      toast.success('Клиент успешно добавлен');
      await clientsStore?.fetchClients();
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };
  const editClient = async (values: any) => {
    setPending(true);
    const { comminterval, sex, commethod, birthday } = values;
    const [comstart, comfinish] = comminterval.split('-');

    const sexBoolean = String(sex) === 'true';
    const commethodNum = communicationMethods.find((item) => item.label === commethod)?.value;
    const res = await apiPost(`/client/${values.id}`, {
      ...values,
      comstart: Number(comstart),
      comfinish: Number(comfinish),
      sex: sexBoolean,
      commethod: commethodNum,
      filial: filialStore?.activeFilial?.id,
      birthday: birthday && birthday.length > 0 ? birthday : ' '
    });
    if (res?.status === 200) {
      setPending(false);
      closeSidebar?.();
      clientsStore?.fetchClients();
      toast.success('Данные о клиенте успешно обновлены');
    } else {
      setPending(false);
      toast.error(res.data.description);
    }
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (edit) {
      editClient(formik.values);
    } else {
      createClient(formik.values);
    }
  };

  const handleClose = () => {
    closeSidebar?.();
  };
  useEffect(() => {
    if (formik.values.name && formik.values.phone && formik.values.filial) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);

  return (
    <Wrapper>
      <Title>{edit ? sidebarPayload.name : 'Новый клиент'}</Title>
      <Form onSubmit={handleSubmit}>
        <Box className={'form'}>
          <CommonInput
            label={'ФИО'}
            value={formik.values.name}
            onChange={formik.handleChange}
            name='name'
            simple
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            formik={formik}
          >
            {ageClient !== '' && <div className='age'>{ageClient}</div>}
          </CommonInput>
          <CommonInputPhone
            label={'Телефон'}
            name='phone'
            simple
            value={formik.values.phone}
            onChange={formik.handleChange('phone')}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
            formik={formik}
          />

          <CommonDropdown
            onChange={(option: any) => {
              formik.setFieldValue('status', option.label);
            }}
            options={statusList}
            currentValue={statusList[0].label}
            disabled
          />
          <CommonDropdown
            onChange={(option: any) => {
              formik.setFieldValue('filial', option.label);
            }}
            options={filials}
            currentValue={filials[0].name}
            disabled
          />
          <CommonInput
            label={'Дата рождения'}
            value={formik.values.birthday}
            onChange={formik.handleChange}
            formik={formik}
            name='birthday'
            type='date'
            max={new Date().toISOString().split('T')[0]}
          />
          <CommonInput
            label={'Email'}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            formik={formik}
            name='email'
          />
          <div>
            <div>Пол: </div>
            <div
              className='flex sex-input-wrap'
              role='group'
              aria-labelledby='my-radio-group'
            >
              <label>
                <span>Мужской</span>
                <input
                  onBlur={formik.handleBlur}
                  value={'false'}
                  onChange={formik.handleChange}
                  name='sex'
                  type='radio'
                  defaultChecked={formik.values.sex === false}
                />
              </label>
              <label>
                <span>Женский</span>
                <input
                  onBlur={formik.handleBlur}
                  value={'true'}
                  onChange={formik.handleChange}
                  name='sex'
                  type='radio'
                  defaultChecked={formik.values.sex === true}
                />
              </label>
            </div>
          </div>
          <CommonInputPhone
            label={'Дополнительный телефон'}
            name='dopphone'
            value={formik.values.dopphone}
            onChange={formik.handleChange('dopphone')}
            onBlur={formik.handleBlur}
            error={formik.touched.dopphone && formik.errors.dopphone}
            formik={formik}
          />
          <CommonInput
            label={'Комментарий'}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
            onChange={formik.handleChange}
            formik={formik}
            name='comment'
          />
          <div className='messangers flex'>
            <label>
              <input
                type='checkbox'
                name='whatsapp'
                value={formik.values.whatsapp}
                // value={`${isWhatsApp}`}
                onChange={formik.handleChange}
              />
              <button
                className={formik.values.whatsapp ? 'whatsapp-btn active' : 'whatsapp-btn'}
                onClick={() => setIsWhatsApp(!isWhatsApp)}
                type='button'
              >
                <IconInstance name={EIcons.whatsupsocial} />
              </button>
            </label>
            <label>
              <input
                type='checkbox'
                name='viber'
                value={formik.values.viber}
                onChange={formik.handleChange}
              />
              <button
                className={formik.values.viber ? 'active viber-btn' : 'viber-btn'}
                type='button'
                onClick={() => setIsViber(!isViber)}
              >
                <IconInstance name={EIcons.vibersocial} />
              </button>
            </label>
            <label>
              <input
                type='checkbox'
                name='telegram'
                value={formik.values.telegram}
                onChange={formik.handleChange}
              />

              <button
                className={formik.values.telegram ? 'active telegram-btn' : 'telegram-btn'}
                type='button'
                onClick={() => setIsTelegram(!isTelegram)}
              >
                <IconInstance name={EIcons.telegramsocial} />
              </button>
            </label>
          </div>
          <CommonDropdown
            onChange={(option: any) => {
              formik.setFieldValue('commethod', option.label);
            }}
            options={communicationMethods}
            currentValue={communicationMethods.find((item) => item.label === formik.values.commethod)?.label || formik.values.commethod}
            placeholder='Способ связи'
          />
          <CommonDropdown
            onChange={(option: any) => {
              formik.setFieldValue('comminterval', option.label);
            }}
            options={communicationIntervals}
            currentValue={
              communicationIntervals.find((item) => item.label === formik.values.comminterval)?.label || formik.values.comminterval
            }
            placeholder='Время связи'
          />
        </Box>
        <Box className={'controls'}>
          <CommonButton
            colored={true}
            typeBtn='success'
            type='submit'
            fullWidth
            disabled={!formValid || !formik.isValid}
          >
            <ButtonInner>
              <Plus />
              <span>Сохранить</span>
            </ButtonInner>
          </CommonButton>
          <Padding $size='24px' />
          <CommonButton
            typeBtn='danger'
            onClick={handleClose}
            fullWidth
          >
            <ButtonInner>
              <Cancel />
              <span>Отмена</span>
            </ButtonInner>
          </CommonButton>
        </Box>
      </Form>
    </Wrapper>
  );
});

export default inject('clientsStore', 'filialStore')(CreateClientSidebar);
