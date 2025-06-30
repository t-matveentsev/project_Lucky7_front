import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNotFoundPage = () => {
  const navigate = useNavigate();
  return useCallback(() => {
    navigate('/not-found');
    // eslint-disable-next-line 
  }, []);
};
