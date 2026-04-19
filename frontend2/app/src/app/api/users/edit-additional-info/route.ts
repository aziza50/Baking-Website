import { NextResponse } from "next/server";
import { pool } from "@/lib/gcp/db";

interface AdditionalInfo {
  id: string;
  user_id: string;
  allergies: string;
  phone_number: string;
}

export async function POST(additionalInfo: AdditionalInfo) {
  try {
    const connection = await pool;
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    const buf = Buffer.alloc(16);
    buf.write(additionalInfo.id, "utf-8");
    //Need to cast userId to Binary(16) for MySQL
    const [rows] = await connection.query(
      "UPDATE additional_info SET user_id = ?, allergies = ?, phone_number=? WHERE id = ?",
      [
        additionalInfo.user_id,
        additionalInfo.allergies,
        additionalInfo.phone_number,
        buf,
      ],
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Failed to edit additional info", details: error.message },
      { status: 500 },
    );
  }
}
