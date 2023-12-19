import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { inject, observer } from 'mobx-react';

import {
  ButtonDrugAndDrop,
  CardInfoItem,
  DeleteBtn,
  EditBth,
  EmptyEmployee,
  FioWrap,
  HeadItem,
  List,
  SearchWrap,
  TableBody,
  TableCol,
  TableHeader,
  TableRow,
  Wrapper
} from './MenagmentEmployeersTable.styled';

import { EIcon, IconNew as IconInstance } from '../../../../../components/icons/medium-new-icons/icon';
import { ReactComponent as SearchIcon } from '../../../../../components/icons/search.svg';
import CommonLoader from '../../../../../components/shared/loader/CommonLoader';
import FilialStore from '../../../../../store/filialStore';
import ModalStore from '../../../../../store/modalStore';
import SidebarStore from '../../../../../store/sidebarStore';
import UserStore, { IUser } from '../../../../../store/userStore';
import { PENDING } from '../../../../../utils/state';

const headers = ['ФИО сотрудника', 'Номер телефона', 'Филиал', 'Позиция', 'ЛК', 'График работы', 'Последний вход'];

interface MenagmentEmployeersTableProps {
  userStore?: UserStore;
  filialStore?: FilialStore;
  modalStore?: ModalStore;
  sidebarStore?: SidebarStore;
}

const MenagmentEmployeersTable: FC<MenagmentEmployeersTableProps> = observer((props) => {
  const { userStore, modalStore, sidebarStore, filialStore } = props;
  const { filials } = filialStore!;
  const { t } = useTranslation();
  const { user, state } = userStore!;
  const [value, setValue] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsSearch(true);
  };

  const handleBlur = () => {};

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };
  const handleSetFocus = () => {
    if (searchRef.current) {
      searchRef.current.focus();
      setIsSearch(true);
    }
  };

  const handleClickIcon = useCallback((cond: boolean) => {
    if (!cond) {
      handleSetFocus();
    } else {
      if (searchRef.current) {
        searchRef.current.focus();
      }
      setValue('');
    }
  }, []);

  const deleteEmployee = (userItem: IUser) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: userItem,
      isDanger: true,
      actionName: 'EMPLOYEE',
      classModal: 'danger'
    });
  };

  const editEmployee = (id: string) => {
    props.modalStore!.openModal({
      name: 'EDIT_EMPLOYEE',
      payload: user.find((item) => item.id === id)
    });
  };

  const fetchUserInfo = async () => {
    await userStore?.fetchUsers();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const filteredUsers = Array.isArray(user) ? user.filter((item) => item?.role !== 'admin') : [];

  const searchResultUsers = (array: IUser[], value: string) => {
    const resultArray = array.filter((item) => {
      return (
        item.fio.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 ||
        item.phone.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      );
    });

    return resultArray;
  };
  const [searchUsers, setSearchUsers] = useState<IUser[]>(user);
  useEffect(() => {
    const resultArray = searchResultUsers(filteredUsers, value);
    setSearchUsers(resultArray);
  }, [value, user]);

  return (
    <Wrapper>
      <SearchWrap>
        <form
          className='form-search'
          action='/'
        >
          <label htmlFor='search'>
            <button
              className='flex'
              type='button'
              onClick={() => handleClickIcon(isSearch)}
            >
              {searchRef.current && searchRef.current.value.length > 0 ? <IconInstance name={EIcon.plus} /> : <SearchIcon />}
            </button>

            <input
              ref={searchRef}
              id='search'
              name='search'
              className='input-search'
              type='text'
              placeholder={t('Поиск по имени и телефону')}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
        </form>
      </SearchWrap>
      {filteredUsers && Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
        <>
          <TableHeader>
            {headers.map((name) => (
              <HeadItem key={name}>
                <p>{name}</p>
              </HeadItem>
            ))}
          </TableHeader>
          <TableBody>
            {searchUsers.map((item) => (
              <TableRow
                key={item?.id}
                onClick={() => {}}
              >
                <TableCol className='fio'>
                  <FioWrap>
                    <ButtonDrugAndDrop>
                      <IconInstance name={EIcon.productsmenu} />
                    </ButtonDrugAndDrop>
                    <div>
                      <p>{item?.fio}</p>
                      {/*<p className='email'>{item?.Email}</p>*/}
                    </div>
                  </FioWrap>
                </TableCol>
                <TableCol>
                  <p>{item.phone}</p>
                </TableCol>
                <TableCol>
                  <p>{filials.find((filial) => filial.id === item.idfilial)?.name}</p>
                </TableCol>
                <TableCol>
                  <p>{item.position}</p>
                </TableCol>
                <TableCol>
                  <p>{t('Нет')}</p>
                </TableCol>
                <TableCol>
                  <p>-</p>
                </TableCol>
                <TableCol>
                  <p>-</p>
                </TableCol>
                <TableCol>
                  <List>
                    <ul>
                      <CardInfoItem className='delete'>
                        <EditBth
                          className='flex'
                          onClick={() => editEmployee(item?.id)}
                        >
                          <IconInstance name={EIcon.edithuman} />
                        </EditBth>
                        <DeleteBtn
                          className='flex'
                          onClick={() => deleteEmployee(item)}
                        >
                          <IconInstance name={EIcon.trash} />
                        </DeleteBtn>
                      </CardInfoItem>
                    </ul>
                  </List>
                </TableCol>
              </TableRow>
            ))}
          </TableBody>
        </>
      ) : state === PENDING ? (
        <CommonLoader />
      ) : (
        <EmptyEmployee>{t('Сотрудников нет')}</EmptyEmployee>
      )}
    </Wrapper>
  );
});

export default inject('userStore', 'modalStore', 'sidebarStore', 'filialStore', 'rootStore')(MenagmentEmployeersTable);
