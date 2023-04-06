import TaskCard2 from "./TaskCard2";

function TodoCard({ todo, tasks }) {
  // console.log(tasks);

  // const {
  //   data: tasksById,
  //   error: tasksByIdError,
  //   isError: tasksByIdIsError,
  //   isLoading: tasksByIdIsLoading,
  //   isSuccess: tasksByIdIsSuccess,
  // } = useGetAllTasksByTodoIdQuery(todo.id);
  // console.log(tasksById);

// filter from tasks (all) to get only the todo.id tasks
const tasksById = tasks?.data?.filter((task) => task.id_Todo === todo.id);
// console.log(tasksById);

  return (
    <>
      <u>{todo?.title} ({tasksById.length} taches)</u>
      <div>
        {tasksById?.map((task) => (
          <div key={task.id}>
            <TaskCard2 task={task} />
          </div>
        ))}
      </div>


    </>
  );
}

export default TodoCard;
