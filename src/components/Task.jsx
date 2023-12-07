import React from "react";
import { useDispatch } from "react-redux";
import {
  editSelectedTask,
  resetFilters,
  updateTaskStatus,
} from "../features/task/taskSlice"; // Importing action creators from Redux slice
import { MdEditNote } from "react-icons/md";
import { RiDeleteBackFill } from "react-icons/ri";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helpers"; // Importing functions for local storage operations

const Task = ({ description, isDone, id }) => {
  const dispatch = useDispatch(); // Initialize dispatch function from react-redux

  // Handler for handling checkbox change
  const handleCheck = () => {
    const storedTasks = getTasksFromLocalStorage(); // Retrieve tasks from local storage
    // Toggle the isDone property for the specific task based on ID
    const result = storedTasks.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    dispatch(updateTaskStatus(result)); // Dispatch action to update task status in Redux store
    saveTasksToLocalStorage(result); // Save updated tasks to local storage
  };

  // Handler to find and edit a selected task
  const findSelectedTasksForEditing = () => {
    const storedTasks = getTasksFromLocalStorage(); // Retrieve tasks from local storage
    // Find the selected task based on ID and dispatch action to edit it in Redux store
    const result = storedTasks.find((item) => item.id === id);
    dispatch(editSelectedTask(result));
  };

  // Handler to delete a task
  const deleteTask = () => {
    const storedTasks = getTasksFromLocalStorage(); // Retrieve tasks from local storage
    // Filter out the task with the specific ID and save the updated tasks to local storage
    const result = storedTasks.filter((item) => item.id !== id);
    saveTasksToLocalStorage(result); // Save updated tasks to local storage
    dispatch(resetFilters()); // Dispatch action to reset filters in Redux store
  };

  return (
    <div className="flex items-center gap-6 justify-between mb-2">
      <div className="flex gap-4">
        {/* Checkbox to mark task as done */}
        <input type="checkbox" checked={isDone} onChange={handleCheck} />
        <p>{description}</p>
      </div>
      <div className="flex gap-4">
        {/* Button to edit the selected task */}
        <button onClick={findSelectedTasksForEditing}>
          <MdEditNote />
        </button>
        {/* Button to delete the task */}
        <button onClick={deleteTask}>
          <RiDeleteBackFill color="red" />
        </button>
      </div>
    </div>
  );
};

export default Task;
