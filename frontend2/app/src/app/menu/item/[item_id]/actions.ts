"use server";
import { cookies } from "next/headers";
import getPool from "@/lib/gcp/db";

interface response {
  ok: boolean;
}

export async function getVariant() {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

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
    const pool = await getPool();
    const connection = await pool.getConnection();

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
  const pool = await getPool();
  const connection = await pool.getConnection();

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
  const pool = await getPool();
  const connection = await pool.getConnection();

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
  const pool = await getPool();
  const connection = await pool.getConnection();

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
  const pool = await getPool();
  const connection = await pool.getConnection();

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

export async function itemExistsInCart(
  cart_id: number,
  menu_id: number,
  menu_variant_id: number,
  topping_id: number | null,
  modification_id: number | null,
) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query(
      "SELECT * FROM holds WHERE cart_id = ? AND menu_id = ? AND menu_variant_id = ? AND topping_id <=> ? AND modification_id <=> ?",
      [cart_id, menu_id, menu_variant_id, topping_id, modification_id],
    );
    return { ok: true, data: rows.length > 0 };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to fetch ingredients",
      details: error.message,
    };
  }
}

export async function getQuantityVariantId(variantId: number, menuId: number) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query(
      "SELECT quantity FROM menu_variant WHERE id = ? AND menu_id = ?",
      [variantId, menuId],
    );
    return { ok: true, data: rows[0].quantity };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to fetch menu variant quantity",
      details: error.message,
    };
  }
}

export async function updateMenuVariantQuantity(
  variantId: number,
  menuId: number,
  quantity: number,
  subtract: boolean,
) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const quantityResponse = await getQuantityVariantId(variantId, menuId);
    if (!quantityResponse.ok || quantityResponse.data === undefined) {
      throw new Error("Failed to fetch menu variant quantity");
    }

    if (subtract) {
      //lol forgot to check if quanity is enough I was going into negatives...
      if (quantityResponse.data < quantity) {
        throw new Error("Not enough quantity in stock");
      }
      const [rows] = await connection.query(
        "UPDATE menu_variant SET quantity = quantity - ? WHERE id = ? AND menu_id = ? AND quantity >= ?",
        [quantity, variantId, menuId, quantityResponse.data],
      );
    } else {
      const [rows] = await connection.query(
        "UPDATE menu_variant SET quantity = quantity + ? WHERE id = ? AND menu_id = ?",
        [quantity, variantId, menuId],
      );
    }
    return { ok: true };
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      ok: false,
      error: "Failed to update menu variant quantity",
      details: error.message,
    };
  }
}
//whenever I call add to cart, I also need to updateFunction function from the context
export async function addToCart(
  cart_id: number,
  menu_id: number,
  menu_variant_id: number,
  topping_id: number | null,
  modification_id: number | null,
  quantity: number,
) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    //BUG Found: so I guess I can't add same item twice due to duplicates
    //but it intuitively makes sense to just update the quantity.
    //1. Check if the item with the same variant, topping, and modification already exists in the cart
    const response = await itemExistsInCart(
      cart_id,
      menu_id,
      menu_variant_id,
      topping_id,
      modification_id,
    );
    if (!response.ok) {
      throw new Error("Failed to check if item exists in cart");
    }

    const quantityResponse = await getQuantityVariantId(
      menu_variant_id,
      menu_id,
    );
    if (!quantityResponse.ok || quantityResponse.data === undefined) {
      throw new Error("Failed to fetch menu variant quantity");
    }
    const updateQuantityResponse = await updateMenuVariantQuantity(
      menu_variant_id,
      menu_id,
      quantity,
      true,
    );
    if (!updateQuantityResponse.ok) {
      throw new Error("Failed to update menu variant quantity");
    }
    if (response.data) {
      //then update the quantity of the existing item given the menu_variant_id quantity has enough in stock
      const [rows] = await connection.query(
        "UPDATE holds SET quantity = quantity + ? WHERE cart_id = ? AND menu_id = ? AND menu_variant_id = ? AND topping_id <=> ? AND modification_id <=> ?",
        [
          quantity,
          cart_id,
          menu_id,
          menu_variant_id,
          topping_id,
          modification_id,
        ],
      );
      return { ok: true, data: rows.affectedRows };
    } else {
      const [rows] = await connection.query(
        "INSERT INTO holds (cart_id, menu_id, menu_variant_id, topping_id, modification_id, quantity) VALUES (?, ?, ?, ?, ?, ?)",
        [
          cart_id,
          menu_id,
          menu_variant_id,
          topping_id,
          modification_id,
          quantity,
        ],
      );
      return { ok: true, data: rows.insertId };
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

export async function createCartId() {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query(
      "INSERT INTO cart (created_at) VALUES (NOW())",
    );
    return { ok: true, data: rows.insertId };
  } catch (error) {
    console.error("Error creating cart ID:", error);
    return { ok: false, data: null };
  }
}

export async function getOrCreateCartId() {
  const store = await cookies();
  const existing = store.get("cart_id")?.value;

  if (existing) {
    const id = Number(existing);
    if (!Number.isNaN(id)) return id;
  }

  const created = await createCartId();
  if (!created.ok || !created.data) {
    throw new Error("Could not create cart");
  }

  const newId = Number(created.data);
  //I'm gonna hold the cart id in a cookie for 30 days, this is not the most secure way to do it
  store.set("cart_id", String(newId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return newId;
}

export async function getCardId() {
  const store = await cookies();
  const existing = store.get("cart_id")?.value;

  if (existing) {
    const id = Number(existing);
    if (!Number.isNaN(id)) return id;
  }
  return existing ? Number(existing) : null;
}

export async function getCartQuantity(cart_id: number) {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query(
      "SELECT SUM(quantity) as total_quantity FROM holds WHERE cart_id = ?",
      [cart_id],
    );
    return { ok: true, data: rows[0].total_quantity || 0 };
  } catch (error) {
    console.error("Error fetching cart quantity:", error);
    return { ok: false, data: null };
  }
}
