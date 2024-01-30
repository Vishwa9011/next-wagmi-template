import toast from 'react-hot-toast';

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    let errorMessage = '';
    if (error.name === 'ContractFunctionExecutionError') {
      errorMessage = error.message.split('\n')[1];
      return toast.error(errorMessage);
    }
  } else if (typeof error === 'string') {
    console.error(error);
  }

  toast.error('An error occurred. Please try again later.');
};
