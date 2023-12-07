import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import AdminTopbar from '../../../pages/private/admin/topbar/AdminTopbar';
import InnerLayout from '../../layouts/InnerLayout';

const AdminPage: FC = () => {
  const [currentTheme, setTheme] = useState('default');
  const toggleTheme = (name: 'default' | 'dark') => {
    setTheme(name);
  };

  return (
    <>
      <InnerLayout
        toggleTheme={toggleTheme}
        currentTheme={currentTheme}
      >
        <div>
          <AdminTopbar />
          <Outlet />
        </div>
      </InnerLayout>
    </>
  );
};

export default AdminPage;
