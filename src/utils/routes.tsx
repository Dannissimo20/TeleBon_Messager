import { Navigate } from 'react-router-dom';

import App from '../App';
import Analytics from '../components/views/analytics/Analytics';
import Auth from '../components/views/auth/Auth';
import { Call } from '../components/views/call/Call';
import Clients from '../components/views/clients/Clients';
import Conditions from '../components/views/conditions/Conditions';
import Confidentiality from '../components/views/confidentiality/Confidentiality';
import HelperAI from '../components/views/helper-ai/HelperAI';
import Management from '../components/views/managment/Management';
import Messenger from '../components/views/messenger/Messenger';
import PortalSettings from '../components/views/portalsettings/PortalSettings';
import Products from '../components/views/product/Products';
import Registration from '../components/views/registration/Registration';
import Settings from '../components/views/settings/Settings';
import Support from '../components/views/support/Support';
import { TaskBookPage } from '../components/views/task-book/TaskBook';
import Test from '../components/views/test/Test';
import Workbench from '../components/views/workbench/Workbench';
import AnalyticsContent from '../pages/private/analytics/AnalyticsContent';
import CallDialog from '../pages/private/call/CallDialog';
import CallProduct from '../pages/private/call/CallProduct';
import CallDialogInIdleTime from '../pages/private/call/dialog/in-idle-time/CallDialogInIdleTime';
import ManagmentEmployeers from '../pages/private/managment/employeers/ManagmentEmployeers';
import ManagementSchedule from '../pages/private/managment/schedule/ManagementSchedule';
import MessengerContent from '../pages/private/messenger/content/MessengerContent';
import PortalSettingsTarifs from '../pages/private/portalsettings/tarifs/PortalSettingsTarifs';
import EmployeeRecording from '../pages/private/product/EmployeeRecording';
import ProductSchedule from '../pages/private/product/ProductSchedule';
import Recording from '../pages/private/product/Recording';
import ServiceCategories from '../pages/private/service/categories/ServiceCategories';
import Classificators from '../pages/private/settings/classificators/Classificators';
import Payments from '../pages/private/settings/payments/Payments';
import { NewPassword } from '../pages/public/confirm-password/NewPassword';
import { ResetPassword } from '../pages/public/confirm-password/ResetPassword';
import { SuccessPassword } from '../pages/public/confirm-password/SuccessPassword';
import { RegistrationConfirm } from '../pages/public/register/registration-confirm/RegistrationConfirm';
import RegistrationContainer from '../pages/public/register/RegistrationContainer';
import NotFound from '../pages/public/not-found/NotFound';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/taskbook',
        element: <TaskBookPage />
      },
      {
        path: '/clients',
        element: <Clients />
      },
      {
        path: '/products',
        element: <Products />,
        children: [
          {
            index: true,
            element: <Navigate to='cabinets' />
          },
          {
            path: 'cabinets',
            element: <Recording />,
            children: [
              {
                path: ':productId',
                element: <ProductSchedule />
              }
            ]
          },
          {
            path: 'employee',
            element: <EmployeeRecording />,
            children: [
              {
                path: ':productId',
                element: <ProductSchedule />
              }
            ]
          }
        ]
      },
      {
        path: '/workbench',
        element: <Workbench />,
      },
      {
        path: '/call',
        element: <Call />,
        children: [
          {
            index: true,
            element: <Navigate to='dialog' />
          },
          {
            path: 'dialog',
            element: <CallDialog />,
            children: [
              {
                index: true,
                element: <Navigate to='inidletime' />
              },
              {
                path: 'inidletime',
                element: <CallDialogInIdleTime />
              }
            ]
          },
          {
            path: 'product',
            element: <CallProduct />
          }
        ]
      },
      {
        path: '/management',
        element: <Management />,
        children: [
          {
            path: 'schedule',
            element: <ManagementSchedule />
          },

          {
            path: 'service-categories',
            element: <ServiceCategories />
          },
          {
            path: 'employee',
            element: <ManagmentEmployeers />
          }
        ]
      },
      {
        path: '/messenger',
        element: <Messenger />,
        children: [
          {
            path: ':messengerId',
            element: <MessengerContent />,
            children: [
              {
                path: ':roomId',
                element: <MessengerContent />
              }
            ]
          }
        ]
      },
      {
        path: '/analytics',
        element: <Analytics />,
        children: [
          {
            path: ':analyticsId',
            element: <AnalyticsContent />
          }
        ]
      },
      {
        path: '/support',
        element: <Support />
      },
      {
        path: '/settings',
        element: <Settings />,
        children: [
          {
            index: true,
            element: <Navigate to='classificators' />
          },
          {
            path: 'classificators',
            element: <Classificators />
          },
          {
            path: 'payments',
            element: <Payments />
          }
        ]
      },
      {
        path: '/helperai',
        element: <HelperAI />
      },
      {
        path: '/conditions',
        element: <Conditions />
      },
      {
        path: '/confidentiality',
        element: <Confidentiality />
      },
      {
        path: '/portalsettings',
        element: <PortalSettings />,
        children: [
          {
            index: true,
            element: <Navigate to='tarif' />
          },
          {
            path: 'tarif',
            element: <PortalSettingsTarifs />
          }
          // {
          //   path: 'changetarif',
          //   element: <PortalSettingsChangeTarif />
          // }
        ]
      }
    ]
  },

  {
    path: '/testPage',
    element: <Test />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/registration',
    element: <Registration />,
    children: [
      {
        index: true,
        element: <RegistrationContainer />
      }
    ]
  },
  {
    path: '/confirm/:confirmKey',
    element: <RegistrationConfirm />
  },
  {
    path: '/password/recovery',
    element: <ResetPassword />
  },
  {
    path: '/password/update/:refreshToken',
    element: <NewPassword />
  },
  {
    path: '/password/success',
    element: <SuccessPassword />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
