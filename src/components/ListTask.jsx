import React from "react";
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux
import Task from "./Task"; // Importing the Task component

const ListTasks = () => {
  // Using useSelector hook to extract userTask from the Redux store state
  const tasks = useSelector((state) => state.task.userTask);

  return tasks?.length === 0 ? ( // Conditional rendering based on tasks length
    <p>You have no task</p>
  ) : (
    <div>
      {/* Mapping through tasks and rendering Task component for each task */}
      {tasks?.map((item) => (
        <Task key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ListTasks;
