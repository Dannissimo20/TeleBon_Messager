import { PropsWithChildren, useRef } from 'react';

import { inject, observer } from 'mobx-react';

import { Close, SidebarContent, Wrapper } from './CommonSidebar.styled';
import CreateClientSidebar from './create/client/sidebar/CreateClientSidebar';
import CreateEmployeerSidebar from './create/employeers/sidebar/CreateEmployeerSidebar';
import CreateServiceSidebar from './create/service/sidebar/CreateServiceSidebar';

import SidebarStore from '../../../store/sidebarStore';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

interface IProps extends PropsWithChildren {
  sidebarStore?: SidebarStore;
}

const CommonSidebar: React.FC<IProps> = observer((props) => {
  const { children, sidebarStore } = props;
  const { showSidebar, closeSidebar, sidebarName, sidebarPayload, afterCloseSidebar, classSidebar } = sidebarStore!;
  const wrapperRef = useRef(null);
  const sidebars = {
    CREATE_EMPLOYEE: (
      <CreateEmployeerSidebar
        sidebarPayload={sidebarPayload}
        closeSidebar={closeSidebar}
      />
    ),
    EDIT_EMPLOYEE: (
      <CreateEmployeerSidebar
        sidebarPayload={sidebarPayload}
        closeSidebar={closeSidebar}
        edit={true}
      />
    ),
    CREATE_SERVICE: (
      <CreateServiceSidebar
        sidebarPayload={sidebarPayload}
        closeSidebar={closeSidebar}
      />
    ),
    EDIT_SERVICE: (
      <CreateServiceSidebar
        sidebarPayload={sidebarPayload}
        closeSidebar={closeSidebar}
        edit={true}
      />
    ),
    CREATE_CLIENT: (
      <CreateClientSidebar
        sidebarPayload={sidebarPayload}
        closeSidebar={closeSidebar}
      />
    ),
    EDIT_CLIENT: (
      <CreateClientSidebar
        sidebarPayload={sidebarPayload}
        closeSidebar={closeSidebar}
        edit={true}
      />
    ),
    '': ''
  };

  const handleClose = () => {
    closeSidebar();
  };

  return (
    <>
      {showSidebar && (
        <>
          <Wrapper ref={wrapperRef}>
            <Close onClick={handleClose}>
              <CloseIcon />
            </Close>
            <SidebarContent>
              {sidebars[sidebarName]}
              {children}
            </SidebarContent>
          </Wrapper>
        </>
      )}
    </>
  );
});

export default inject('sidebarStore')(CommonSidebar);
