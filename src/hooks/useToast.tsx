import toast, { ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error';

const useToast = () => {
  const showToast = (message: string, type: ToastType) => {
    toast[type](message);
  };
  return showToast;
};

export default useToast;
