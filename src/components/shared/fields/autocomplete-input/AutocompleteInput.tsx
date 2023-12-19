import { ChangeEventHandler, PropsWithChildren, useRef, useState } from 'react';

import { inject, observer } from 'mobx-react';

import { Box, Dropdown, DropdownItem, IconAdd, Name, Phone } from './AutocompleteInput.styled';

import ModalStore from '../../../../store/modalStore';
import CommonInput from '../CommonInput';

const filterListBy = (propName: string, value: string, list?: any[]) =>
  list && list.length ? list.filter((obj) => obj[propName].toLowerCase().includes(value)) : [];

interface IProps extends PropsWithChildren {
  label: string;
  name: string;
  value?: string;
  simple?: boolean;
  list?: any[];
  filterBy: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  modalStore?: ModalStore;
  openClientModal: () => void;
  onChoose: (obj: any) => void;
}

const AutocompleteInput: React.FC<IProps> = observer(
  ({ label, name, value, simple, children, list, filterBy, modalStore, openClientModal, onChoose }) => {
    const [textValue, setValue] = useState('');
    const [active, setActive] = useState(false);
    const [filteredList, setList]: any = useState(filterListBy(filterBy, textValue, list));
    const input = useRef<HTMLAudioElement>(null);

    if (document.activeElement === input.current) {
      setActive(true);
    }

    const handleListItemClick = (item: any) => {
      setValue(item[filterBy]);
      onChoose(item);
      setActive(false);
    };
    const openModal = () => {
      openClientModal();
    };
    const handleInput = (e: any) => {
      setActive(true);
      setValue(e.target.value);
      setList(filterListBy(filterBy, textValue, list));
    };

    return (
      <Box>
        <CommonInput
          label={label}
          name={name}
          value={textValue}
          onChange={(e) => handleInput(e)}
          autocomplete='off'
          simple
          ref={input}
        >
          {children}
        </CommonInput>
        {filteredList && active && (
          <Dropdown>
            {filteredList.map((item: any, i: number) => (
              <DropdownItem
                key={i}
                onClick={() => handleListItemClick(item)}
              >
                <Name>{item.name}</Name>
                <Phone>{item.phone}</Phone>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
        <IconAdd onClick={openModal}>+</IconAdd>
      </Box>
    );
  }
);

export default inject('modalStore')(AutocompleteInput);
