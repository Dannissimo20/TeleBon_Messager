import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import ProductsStore from '../../../../store/productsStore';
import SubproductsStore from '../../../../store/subProductsStore';
import WorkersStore from '../../../../store/workersStore';
import { Padding } from '../../../../utils/styleUtils';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonDropdown from '../../../../components/shared/dropdawn/CommonDropdown';
import CommonInput from '../../../../components/shared/fields/CommonInput';
import { Bottom, Container, getAllHL, hasHighlighted, Top } from './ScheduleAttack.styled';

interface IProps {
  productsStore?: ProductsStore;
  subproductsStore?: SubproductsStore;
  workersStore?: WorkersStore;
  schedule?: any[];
  unHighlight: () => void;
  handleSave: () => void;
  attachProps: (props: any) => void;
  clearProps: () => void;
}

const ScheduleAttach: React.FC<IProps> = observer(
  ({ schedule, unHighlight, handleSave, subproductsStore, productsStore, workersStore, attachProps, clearProps }) => {
    const [product, setProduct] = useState('');
    const [subProduct, setSubproduct] = useState('');
    const [people, setPeople] = useState('');
    const [userId, setUser] = useState('');
    const [hlCount, setCount] = useState(0);
    const { products } = productsStore!;
    const { subproducts } = subproductsStore!;
    const { workers } = workersStore!;

    const productsOptimised = products.map((item) => ({ label: item.name, value: item.id }));
    const workersOptimised = workers.map((item) => ({ label: item.fio, value: item.id }));
    const subProductsOptimised = subproducts.map((item) => ({ label: item.name, value: item.id }));

    const showButton = hasHighlighted(schedule || []);

    const handleChangeSubProduct = ({ value }: any) => {
      setSubproduct(value);
      attachProps({ subproductId: value });
    };
    const handleChangeProduct = ({ value }: any) => {
      setProduct(value);
      subproductsStore!.fetchSubproducts(value);
      attachProps({
        subproductId: '',
        productId: value
      });
    };
    const handleChangeUser = ({ value }: any) => {
      setUser(value);
      attachProps({
        userId: value
      });
    };
    const handleChangePeople = (e: any) => {
      const value = e.target.value;
      setPeople(e.target.value);
      attachProps({
        places: value
      });
    };
    const clearState = () => {
      setProduct('');
      setSubproduct('');
      setPeople('');
      setUser('');
    };
    const clear = () => {
      clearProps();
      clearState();
    };
    const handleUnHighlight = () => {
      unHighlight();
      clearState();
    };

    useEffect(() => {
      if (!products.length) {
        productsStore?.fetchProducts();
      }
      if (!workers.length) {
        workersStore?.fetchWorkers();
      }
      const allHighlighted = getAllHL(schedule as any);
      const allHLLength = allHighlighted.length;

      if (allHighlighted.length === 1) {
        const once = allHighlighted[0];

        setProduct(once.productId);
        setSubproduct(once.subproductId);
        setPeople(once.places);
        setUser(once.userId);
        if (once.productId) {
          subproductsStore!.fetchSubproducts(once.productId);
        }
      }

      if (allHLLength !== hlCount) {
        setCount(allHighlighted.length);

        if (allHighlighted.length === 0) {
          clearState();
        }
        if (allHighlighted.length > 1) {
          clearState();
        }
      }
    }, [schedule, products]);

    return (
      <Container>
        <Top>
          {/* <Instructions>
          Alt - выделить <br />
          Shift + Alt - выделить несколько
        </Instructions> */}
          Назначить выбранным:
          <CommonDropdown
            options={productsOptimised}
            currentValue={product}
            onChange={handleChangeProduct}
            disabled={!showButton}
            placeholder='Продукт'
          />
          <Padding $size='10px' />
          <CommonDropdown
            options={subProductsOptimised}
            currentValue={subProduct}
            onChange={handleChangeSubProduct}
            disabled={!showButton}
            placeholder='Субпродукт'
          />
          <Padding $size='10px' />
          <CommonDropdown
            options={workersOptimised}
            currentValue={userId}
            onChange={handleChangeUser}
            disabled={!showButton}
            placeholder='Сотрудник'
          />
          <Padding $size='10px' />
          <CommonInput
            label={'Кол-во мест'}
            onChange={handleChangePeople}
            value={`${people}`}
            disabled={!showButton}
            type='number'
            min='1'
            step='1'
            simple
          />
          <Padding $size='10px' />
        </Top>

        <Bottom>
          <CommonButton
            onClick={handleUnHighlight}
            disabled={!showButton}
          >
            Снять выделение
          </CommonButton>
          <Padding $size='10px' />
          <CommonButton
            onClick={clear}
            disabled={!showButton}
          >
            Очистить выделенные
          </CommonButton>
          <Padding $size='10px' />
          <CommonButton
            onClick={handleSave}
            typeBtn='success'
          >
            Сохранить расписание
          </CommonButton>
        </Bottom>
      </Container>
    );
  }
);

export default inject('productsStore', 'subproductsStore', 'workersStore')(ScheduleAttach);
