import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      require: [true, "Proszę wpisać nazwę zadania"],
    },
    taskDescription: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    dateExpired: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

export default Tasks;
