"use server";
import { pool } from "@/lib/gcp/db";
import { createClient } from "@/lib/supabase/server";

interface UserRecord {
  id: string;
  email: string;
  created_at: string;
}

interface response {
  ok: boolean;
}

/*supabase handles auth so after user logs in; I'm gonna add them to the users table */
export async function addUser(userInfo: { id: string; email: string }) {
  if (!userInfo || !userInfo.id || !userInfo.email) {
    throw new Error("Invalid user information provided");
  }
  try {
    const connection = await pool;
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    const [rows] = await connection.query(
      "INSERT INTO users (id, email, created_at) VALUES (UUID_TO_BIN(?), ?, NOW())",
      [userInfo.id, userInfo.email],
    );
    return { ok: true };
  } catch (error: any) {
    console.error("Error:", error.message);
    throw new Error("Failed to add user: " + error.message);
  }
}

/* Retrieve a user by their ID - need for authentication purposes*/
export async function getUserById(userId: string): Promise<UserRecord | null> {
  try {
    const connection = await pool;
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    const [rows] = await connection.query(
      `SELECT
        BIN_TO_UUID(id) AS id,
        email,
        created_at
      FROM users
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1`,
      [userId],
    );
    const typedRows = rows as UserRecord[];
    return typedRows[0] ?? null;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw new Error("Failed to fetch user: " + error.message);
  }
}

export async function getUserFromSupabase() {
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return user
      ? {
          id: user?.id,
          email: user?.user_metadata?.email,
          created_at: user?.created_at,
        }
      : null;
  } catch (error) {
    throw new Error(
      "Failed to fetch user from Supabase: " + (error as Error).message,
    );
  }
}

export async function ensureUserExists(userInfo: {
  id: string;
  email: string;
}) {
  const existingUser = await getUserById(userInfo.id);

  if (existingUser) {
    return existingUser;
  }

  const response = await addUser(userInfo);
  if (!response.ok) {
    throw new Error("Failed to add user to database");
  }
  return getUserById(userInfo.id);
}
