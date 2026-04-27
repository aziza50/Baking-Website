"use server";
import getPool from "@/lib/gcp/db";
interface response {
  ok: boolean;
}

export async function getCollection() {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query("SELECT * FROM menu_item");

    return { ok: true, data: rows };
  } catch (error: any) {
    console.error("Error:", error.message);

    return {
      ok: false,
      error: "Failed to fetch menu items",
      details: error.message,
    };
  }
}
