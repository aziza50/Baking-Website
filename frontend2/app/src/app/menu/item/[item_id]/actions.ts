"use server";
import { pool } from "@/lib/gcp/db";

interface response {
  ok: boolean;
}

export async function getVariant() {
  try {
    const connection = await pool;

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query("SELECT * FROM menu_variant");

    return { ok: true, data: rows };
  } catch (error: any) {
    console.error("Error:", error.message);

    return {
      ok: false,
      error: "Failed to fetch menu variants",
      details: error.message,
    };
  }
}

export async function getVariantByItemId(menuId: number) {
  try {
    const connection = await pool;

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query(
      "SELECT * FROM menu_variant WHERE menu_id = ?",
      [menuId],
    );
    return { ok: true, data: rows };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to fetch menu variant",
      details: error.message,
    };
  }
}

export async function getMenuItemById(menuId: number) {
  const connection = await pool;

  if (!connection) {
    throw new Error("Database connection pool is undefined");
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM menu_item WHERE id = ?",
      [menuId],
    );
    return { ok: true, data: rows[0] };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to fetch menu item",
      details: error.message,
    };
  }
}

export async function getToppingsByMenuId(menuId: number) {
  const connection = await pool;

  if (!connection) {
    throw new Error("Database connection pool is undefined");
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM topping WHERE menu_id = ?",
      [menuId],
    );
    return { ok: true, data: rows };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to fetch toppings",
      details: error.message,
    };
  }
}

export async function getModificationsByMenuId(menuId: number) {
  const connection = await pool;

  if (!connection) {
    throw new Error("Database connection pool is undefined");
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM modification WHERE menu_id = ?",
      [menuId],
    );
    return { ok: true, data: rows };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to fetch modifications",
      details: error.message,
    };
  }
}

export async function getIngredientsByVariantId(variantId: number) {
  const connection = await pool;

  if (!connection) {
    throw new Error("Database connection pool is undefined");
  }

  try {
    const [rows] = await connection.query(
      "SELECT ingredient_id FROM menu_variant_ingredient WHERE menu_variant_id = ?",
      [variantId],
    );
    //now using the ingredients ids to fetch the ingredients
    const ingredientIds = rows.map(
      (row: { ingredient_id: number }) => row.ingredient_id,
    );
    if (ingredientIds.length === 0) {
      return { ok: true, data: [] };
    }
    const [ingredients] = await connection.query(
      "SELECT * FROM ingredient WHERE id IN (?)",
      [ingredientIds],
    );
    return { ok: true, data: ingredients };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to fetch ingredients",
      details: error.message,
    };
  }
}

export async function addToCart() {
  try {
    const connection = await pool;

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to add to cart",
      details: error.message,
    };
  }
}

export async function deleteFromCart() {}

export async function updateCart() {}
