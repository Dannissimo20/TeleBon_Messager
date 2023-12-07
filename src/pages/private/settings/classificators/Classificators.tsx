import { FC, SetStateAction, useEffect, useState } from 'react';
import SubproductsStore from '../../../../store/subProductsStore';
import ClientsStore from '../../../../store/clientsStore';
import UserStore from '../../../../store/userStore';
import ProductsStore from '../../../../store/productsStore';
import ClassificatorsStore from '../../../../store/classificatorsStore';
import PaymentsStore from '../../../../store/paymentsStore';
import { inject, observer } from 'mobx-react';
import { renameNameToLabelFork } from '../../product/helpers/helperFunctions';
import { apiPut } from '../../../../utils/apiInstance';
import { toast } from 'react-toastify';
import { FlexWithAlign } from '../../../../utils/styleUtils';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonDropdown from '../../../../components/shared/dropdawn/CommonDropdown';
import CommonInput from '../../../../components/shared/fields/CommonInput';
import CommonButton from '../../../../components/shared/button/CommonButton';
import { SubTitle, Wrapper } from './Classificators.styled';

interface IProps {
  subproductsStore?: SubproductsStore;
  clientsStore?: ClientsStore;
  userStore?: UserStore;
  productsStore?: ProductsStore;
  classificatorsStore?: ClassificatorsStore;
  paymentsStore?: PaymentsStore;
}
const Classificators: FC<IProps> = observer((props) => {
  const { userStore, productsStore, paymentsStore, classificatorsStore, subproductsStore, clientsStore } = props;
  const { clients, fetchClients } = clientsStore!;
  const { subproducts, fetchSubproducts } = subproductsStore!;
  const { products } = productsStore!;
  const { fetchClassificators, classificators } = classificatorsStore!;
  const [isProduct, setIsProduct] = useState<string | undefined>(products[0]?.id);
  const [isClassificator, setIsClassificator] = useState<string>('');
  const [isClient, setIsClient] = useState<{ value?: string; label?: string }>({ value: '', label: '' });
  const fetchClassificatorsInfo = async () => {
    await fetchClassificators();
  };

  const isClassificatorUnique = (name: string) => {
    return !classificators.some(
      (item) =>
        (item.name === name && item.clientid === isClient && item.productid === isProduct) ||
        (item.productid === isProduct && item.clientid === isClient)
    );
  };

  useEffect(() => {
    fetchClassificatorsInfo();
  }, []);
  const fetchInfo = async () => {
    await fetchClients();
    if (isProduct) {
      await fetchSubproducts(isProduct);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  useEffect(() => {
    if (isProduct) {
      fetchSubproducts(isProduct);
    }
  }, [isProduct]);
  const renameNameProduct = renameNameToLabelFork(products);
  const renameNameToLabelInfo = renameNameToLabelFork(clients);

  const handleClick = async () => {
    const classificatorsEvent = {
      clientid: isClient,
      name: isClassificator,
      productid: isProduct
    };

    if (!isClassificatorUnique(isClassificator)) {
      toast.error('Классификатор с таким именем уже существует');
      return;
    }

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
  };

  const handleClientChange = (selected: { value: SetStateAction<{ value?: string | undefined; label?: string | undefined }> }) => {
    setIsClient(selected.value);
  };
  const handleProductChange = (selected: { value: string }) => {
    setIsProduct(selected.value);
  };

  return (
    <Wrapper>
      <SubTitle>Добавить классификатор</SubTitle>
      <FlexWithAlign $alignCenter='center'>
        <CommonDropdown
          className='dropdown'
          onChange={handleClientChange}
          options={renameNameToLabelInfo}
        >
          <div className='insideIcon'>
            <IconInstance name={EIcon.user} />
          </div>
        </CommonDropdown>

        <CommonDropdown
          className='dropdown'
          onChange={handleProductChange}
          options={renameNameProduct}
        >
          <div className='insideIcon'>
            <IconInstance name={EIcon.cart} />
          </div>
        </CommonDropdown>

        <CommonInput
          label='Классификатор'
          value={isClassificator}
          simple
          onChange={(e) => setIsClassificator(e.target.value)}
        >
          <IconInstance name={EIcon.tab} />
        </CommonInput>
        <CommonButton
          typeBtn='primary'
          disabled={isClient.value === '' || isClassificator === ''}
          onClick={handleClick}
        >
          Добавить классификатор
        </CommonButton>
      </FlexWithAlign>
      {/*<div style={{ overflowY: 'auto', height: ' 297px' }}>*/}
      {/*  {classificators &&*/}
      {/*    classificators.map((item, index) => (*/}
      {/*      <div*/}
      {/*        style={{ overflowY: 'auto' }}*/}
      {/*        key={index}*/}
      {/*      >*/}
      {/*        {item.name}*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*</div>*/}
    </Wrapper>
  );
});

export default inject(
  'subproductsStore',
  'clientsStore',
  'userStore',
  'productsStore',
  'classificatorsStore',
  'paymentsStore'
)(Classificators);
