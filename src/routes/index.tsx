import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './Route';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ExamsTable from '../pages/Exams';
import PrivateLayout from '../layouts/PrivateLayout'; // ajuste o caminho conforme sua estrutura

const AppRouter = () => {
  return (
    <Routes>
      {/* Pública */}
      <Route path="/" element={<Login />} />

      {/* Privadas (com Layout) */}
      <Route
        element={
          <PrivateRoute
            element={<PrivateLayout />} // 👈 pai com Outlet
            allowedRoles={['master', 'admin', 'coordinator']}
          />
        }
      >
        {/* Filhas renderizadas dentro do <Outlet /> do PrivateLayout */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exames" element={<ExamsTable />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
};

export default AppRouter;
