import "./ToDoItem.css";

const ToDoItem = ({ task, deleteTask, updateTask }) => {
  const { title, description, isCompleted, _id } = task;
  return (
    <div className="to-do-item">
      <div className="content">
        <p className="to-do-title">{title}</p>
        <p className="to-do-description">{description}</p>
      </div>
      <div className="to-do-btns">
        <input
          className="checkbox"
          type="checkbox"
          name="checkbox"
          onChange={() => updateTask(_id)}
          checked={isCompleted}
        />
        <button
          className="delete"
          style={{
            marginTop: "0",
            width: "6rem",
          }}
          onClick={() => deleteTask(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
