import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './Route';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ExamsTable from '../pages/Exams';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            element={<Dashboard />}
            allowedRoles={['master', 'admin', 'coordinator']}
          />
        }
      />
      <Route
        path="/exames"
        element={
          <PrivateRoute
            element={<ExamsTable />}
            allowedRoles={['master', 'admin', 'coordinator']}
          />
        }
      />

      <Route path="/" element={<Login />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
};

export default AppRouter;
