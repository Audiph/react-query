import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SingleItem = ({ item }) => {
  const [isDone, setIsDone] = useState(item.isDone);
  const queryClient = useQueryClient();

  const { mutate: editTask, isLoading } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task updated');
      setIsDone(!isDone);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
        disabled={isLoading}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => console.log('delete task')}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
