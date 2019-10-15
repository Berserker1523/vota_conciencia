// Se esta usando?

import React /*, { useState } */ from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";

// Task component - represents a single todo item

const Task = props => {
  //const [err, setErr] = useState("");
  const togglePrivate = () => {
    Meteor.call("tasks.setPrivate", props.task._id, !props.task.private);
  };

  const toggleChecked = () => {
    Meteor.call(
      "tasks.setChecked",
      props.task._id,
      !props.task.checked
      /*, Is allowed pass a callback to error handling
      (err, res) => {
        if (err) {
          setErr(err);
          return;
        }

        console.log("Set checked: ", props.task._id, "\n" + res);
      }*/
    );
  };

  const deleteThisTask = () => {
    Meteor.call("tasks.remove", props.task._id);
  };

  // Give tasks a different className when they are checked off,
  // so that we can style them nicely in CSS
  const taskClassName = classnames({
    checked: props.task.checked,
    private: props.task.private
  });

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={deleteThisTask}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={props.task.checked}
        onClick={toggleChecked}
      />

      {props.showPrivateButton ? (
        <button className="toggle-private" onClick={togglePrivate}>
          {props.task.private ? "Private" : "Public"}
        </button>
      ) : (
        ""
      )}

      <span className="text">
        <strong>{props.task.username}</strong>: {props.task.text}
      </span>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  showPrivateButton: PropTypes.bool.isRequired
};

export default Task;
