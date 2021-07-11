import { useLocation } from 'react-router-dom';

export const useTodoListParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const limitParam = params.get('limit') || '10';
  const offsetParam = params.get('offset') || '0';

  return {
    limit: +limitParam,
    offset: +offsetParam,
  } as const;
};
