import { NextResponse } from "next/server";
import { connect } from "@/app/services/dbConnect";

import Tasks from "@/app/models/TaskModels";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { taskName, taskDescription, dateExpired, isActive } =
      await request.json();
    await connect();

    const task = await Tasks.findByIdAndUpdate(
      { _id: id },
      { taskName, taskDescription, dateExpired, isActive }
    );

    if (!task) {
      return NextResponse.json({ message: "Task Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Success updated tasks", task },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant update task: ${error}` },
      { status: 500 }
    );
  }
}
