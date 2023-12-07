import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { inject, observer } from 'mobx-react';

import { Controls, HeadItem, SearchWrap, TableBody, TableCol, TableHeader, TableRow, Wrapper } from './ClientList.styled';

import { ReactComponent as CloseIcon } from '../../../../components/icons/close.svg';
import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import { ReactComponent as SearchIcon } from '../../../../components/icons/search.svg';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonLoader from '../../../../components/shared/loader/CommonLoader';
import ClientsStore, { IClient } from '../../../../store/clientsStore';
import FilialStore, { IFilial } from '../../../../store/filialStore';
import ModalStore from '../../../../store/modalStore';
import { PENDING } from '../../../../utils/state';
import { FlexContainer, FlexWithAlign, Partition } from '../../../../utils/styleUtils';

const headers = ['ФИО клиента', 'Номер телефона', 'Филиал', ''];

interface IProps {
  clientsStore?: ClientsStore;
  filialStore?: FilialStore;
  modalStore?: ModalStore;
  clickClient: Dispatch<SetStateAction<IClient>>;
}
const ClientsList: React.FC<IProps> = observer((props) => {
  const { clientsStore, filialStore, modalStore, clickClient } = props;
  const { clients, state } = clientsStore!;
  const { filials } = filialStore!;

  const [value, setValue] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const createClient = () => {
    props.modalStore?.openModal({ name: 'CREATE_CLIENT' });
  };
  const editClient = (id: string) => {
    props.modalStore?.openModal({
      name: 'EDIT_CLIENT',
      payload: clients.find((item) => item.id === id)
    });
  };
  const deleteClient = (client: IClient) => {
    modalStore?.openModal({
      name: 'CONFIRM_DELETE',
      payload: client,
      isDanger: true,
      actionName: 'CLIENT',
      classModal: 'danger'
    });
  };

  const onExcelTextareaExport = () => {
    props.modalStore?.openModal({ name: 'EXPORT_CSV_CLIENT' });
  };

  const fetchClients = async () => {
    await clientsStore?.fetchClients();
  };
  const handleFocus = () => {
    setIsSearch(true);
  };

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

  const searchResultClients = (array: IClient[], value: string) => {
    const resultArray = array.filter((item) => {
      return (
        item.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 ||
        item.phone.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      );
    });

    return resultArray;
  };
  const [searchClients, setSearchClients] = useState<IClient[]>(clients);
  useEffect(() => {
    const resultArray = searchResultClients(clients, value);
    setSearchClients(resultArray);
  }, [value, clients]);
  useEffect(() => {
    fetchClients();
  }, []);

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
              {searchRef.current && searchRef.current.value.length > 0 ? <CloseIcon /> : <SearchIcon />}
            </button>

            <input
              ref={searchRef}
              id='search'
              name='search'
              className='input-search'
              type='text'
              placeholder='Поиск по имени и телефону'
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </label>
        </form>
        <FlexWithAlign
          $alignCenter='center'
          $gap='8px'
        >
          <CommonButton
            typeBtn='ghost'
            onClick={createClient}
          >
            <FlexWithAlign
              $gap='16px'
              $alignCenter='center'
            >
              <IconInstance name={EIcon.export} />
              <span>Экспорт</span>
            </FlexWithAlign>
          </CommonButton>
          <Partition />
          <CommonButton
            onClick={onExcelTextareaExport}
            typeBtn='ghost'
          >
            <FlexWithAlign
              $gap='16px'
              $alignCenter='center'
            >
              <IconInstance name={EIcon.import} />
              <span>Импорт</span>
            </FlexWithAlign>
          </CommonButton>
        </FlexWithAlign>
      </SearchWrap>
      <TableHeader>
        {headers.map((name) => (
          <HeadItem key={name}>{name}</HeadItem>
        ))}
      </TableHeader>
      <TableBody>
        {Array.isArray(searchClients) ? (
          searchClients.map((client: IClient) => (
            <TableRow
              key={client.id}
              onClick={() => clickClient(client)}
            >
              <TableCol className='name'>
                <FlexContainer $alignCenter='center'>
                  <button className='druganddrop flex'>
                    <IconInstance name={EIcon.productsmenu} />
                  </button>
                  {client.name}
                </FlexContainer>
              </TableCol>
              <TableCol>{client.phone}</TableCol>
              {/*<TableCol>{client.email}</TableCol>*/}
              <TableCol>{filials.find((filial: IFilial) => filial.id === client.filial)?.name}</TableCol>
              <TableCol>
                <Controls>
                  <button
                    className='edit flex'
                    onClick={() => editClient(client.id)}
                  >
                    <IconInstance name={EIcon.edithuman} />
                  </button>
                  <button
                    className='delete flex'
                    onClick={() => deleteClient(client)}
                  >
                    <IconInstance name={EIcon.trash} />
                  </button>
                </Controls>
              </TableCol>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCol>Клиентов нет</TableCol>
          </TableRow>
        )}
      </TableBody>

      {state === PENDING && <CommonLoader />}
    </Wrapper>
  );
});

export default inject('clientsStore', 'filialStore', 'modalStore')(ClientsList);
