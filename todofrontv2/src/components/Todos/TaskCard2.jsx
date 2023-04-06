import { useSoftDeleteTaskMutation } from "../../features/todosSlice";

function TaskCard({ task }) {
  // DELETE LOGIC
  const [softDeleteTask] = useSoftDeleteTaskMutation();
  const handleDelete = () => {
    softDeleteTask(task.id);
  };

  return (
    <>
      <div>
        <p>titre:{task.title}</p>
        <p>descr:{task.description}</p>
        <button onClick={handleDelete}>delete me</button>
      </div>
    </>
  );
}

export default TaskCard;
