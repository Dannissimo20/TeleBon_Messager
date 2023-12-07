import { SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import { Form, Title, Wrapper } from './CreateClientModal.styled';

import { ModalGrid } from '../../../../../pages/private/product/modal-elements/form-start/FirstForm.styled';
import ClientsStore from '../../../../../store/clientsStore';
import FilialStore from '../../../../../store/filialStore';
import { apiPost, apiPut } from '../../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign, Text } from '../../../../../utils/styleUtils';
import { validationClientAddSchema } from '../../../../../utils/validation-input';
import { EIcon, IconNew as IconInstance } from '../../../../icons/medium-new-icons/icon';
import CommonButton from '../../../button/CommonButton';
import CommonDropdown from '../../../dropdawn/CommonDropdown';
import CommonInputPhone from '../../../fields/common-input-phone/CommonInputPhone';
import CommonInput from '../../../fields/CommonInput';

interface IProps {
  clientsStore?: ClientsStore;
  filialStore?: FilialStore;
  closeModal?: () => void;
  edit?: boolean;
  modalPayload?: any;
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

const CreateClientModal: React.FC<IProps> = observer((props) => {
  const { closeModal, edit, modalPayload, filialStore, clientsStore } = props;
  const { filials } = filialStore!;
  const [pending, setPending] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [isViber, setIsViber] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);
  const [ageClient, setAgeClient] = useState('');

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
    initialValues: modalPayload
      ? {
          ...modalPayload,
          comminterval:
            communicationIntervals.find(
              (item) => item.value.includes(String(modalPayload.comstart)) && item.value.includes(String(modalPayload.comfinish))
            )?.label || '',
          commethod: communicationMethods.find((item) => item.value === modalPayload.commethod)?.label || ''
        }
      : initialValues,
    validationSchema: validationClientAddSchema,
    onSubmit: () => {},
    validateOnBlur: true
  });

  const createClient = async (values: any) => {
    setPending(true);
    const { comminterval, sex, commethod } = values;
    const [comstart, comfinish] = comminterval ? comminterval.split('-') : ['', ''];
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
      closeModal!();
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
    const [comstart, comfinish] = comminterval ? comminterval.split('-') : ['', ''];

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
      closeModal!();
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

  useEffect(() => {
    if (formik.values.name && formik.values.phone && formik.values.filial) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);

  return (
    <Wrapper>
      <Title>{modalPayload ? 'Редактировать контакт' : 'Добавить клиента'}</Title>
      <Form onSubmit={handleSubmit}>
        <FlexContainer
          $column
          $gap='40px'
        >
          <FlexContainer $gap='22px'>
            <Text>Данные клиента</Text>
            <div>
              <div
                className='flex sex-input-wrap'
                role='group'
                aria-labelledby='my-radio-group'
              >
                <label>
                  <input
                    onBlur={formik.handleBlur}
                    value={'false'}
                    onChange={formik.handleChange}
                    name='sex'
                    type='radio'
                    defaultChecked={formik.values.sex === false}
                  />
                  <span>Муж</span>
                </label>
                <label>
                  <input
                    onBlur={formik.handleBlur}
                    value={'true'}
                    onChange={formik.handleChange}
                    name='sex'
                    type='radio'
                    defaultChecked={formik.values.sex === true}
                  />
                  <span>Жен</span>
                </label>
              </div>
            </div>
          </FlexContainer>
          <FlexWithAlign
            $column
            $gap='20px'
          >
            <ModalGrid>
              <CommonInput
                label={'Укажите ФИО клиента'}
                value={formik.values.name}
                onChange={formik.handleChange}
                name='name'
                simple
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
                formik={formik}
              >
                <IconInstance name={EIcon.user} />
                {ageClient !== '' && <div className='age'>{ageClient}</div>}
              </CommonInput>
              <CommonInput
                label={'Укажите дату рождения'}
                value={formik.values.birthday}
                onChange={formik.handleChange}
                formik={formik}
                name='birthday'
                type='date'
                max={new Date().toISOString().split('T')[0]}
                simple
              >
                <IconInstance name={EIcon.calendar} />
              </CommonInput>
            </ModalGrid>
            <ModalGrid>
              <CommonInputPhone
                label={'Укажите телефон клиента'}
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange('phone')}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
                formik={formik}
                simple
              >
                <IconInstance name={EIcon.phone} />
              </CommonInputPhone>
              <CommonInputPhone
                label={'Дополнительный телефон'}
                name='dopphone'
                simple
                value={formik.values.dopphone}
                onChange={formik.handleChange('dopphone')}
                onBlur={formik.handleBlur}
                error={formik.touched.dopphone && formik.errors.dopphone}
                formik={formik}
              >
                <IconInstance name={EIcon.phonedop} />
              </CommonInputPhone>
            </ModalGrid>
            <ModalGrid>
              <CommonInput
                label={'Email'}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                formik={formik}
                name='email'
                simple
              >
                <IconInstance name={EIcon.post} />
              </CommonInput>
            </ModalGrid>
          </FlexWithAlign>
          <FlexContainer
            $column
            $gap='20px'
          >
            <div>
              <Text>Связь с клиентом</Text>
            </div>
            <ModalGrid>
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
                placeholder='Время для связи с клиентом'
              />
            </ModalGrid>
          </FlexContainer>
          <div className='messangers flex'>
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
                <IconInstance name={EIcon.telegram} />
              </button>
            </label>
            <label>
              <input
                type='checkbox'
                name='whatsapp'
                value={formik.values.whatsapp}
                onChange={formik.handleChange}
              />
              <button
                className={formik.values.whatsapp ? 'whatsapp-btn active' : 'whatsapp-btn'}
                onClick={() => setIsWhatsApp(!isWhatsApp)}
                type='button'
              >
                <IconInstance name={EIcon.watsapp} />
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
                <IconInstance name={EIcon.viber} />
              </button>
            </label>
          </div>

          <Text>Комментарий</Text>

          <CommonInput
            label={'Комментарий'}
            simple
            onBlur={formik.handleBlur}
            value={formik.values.comment}
            onChange={formik.handleChange}
            formik={formik}
            name='comment'
          />
        </FlexContainer>

        <FlexWithAlign
          $justify='end'
          className={'controls'}
        >
          <CommonButton
            colored={true}
            typeBtn='ghost'
            onClick={(e: any) => {
              e.preventDefault();
              closeModal!();
            }}
          >
            Отмена
          </CommonButton>
          <CommonButton
            colored={true}
            typeBtn='primary'
            type='submit'
            disabled={!formValid || !formik.isValid}
          >
            {modalPayload ? 'Сохранить' : 'Добавить'}
          </CommonButton>
        </FlexWithAlign>
      </Form>
    </Wrapper>
  );
});

export default inject('clientsStore', 'filialStore')(CreateClientModal);
