export async function fetchAllTasks() {
  const response = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
    next: {
      revalidate: 10,
    },
  });

  return response.json();
}

export async function fetchTaskById(id) {
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    cache: "no-store",
  });

  return response.json();
}

export async function postTask(data) {
  try {
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("cant create task");
    }
  } catch (error) {
    console.log(`Cant add new Task: ${error}`);
  }
}

export async function updateTask(data) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("cant update task");
    }
  } catch (error) {
    console.log(`Cant update Task: ${error}`);
  }
}

export async function changeStatus(data) {
  try {
    await fetch(`http://localhost:3000/api/changeStatus/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(`Cant front update task Task: ${error.message}`);
  }
}

export async function deleteTask(id) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "DELETE",
    "Content-Type": "application/json",
  });

  return {};
}
