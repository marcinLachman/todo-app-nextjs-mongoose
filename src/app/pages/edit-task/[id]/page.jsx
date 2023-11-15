"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  deleteTask,
  fetchTaskById,
  updateTask,
} from "@/app/services/fetchFunctions";

export default function EditTask({ params }) {
  const router = useRouter();
  const [isLoading, setIsLodading] = useState(false);
  const [input, setInput] = useState({
    taskName: "",
    taskDescription: "",
    dateExpired: "",
  });

  useEffect(() => {
    fetchDataById();
  }, []);

  const handleChanage = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const fetchDataById = async () => {
    try {
      setIsLodading(true);
      const data = await fetchTaskById(params.id);
      setInput({
        taskName: data.task.taskName,
        taskDescription: data.task.taskDescription,
        dateExpired: data.task.dateExpired,
        isActive: data.task.isActive,
      });
    } catch (error) {
      setIsLodading(true);
      console.log(error.message);
    } finally {
      setIsLodading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateTask({
        _id: params.id,
        taskName: input.taskName,
        taskDescription: input.taskDescription,
        dateExpired: input.dateExpired,
        updatedAt: new Date().toISOString(),
      });
      router.push("/");
    } catch (error) {
      console.log(`Cant update Task: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Jesteś pewien, że chcesz usunąć te zadanie")) {
        await deleteTask(params.id);
        router.push("/");
      } else {
        return;
      }
    } catch (error) {
      console.log(`Cant delete Task: ${error.message}`);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-center text-sm md:text-xl lg:text-2xl font-bold">
        {isLoading ? "Wczytuję danę" : "Uaktualnij zadanie"}
      </h1>
      <form
        className="flex flex-col justify-center space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-3/4 lg:w-2/4 mx-auto py-4 px-2 text-black bg-lime-300 outline-none rounded-lg placeholder:text-black"
          type="text"
          placeholder="Nazwa zadania"
          id="taskName"
          name="taskName"
          value={input.taskName}
          onChange={handleChanage}
        />
        <textarea
          className="w-3/4 lg:w-2/4 mx-auto py-4 px-2 text-black bg-lime-300 outline-none rounded-lg placeholder:text-black"
          type="text"
          placeholder="Dodaj opis zadania"
          rows={4}
          cols={50}
          id="taskDescription"
          name="taskDescription"
          value={input.taskDescription}
          onChange={handleChanage}
        ></textarea>
        <input
          className="w-3/4 lg:w-2/4 mx-auto py-4 px-2 text-black bg-lime-300 outline-none rounded-lg placeholder:text-black"
          type="date"
          id="dateExpired"
          name="dateExpired"
          value={input.dateExpired.slice(0, 10)}
          onChange={handleChanage}
        />
        <div className="mx-auto space-x-4">
          <button
            className="w-fit bg-lime-300 mx-auto text-black py-2 px-4 rounded-lg hover:bg-lime-600 hover:duration-700"
            type="submit"
          >
            Uaktualnij zadanie
          </button>
          <button
            className="w-fit bg-red-700 mx-auto text-white py-2 px-4 rounded-lg hover:bg-red-500 hover:duration-700"
            type="button"
            onClick={handleDelete}
          >
            Usuń zadanie
          </button>
        </div>
      </form>
    </section>
  );
}
