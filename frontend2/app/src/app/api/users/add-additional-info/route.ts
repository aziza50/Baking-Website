import { NextResponse } from "next/server";
import { pool } from "@/lib/gcp/db";

interface UserAdditionalInfo {
  id: BinaryType;
  user_id: string;
  allergies: string;
  phone_number: string;
}

export async function POST(userAdditionalInfo: UserAdditionalInfo) {
  try {
    const connection = await pool;
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    const [rows] = await connection.query(
      "INSERT INTO additional_info (id, user_id, allergies, phone_number) VALUES (?, ?, ?, ?)",
      [
        userAdditionalInfo.id,
        userAdditionalInfo.user_id,
        userAdditionalInfo.allergies,
        userAdditionalInfo.phone_number,
      ],
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Failed to add additional info", details: error.message },
      { status: 500 },
    );
  }
}
