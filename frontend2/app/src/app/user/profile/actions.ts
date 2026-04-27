"use server";
import getPool from "@/lib/gcp/db";

interface AdditionalInfo {
  id: number;
  user_id: string;
  display_name: string;
  allergies: string;
  phone_number: string;
}

type ActionResult = {
  ok: boolean;
};

export async function getAdditionalInfoByUserId(userID: string) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    const [rows] = await connection.query(
      "SELECT id, user_id, display_name, allergies, phone_number FROM additional_info WHERE UUID_TO_BIN(?) = user_id LIMIT 1",
      [userID],
    );
    //turn the id to a string
    const typedRows = rows as AdditionalInfo[];
    if (typedRows[0]) {
      typedRows[0].user_id = Buffer.from(typedRows[0].user_id).toString("hex");
    }
    return typedRows[0] ?? null;
  } catch (error: any) {
    throw new Error("Failed to fetch additional info");
  }
}

export async function insertAdditionalInfo(userAdditionalInfo: AdditionalInfo) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    await connection.query(
      "INSERT INTO additional_info (user_id, display_name, allergies, phone_number) VALUES (UUID_TO_BIN(?), ?, ?, ?)",
      [
        userAdditionalInfo.user_id,
        userAdditionalInfo.display_name,
        userAdditionalInfo.allergies,
        userAdditionalInfo.phone_number,
      ],
    );
    return { ok: true };
  } catch (error: any) {
    console.error(
      "Insert error details:",
      error.message,
      error.code,
      error.sqlState,
    );
    throw new Error(`Failed to insert additional info: ${error.message}`);
  }
}

export async function updateAdditionalInfo(additionalInfo: AdditionalInfo) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    await connection.query(
      "UPDATE additional_info SET user_id = UUID_TO_BIN(?), display_name = ?, allergies = ?, phone_number=? WHERE id = ?",
      [
        additionalInfo.user_id,
        additionalInfo.display_name,
        additionalInfo.allergies,
        additionalInfo.phone_number,
        additionalInfo.id,
      ],
    );
    return { ok: true };
  } catch (error: any) {
    throw new Error("Failed to update additional info");
  }
}
