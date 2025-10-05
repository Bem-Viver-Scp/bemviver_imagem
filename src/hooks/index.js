import { jsx as _jsx } from "react/jsx-runtime";
import { AuthProvider } from './auth';
const AppProvider = ({ children }) => {
    return _jsx(AuthProvider, { children: children });
};
export default AppProvider;
