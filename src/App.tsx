import { Routes, Route } from 'react-router-dom';
import { 
  Home, 
  Aunthentication, 
  Dashboard, 
  Account, 
  ApiDocs, 
  Success, 
  Settings, 
  Customers, 
  Webhooks, 
  Transactions,
  AccountSettings,
  ApiManagement,
  Notifications,
  PaymentMethods,
  Fees,
  Profile
 } from './pages';
import HomeWrapper from './hooks/HomeWrapper';
import DashboardWrapper from './hooks/DashboardWrapper';

const App = () => {
  const AuthenticationComponent = HomeWrapper(Aunthentication);
  const HomeComponent = HomeWrapper(Home);
  const ApiDocsComponent = HomeWrapper(ApiDocs);
  const DashboardComponent = DashboardWrapper(Dashboard)
  const AccountComponent = DashboardWrapper(Account)
  const SuccessComponent = HomeWrapper(Success)
  const SettingsComponent = DashboardWrapper(Settings)
  const CustomerComponent = DashboardWrapper(Customers)
  const WebhooksComponent = DashboardWrapper(Webhooks)
  const TransactionsComponent = DashboardWrapper(Transactions)
  const ApiManagementComponent = DashboardWrapper(ApiManagement)
  const AccountSettingsComponent = DashboardWrapper(AccountSettings)
  const NotificationsComponent = DashboardWrapper(Notifications)
  const FeesComponent = DashboardWrapper(Fees)
  const PaymentMethodsComponent = DashboardWrapper(PaymentMethods)
  const ProfileComponent = DashboardWrapper(Profile)

  return (
    <Routes>
      <Route path='/auth' element={<AuthenticationComponent />} />
      <Route path='/' element={<HomeComponent />} />
      <Route path='/dashboard' element={<DashboardComponent />} />
      <Route path='/account' element={<AccountComponent />} />
      <Route path='/docs' element={<ApiDocsComponent />} />
      <Route path='/registration-success' element={<SuccessComponent />} />
      <Route path='/settings' element={<SettingsComponent />} />
      <Route path='/customers' element={<CustomerComponent />} />
      <Route path='/webhooks' element={<WebhooksComponent />} />
      <Route path='/transactions' element={<TransactionsComponent />} />
      <Route path='/api-management' element={<ApiManagementComponent />} />
      <Route path='/account-settings' element={<AccountSettingsComponent />} />
      <Route path='/notifications' element={<NotificationsComponent />} />
      <Route path='/fees' element={<FeesComponent />} />
      <Route path='/payment-methods' element={<PaymentMethodsComponent />} />
      <Route path='/profile' element={<ProfileComponent />} />
    </Routes>
  )
}

export default App
