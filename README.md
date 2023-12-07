# Functionality

## Features

- Input Field: Allows users to enter task descriptions.
- Task Creation: Creates a new task and adds it to the list.
- Task Editing: Edits an existing task's description.
- Task Filtering: Filters tasks based on completion status (All, Pending, Completed).

## Usage Instructions

- Input Field: Enter task descriptions in the provided input field.
- Create TODO Button: Creates a new task based on the entered description.
- Save Edit Button: Saves the edited task's description.
- Filter Buttons: Filters tasks based on completion status (All, Pending, Completed).

# Code Explanation

## The code for the AddTask component includes:

- Definition of the component using React functional component syntax.
- Usage of useSelector and useDispatch hooks from react-redux.
- Handling user input, creating, editing, and filtering tasks.
- Integration with Redux store actions (addTask, editSelectedTask, filterTasks, resetFilters).
- Interaction with local storage for task management operations.
