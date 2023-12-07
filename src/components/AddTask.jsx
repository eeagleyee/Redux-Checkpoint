import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import {
  addTask,
  editSelectedTask,
  filterTasks,
  resetFilters,
} from "../features/task/taskSlice"; // Importing action creators from Redux slice
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helpers"; // Importing functions for local storage operations

const AddTask = () => {
  // Get the taskEditing state from the Redux store
  const { taskEditing } = useSelector((state) => state.task);

  // State to manage the input field value
  const [value, setValue] = React.useState("");

  // State to manage the task filtering status
  const [filtering, setFiltering] = React.useState(true);

  // Access the Redux dispatch function
  const dispatch = useDispatch();

  // Handle changes in the input field
  const handleInput = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  // Add a new task to the Redux store
  const handleCreateNewTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    dispatch(addTask(value));
    setValue("");
  };

  // Filter tasks based on completion status
  const handleFilterTasks = (params) => {
    setFiltering(false);
    let storedTasks = getTasksFromLocalStorage();
    let tempTasks = storedTasks.filter((item) => item.isDone === params);
    dispatch(filterTasks(tempTasks));
  };

  // Set the input field value when editing a task
  React.useEffect(() => {
    setValue(taskEditing.description || " ");
  }, [taskEditing.id]);

  // Save the edited task to local storage and Redux store
  const saveEditedTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    let storedTasks = getTasksFromLocalStorage();
    let result = storedTasks.map((item) => {
      if (item.id === taskEditing.id) {
        item.description = value;
      }
      return item;
    });

    saveTasksToLocalStorage(result);
    dispatch(resetFilters());
    setValue("");
    dispatch(editSelectedTask(""));
  };

  return (
    <div>
      {/* Create task section */}
      <section className="space-x-8 font-medium">
        <input
          onChange={handleInput}
          value={value}
          className="border-4 rounded-tl-xl p-2 border-green-950"
        />
        {/* Render appropriate button based on state */}
        {filtering || taskEditing ? (
          taskEditing ? (
            <button
              className="bg-green-950 rounded-md p-2 px-4 text-white hover:bg-green-500 font-medium"
              onClick={saveEditedTask}
            >
              Save Edit
            </button>
          ) : (
            <button
              onClick={handleCreateNewTask}
              className="bg-green-950 rounded-md p-2 px-4 text-white hover:bg-green-500 font-medium "
            >
              CREATE TODO
            </button>
          )
        ) : null}
      </section>
      {/* Filter tasks section */}
      <section className="flex gap-3 items-center my-3 font-medium ">
        <div className="space-x-6 bg-slate-200 flex items-center ">
          <p>Filter: </p>

          {/* Show all tasks */}
          <button
            onClick={() => {
              dispatch(resetFilters());
              setFiltering(true);
            }}
            className="bg-green-950 rounded-md p-2 px-6 text-white hover:bg-green-500"
          >
            All
          </button>

          {/* Filter pending tasks */}
          <button
            onClick={() => handleFilterTasks(false)}
            className="bg-orange-500 hover:bg-orange-700 p-2 px-4 rounded-md text-white"
          >
            Pending
          </button>

          {/* Filter completed tasks */}
          <button
            onClick={() => handleFilterTasks(true)}
            className="bg-green-950 rounded-md p-2 px-4 text-white hover:bg-green-500"
          >
            Completed
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddTask;
