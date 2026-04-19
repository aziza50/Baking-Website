import { NextResponse } from "next/server";
import { pool } from "@/lib/gcp/db";
import GetUserInfo from "@/components/get_user_info";

interface GetUserInfo {
  id: string;
  display_name: string;
  email: string;
  created_at: Date;
}

export async function POST(userInfo: GetUserInfo) {
  try {
    const connection = await pool;
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    const buf = Buffer.alloc(16);
    buf.write(userInfo.id, "utf-8");
    //Need to cast userId to Binary(16) for MySQL
    const [rows] = await connection.query(
      "INSERT INTO users (id, display_name, email, created_at) VALUES (?, ?, ?, ?)",
      [buf, userInfo.display_name, userInfo.email, userInfo.created_at],
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Failed to add user", details: error.message },
      { status: 500 },
    );
  }
}
