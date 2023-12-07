import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';

import CabinetsStore, { ICabinet } from '../../../../../../store/cabinetsStore';
import { EIcon, IconNew as IconInstance } from '../../../../../../components/icons/medium-new-icons/icon';

import ModalStore from '../../../../../../store/modalStore';
import {
  ButtonDelete,
  ButtonDrugAndDrop,
  ButtonEdit,
  CabinetName,
  Controls,
  Item,
  ItemNameWrap,
  Point,
  TimeIntervalDivider
} from './ManagementSheduleCabinet.styled';
import { FlexWithAlign } from '../../../../../../utils/styleUtils';
import CommonButton from '../../../../../../components/shared/button/CommonButton';

interface IProps {
  modalStore?: ModalStore;
  cabinet: ICabinet;
  onClick: (cabinetId: ICabinet) => void;
  active?: boolean;
  cabinetsStore?: CabinetsStore;
}

const ManagementScheduleCabinet: React.FC<IProps> = observer(({ onClick, cabinet, active, modalStore, cabinetsStore }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formValid, setFormValid] = useState(false);
  const handleEdit = (e: any) => {
    e.stopPropagation();
    modalStore?.openModal({ name: 'EDIT_CABINET', payload: cabinet });
  };

  const deleteCabinet = () => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: cabinet,
      isDanger: true,
      actionName: 'CABINET',
      classModal: 'danger'
    });
  };

  const initialValues = {
    name: '',
    scheduleId: '',
    seatsLimited: 0,
    workHoursEnd: '',
    workHoursStart: ''
  };

  const formik = useFormik({
    initialValues: cabinet ? cabinet : initialValues,
    onSubmit: (values: any) => {}
  });

  // const editCabinet = async (values: any) => {
  //   const res = await apiPost(`/cabinet/${cabinet.filial}/${cabinet.id}`, {
  //     ...values,
  //     filial: cabinet.filial
  //   });
  //
  //   if (res?.status === 200) {
  //     cabinetsStore!.fetch(cabinet.filial);
  //     toast.success('Кабинет успешно обновлен');
  //   } else {
  //     toast.error(res.data.description);
  //   }
  //   setIsEdit(false);
  // };

  const editCabinet = async (values: any) => {
    modalStore!.openModal({
      name: 'EDIT_CABINET',
      payload: {
        seatsLimited: cabinet.seatsLimited,
        workHoursEnd: cabinet.workHoursEnd,
        workHoursStart: cabinet.workHoursStart,
        id: cabinet.id,
        filial: cabinet.filial,
        name: cabinet.name
      }
    });
  };

  useEffect(() => {
    if (formik.values.name && formik.values.seatsLimited && formik.values.workHoursStart && formik.values.workHoursEnd) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formik.values]);

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   editCabinet(formik.values);
  // };

  return (
    <>
      {/*{!isEdit ? (*/}
      <>
        <Item>
          <ButtonDrugAndDrop>
            <IconInstance name={EIcon.productsmenu} />
          </ButtonDrugAndDrop>
          <ItemNameWrap>
            <CabinetName>{cabinet.name}</CabinetName>
            <FlexWithAlign
              $alignCenter='center'
              $gap='20px'
            >
              <p>Вместимость {cabinet.seatsLimited} человек(а)</p>
              <Point />
              <p>
                Режим работы {cabinet.workHoursStart} <TimeIntervalDivider>-</TimeIntervalDivider> {cabinet.workHoursEnd}
              </p>

              <CommonButton
                typeBtn='ghost'
                className='flex'
              >
                Планирование »
              </CommonButton>
            </FlexWithAlign>
          </ItemNameWrap>
          <Controls>
            <ButtonEdit onClick={editCabinet}>
              <IconInstance name={EIcon.smalledit} />
            </ButtonEdit>

            <ButtonDelete onClick={() => deleteCabinet()}>
              <IconInstance name={EIcon.trash} />
            </ButtonDelete>
          </Controls>
        </Item>
      </>
      {/*// ) : (*/}
      {/*//   <>*/}
      {/*//     <ItemForm>*/}
      {/*//       <ItemNameWrap>*/}
      {/*//         <input*/}
      {/*//           type='text'*/}
      {/*//           name='name'*/}
      {/*//           className='customInput'*/}
      {/*//           value={formik.values.name}*/}
      {/*//           onChange={formik.handleChange}*/}
      {/*//           onBlur={formik.handleBlur}*/}
      {/*//           placeholder='Введите название'*/}
      {/*//         ></input>*/}
      {/*//         <div className='flex seatslimit'>*/}
      {/*//           <label htmlFor='seatsLimited'>Max:</label>*/}
      {/*//           <input*/}
      {/*//             name='seatsLimited'*/}
      {/*//             value={formik.values.seatsLimited}*/}
      {/*//             onChange={formik.handleChange}*/}
      {/*//             onBlur={formik.handleBlur}*/}
      {/*//             type='number'*/}
      {/*//             min={0}*/}
      {/*//             max={99}*/}
      {/*//           ></input>*/}
      {/*//         </div>*/}
      {/*//       </ItemNameWrap>*/}
      {/*//       <div className='workHoursRangeWrap'>*/}
      {/*//         <div>Режим работы</div>*/}
      {/*//         <div className='flex workHoursRange'>*/}
      {/*//           <input*/}
      {/*//             type='time'*/}
      {/*//             name='workHoursStart'*/}
      {/*//             value={formik.values.workHoursStart}*/}
      {/*//             onChange={formik.handleChange}*/}
      {/*//             onBlur={formik.handleBlur}*/}
      {/*//           />*/}
      {/*//           <span> - </span>*/}
      {/*//           <input*/}
      {/*//             type='time'*/}
      {/*//             name='workHoursEnd'*/}
      {/*//             value={formik.values.workHoursEnd}*/}
      {/*//             onChange={formik.handleChange}*/}
      {/*//             onBlur={formik.handleBlur}*/}
      {/*//           />*/}
      {/*//         </div>*/}
      {/*//       </div>*/}
      {/*//       <SubmitBtn className='flex'>*/}
      {/*//         <CommonButton*/}
      {/*//           color={'mainLight'}*/}
      {/*//           disabled={!formValid}*/}
      {/*//         >*/}
      {/*//           <Plus />*/}
      {/*//           <span>Сохранить кабинет</span>*/}
      {/*//         </CommonButton>*/}
      {/*//         <button*/}
      {/*//           type='button'*/}
      {/*//           className='backButton'*/}
      {/*//           onClick={() => setIsEdit(false)}*/}
      {/*//         >*/}
      {/*//           Назад*/}
      {/*//         </button>*/}
      {/*//       </SubmitBtn>*/}
      {/*//     </ItemForm>*/}
      {/*//   </>*/}
      {/*// )}*/}
    </>
  );
});

export default inject('modalStore', 'cabinetsStore')(ManagementScheduleCabinet);
