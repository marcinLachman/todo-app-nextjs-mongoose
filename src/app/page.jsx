"use client";

import { useState, useEffect } from "react";
import DisplayTask from "./components/DisplayTask";
import { fetchAllTasks } from "./services/fetchFunctions";

export default function Home() {
  const [isLoading, setIsLodading] = useState(false);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLodading(true);
      const data = await fetchAllTasks();
      setTasks(data.tasks);
    } catch (error) {
      setIsLodading(true);
      console.log(error.message);
    } finally {
      setIsLodading(false);
    }
  };

  return (
    <main className="space-y-4">
      <h1 className="text-center text-sm md:text-xl lg:text-2xl font-bold">
        {isLoading ? "Wczytuję danę" : "Zadania do wykonania"}
      </h1>
      {tasks?.map((task) => (
        <div
          className="w-4/6 mx-auto py-4 px-2 text-black bg-lime-300 rounded-lg"
          key={task._id}
        >
          <DisplayTask task={task} />
        </div>
      ))}
    </main>
  );
}
