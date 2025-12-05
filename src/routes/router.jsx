import { createBrowserRouter } from 'react-router';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import Service from '../pages/Service/Service';
import Coverage from '../pages/Coverage/Coverage';
import AboutUs from '../pages/AboutUs/AboutUs';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import PrivateRoute from './PrivateRoute';
import Rider from '../Rider/Rider';
import SendParcel from '../pages/sendParcel/SendParcel';
import DashboardLayout from '../layout/DashboardLayout';
import MyParcels from '../pages/Dashboard/MyParcels/MyParcels';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentSuccess from '../pages/Dashboard/Payment/PaymentSuccess';
import PaymentCancelled from '../pages/Dashboard/Payment/PaymentCancelled';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';
import ApproveRiders from '../pages/Dashboard/ApproveRiders/ApproveRiders';
import UsersManagement from '../pages/Dashboard/UsersManagement/UsersManagement';
import AdminRoute from './AdminRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/service',
        element: <Service></Service>
      },
      {
        path: '/coverage',
        element: <Coverage></Coverage>,
        hydrateFallbackElement: <p className='text-center'>Loading...</p>,
        loader: () => fetch('/serviceCenter.json').then(res=>res.json())
      },
      {
        path: '/send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        hydrateFallbackElement: <p className='text-center'>Loading...</p>,
        loader: () => fetch('/serviceCenter.json').then(res=>res.json())
      },
      {
        path: '/about-us',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>,
        hydrateFallbackElement: <p className='text-center'>Loading...</p>,
        loader: () => fetch('/serviceCenter.json').then(res=>res.json())
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: '/auth/register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "/dashboard/my-parcels",
        element: <MyParcels></MyParcels>
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "/dashboard/approve-riders",
        element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },
      {
        path: "/dashboard/users-management",
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      },
      {
        path: `/dashboard/payment/:parcelId`,
        element: <Payment></Payment>
      },
      {
        path: '/dashboard/payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "/dashboard/payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>
      }
    ]
  }
])

export default router;
