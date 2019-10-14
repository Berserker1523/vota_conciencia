import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Task from "./Task.jsx";
//Using data from a collection
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/tasks.js";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import { Meteor } from "meteor/meteor";

// App component - represents the whole app
const App = props => {
  const [newTaskName, setNewTaskName] = useState("");
  const [hideCompleted, setHideCompleted] = useState("");
  const inRef = useRef();

  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const onChangeNewTaskName = () => {
    setNewTaskName(inRef.current.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    Meteor.call("tasks.insert", newTaskName.trim());

    setNewTaskName("");
  };

  const renderTasks = () => {
    let filteredTasks = props.tasks;
    if (hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map(task => {
      const currentUserId = props.currentUser && props.currentUser._id;

      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Todo List ({props.incompleteCount})</h1>

        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={hideCompleted}
            onClick={toggleHideCompleted}
          />
          Hide Completed Tasks
        </label>

        <AccountsUIWrapper />
        {props.currentUser ? (
          <form className="new-task" onSubmit={handleSubmit}>
            <input
              value={newTaskName}
              onChange={onChangeNewTaskName}
              type="text"
              ref={inRef}
              placeholder="Type to add new tasks"
            />
          </form>
        ) : (
          ""
        )}
      </header>

      <ul>{renderTasks()}</ul>
    </div>
  );
};

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired
};

const AppWrapper = withTracker(() => {
  Meteor.subscribe("tasks");

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user()
  };
})(App);

export default AppWrapper;