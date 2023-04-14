import { Routes, Route } from 'react-router-dom';
import { Home, Aunthentication, Dashboard, Account, ApiDocs } from './pages';
import HomeWrapper from './hooks/HomeWrapper';
import DashboardWrapper from './hooks/DashboardWrapper';

const App = () => {
  const AuthenticationComponent = HomeWrapper(Aunthentication);
  const HomeComponent = HomeWrapper(Home);
  const ApiDocsComponent = HomeWrapper(ApiDocs);
  const DashboardComponent = DashboardWrapper(Dashboard)
  const AccountComponent = DashboardWrapper(Account)

  return (
    <Routes>
      <Route path='/auth' element={<AuthenticationComponent />} />
      <Route path='/' element={<HomeComponent />} />
      <Route path='/dashboard' element={<DashboardComponent />} />
      <Route path='/account' element={<AccountComponent />} />
      <Route path='/docs' element={<ApiDocsComponent />} />
    </Routes>
  )
}

export default App
