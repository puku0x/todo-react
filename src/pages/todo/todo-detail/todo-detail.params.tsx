import { useParams } from 'react-router-dom';

interface RouterParams {
  id: string;
}

export const useTodoDetailParams = () => {
  const { id } = useParams<RouterParams>();

  return {
    id,
  } as const;
};
