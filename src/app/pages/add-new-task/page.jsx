"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { postTask } from "@/app/services/fetchFunctions";

export default function AddNewTask() {
  const router = useRouter();
  const [input, setInput] = useState({
    taskName: "",
    taskDescription: "",
    dateExpired: new Date().toISOString(),
  });

  const handleChanage = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await postTask(input);
      router.push("/");
    } catch (error) {
      console.log(`Cant create new Task: ${error.message}`);
    }
  };

  return (
    <section className=" space-y-4">
      <h1 className="text-center text-sm md:text-xl lg:text-2xl font-bold">
        Dodaj nowe zadanie
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
          min={new Date().toISOString().slice(0, 10)}
          value={input.dateExpired.slice(0, 10)}
          onChange={handleChanage}
        />
        <button
          className="w-fit bg-lime-300 mx-auto text-black py-2 px-4 rounded-lg hover:bg-lime-600 hover:duration-700"
          type="submit"
        >
          Dodaj Nowe zadanie
        </button>
      </form>
    </section>
  );
}
