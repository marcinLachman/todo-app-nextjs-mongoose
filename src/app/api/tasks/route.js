import { NextResponse } from "next/server";
import { connect } from "@/app/services/dbConnect";

import Tasks from "@/app/models/TaskModels";

export async function POST(request) {
  try {
    const { taskName, taskDescription, dateExpired } = await request.json();
    await connect();

    await Tasks.create({ taskName, taskDescription, dateExpired });

    return NextResponse.json(
      { message: "Success added task" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant post task: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();
    const tasks = await Tasks.find();
    return NextResponse.json(
      { message: "Success get all tasks", tasks },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Cant get all tasks: ${error}` },
      { status: 500 }
    );
  }
}
