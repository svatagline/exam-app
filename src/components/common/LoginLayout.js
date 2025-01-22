
import { ToastContainer  } from 'react-toastify';
  export const LoginLayout = ({ children }) => {
    return <>
    {children}
    <ToastContainer />
    </>;
  };