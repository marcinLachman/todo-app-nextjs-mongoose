"use client";

import { useState } from "react";
import Link from "next/link";

import { FiEdit3 } from "react-icons/fi";
import { changeStatus } from "../services/fetchFunctions";

export default function DisplayTask({ task }) {
  const [isActive, setIsActive] = useState(task.isActive);

  const handleChange = async () => {
    try {
      setIsActive((current) => !current);
      await changeStatus({
        _id: task._id,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        dateExpired: task.dateExpired,
        isActive: !isActive,
      });
    } catch (error) {
      console.log(`Cant front update task Task: ${error.message}`);
    }
  };

  return (
    <>
      <div className="flex justify-between px-8">
        <div className="flex space-x-6 items-center">
          <input
            type="checkbox"
            className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6 accent-green-500"
            checked={isActive || new Date(task.dateExpired) < new Date()}
            onChange={handleChange}
          />
          <h1
            className={`${
              isActive || new Date(task.dateExpired) < new Date()
                ? "text-sm md:text-xl lg:text-2xl font-bold line-through opacity-50"
                : "text-sm md:text-xl lg:text-2xl font-bold"
            }`}
          >
            {task.taskName}
          </h1>
        </div>
        <Link
          href={`${
            isActive || new Date(task.dateExpired) < new Date()
              ? ""
              : `/pages/edit-task/${task._id}`
          }`}
        >
          {/* <Link href={`/pages/edit-task/${task._id}`}> */}
          {isActive || new Date(task.dateExpired) < new Date() ? (
            <FiEdit3 className="text-md md:text-2xl lg:text-4xl invisible" />
          ) : (
            <FiEdit3 className="text-md md:text-2xl lg:text-4xl" />
          )}
        </Link>
      </div>
      <div className="flex space-x-4">
        <p
          className={`${
            isActive || new Date(task.dateExpired) < new Date()
              ? "text-sm line-through opacity-50"
              : "text-sm"
          }`}
        >
          Data utworzenia: {new Date(task.createdAt).toISOString().slice(0, 10)}
        </p>
        <p
          className={`${
            isActive || new Date(task.dateExpired) < new Date()
              ? "text-sm line-through opacity-50"
              : "text-sm"
          }`}
        >
          Data zakończenia: {task.dateExpired.slice(0, 10)}
        </p>
      </div>
      <p
        className={`${
          isActive || new Date(task.dateExpired) < new Date()
            ? "mt-4 px-8 line-through opacity-50"
            : "mt-4 px-8"
        }`}
      >
        {task.taskDescription}
      </p>
    </>
  );
}
