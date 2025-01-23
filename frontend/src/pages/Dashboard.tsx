import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

// Define Task Type
interface Task {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  priority: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    startTime: null as string | null,
    endTime: null as string | null,
    priority: "",
    status: "pending",
  });

  useEffect(() => {
    // Fetch tasks from the API
    axios
      .get("http://localhost:8000/task/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load tasks");
      });
  }, []);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


  const handleTimeChange = (name: string, time: string) => {
    setFormData({
      ...formData,
      [name]: time,
    });
  };

  const handleCreateTask = () => {
    axios
      .post("http://localhost:8000/tasks", formData)
      .then((res) => {
        toast.success("Task created successfully");
        setFormData({
          title: "",
          startTime: null,
          endTime: null,
          priority: "",
          status: "pending",
        });
        setTasks([...tasks, res.data]);
      })
      .catch((err) => {
        toast.error("Failed to create task");
        console.error(err);
      });
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white" }}>Create a New Task</h1>

      {/* Task Creation Form */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ color: "white" }}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #444",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1, marginRight: "10px" }}>
            <label style={{ color: "white" }}>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime || ""}
              onChange={(e) => handleTimeChange("startTime", e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                backgroundColor: "#333",
                color: "white",
                border: "1px solid #444",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ color: "white" }}>End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime || ""}
              onChange={(e) => handleTimeChange("endTime", e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                backgroundColor: "#333",
                color: "white",
                border: "1px solid #444",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            />
          </div>
        </div>

        <label style={{ color: "white" }}>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleFormChange}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #444",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label style={{ color: "white" }}>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleFormChange}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #444",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={handleCreateTask}
          style={{
            backgroundColor: "#6C63FF",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Task
        </button>
      </div>

      {/* Task Cards */}
      <h2 style={{ color: "white", marginTop: "40px" }}>Your Tasks</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              backgroundColor: "#1d1d1d",
              padding: "20px",
              borderRadius: "5px",
              width: "calc(33% - 20px)",
            }}
          >
            <h3 style={{ color: "white" }}>{task.title}</h3>
            <p style={{ color: "white" }}>
              Start Time: {format(new Date(task.startTime), "hh:mm a")}
            </p>
            <p style={{ color: "white" }}>
              End Time: {format(new Date(task.endTime), "hh:mm a")}
            </p>
            <p style={{ color: "white" }}>Priority: {task.priority}</p>
            <p style={{ color: "white" }}>Status: {task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;