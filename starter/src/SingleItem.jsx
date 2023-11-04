import { useDeleteTask, useEditTask } from './reactQueryCustomHooks';

const SingleItem = ({ item }) => {
  const { editTask, loadingEdit } = useEditTask();
  const { deleteTask, loadingDelete } = useDeleteTask();

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
        disabled={loadingEdit}
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
        onClick={() => deleteTask(item.id)}
        disabled={loadingDelete}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
