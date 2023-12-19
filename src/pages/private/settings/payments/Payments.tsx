import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { inject, observer } from 'mobx-react';

import { Wrapper } from './Payments.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonInput from '../../../../components/shared/fields/CommonInput';
import ClassificatorsStore from '../../../../store/classificatorsStore';
import ClientsStore from '../../../../store/clientsStore';
import PaymentsStore from '../../../../store/paymentsStore';
import ProductsStore from '../../../../store/productsStore';
import SubproductsStore from '../../../../store/subProductsStore';
import UserStore from '../../../../store/userStore';
import { apiPut } from '../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign, PageSubtitle } from '../../../../utils/styleUtils';

interface IProps {
  subproductsStore?: SubproductsStore;
  clientsStore?: ClientsStore;
  userStore?: UserStore;
  productsStore?: ProductsStore;
  classificatorsStore?: ClassificatorsStore;
  paymentsStore?: PaymentsStore;
}
const Payments: FC<IProps> = observer((props) => {
  const { productsStore, paymentsStore, classificatorsStore, subproductsStore, clientsStore } = props;
  const { clients, fetchClients } = clientsStore!;
  const { subproducts, fetchSubproducts } = subproductsStore!;
  const { products } = productsStore!;
  const { payments, fetchPayments } = paymentsStore!;
  const [isPayment, setIsPayment] = useState<string>('');
  const fetchClassificatorsInfo = async () => {
    await fetchPayments();
  };

  const isPaymentUnique = (name: string) => {
    return !payments.some((item) => item.name === name);
  };

  useEffect(() => {
    fetchClassificatorsInfo();
  }, []);
  const fetchInfo = async () => {
    await fetchClients();
    await fetchSubproducts(products[0]?.id);
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const handlePaymentsClick = async () => {
    const paymentsEvent = {
      name: isPayment
    };

    if (!isPaymentUnique(isPayment)) {
      toast.error('Такой способ оплаты уже существует');

      return;
    }
    try {
      const response = await apiPut(`/payments`, paymentsEvent);
      if (response.status === 200) {
        await fetchPayments();
        toast.success('Способ оплаты успешно добавлен');
      } else {
        toast.error('Ошибка при обновлении события');
      }
    } catch (error) {
      toast.error('Ошибка при обновлении события');
    }
  };

  return (
    <Wrapper>
      <FlexContainer
        className='heading'
        $column
        $gap='20px'
      >
        <PageSubtitle>Добавить способ оплаты</PageSubtitle>
        <FlexWithAlign>
          <CommonInput
            label='Укажите способ оплаты'
            simple
            value={isPayment}
            onChange={(e) => setIsPayment(e.target.value)}
          >
            <IconInstance name={EIcon.paymentadd} />
          </CommonInput>
          <CommonButton
            typeBtn='primary'
            disabled={isPayment === ''}
            onClick={handlePaymentsClick}
          >
            Добавить способ оплаты
          </CommonButton>
        </FlexWithAlign>
      </FlexContainer>
      <FlexContainer
        $column
        $gap='20px'
      >
        <PageSubtitle>Способ оплаты</PageSubtitle>
        <FlexWithAlign
          $alignCenter='center'
          className='content'
        >
          {payments && payments.map((item, index) => <div key={index}>{item.name}</div>)}
        </FlexWithAlign>
      </FlexContainer>
    </Wrapper>
  );
});

export default inject('subproductsStore', 'clientsStore', 'userStore', 'productsStore', 'classificatorsStore', 'paymentsStore')(Payments);
