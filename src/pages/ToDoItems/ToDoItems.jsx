import "./ToDoitems.css";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import { Navigate } from "react-router-dom";
import { server } from "../../App";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const ToDoitems = () => {
  const title = useRef();
  const description = useRef();
  const { isAuthenticated, loading, setLoading } = useContext(context);
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);

  const deleteTask = (id) => {
    setLoading(true);
    toast.loading("Deleting task..");
    fetch(`${server}/tasks/deleteTask/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        toast.dismiss();
        setLoading(false);
        toast.success(json.message);
        setRefresh((prev) => !prev);
      })
      .catch((e) => toast.error(e));
  };

  const updateTask = (id) => {
    setLoading(true);
    toast.loading("Updating task..");
    fetch(`${server}/tasks/updateTask/${id}`, {
      method: "PUT",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        toast.dismiss();
        toast.success(json.message);
        setRefresh((prev) => !prev);
      })
      .catch((e) => toast.error(e));
  };

  const addTask = async () => {
    try {
      toast.loading("Adding task..");
      const response = await fetch(`${server}/tasks/addTask`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.current.value,
          description: description.current.value,
        }),
      });

      toast.dismiss();
      const json = await response.json();

      if (json.success) {
        toast.success(json.message);

        title.current.value = "";
        description.current.value = "";
        setRefresh((prev) => !prev);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${server}/tasks/getMyTasks`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        setTasks(json.tasks);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="outer-container">
      <div className="first-container">
        <input
          type="text"
          className="input"
          placeholder="Task title"
          ref={title}
        />
        <input
          type="text"
          className="input"
          placeholder="Task Description"
          ref={description}
        />
        <button className="add-task" onClick={addTask}>
          Add Task
        </button>
      </div>
      {loading && <Loader />}
      {tasks.map((task) => {
        return (
          <ToDoItem
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        );
      })}
    </div>
  );
};

export default ToDoitems;
