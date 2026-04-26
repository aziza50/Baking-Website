"use server";
import { pool } from "@/lib/gcp/db";
import {
  addToCart,
  updateMenuVariantQuantity,
} from "@/app/menu/item/[item_id]/actions";

interface response {
  ok: boolean;
}

export async function removeFromCart(
  cart_id: number,
  menu_id: number,
  variant_id: number,
  quantity: number,
) {
  try {
    const connection = await pool;
    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }
    const [rows] = await connection.query(
      "DELETE FROM holds WHERE cart_id = ? AND menu_id = ?",
      [cart_id, menu_id],
    );

    //Need to add that quantity back to the menu_variant table
    const quantityResponse = await updateMenuVariantQuantity(
      variant_id,
      menu_id,
      quantity,
      false,
    );

    if (!quantityResponse.ok) {
      //well this is awkward, roll back the delete and return an error
      const response = await addToCart(cart_id, menu_id, variant_id, quantity);

      if (!response.ok) {
        //this is even more awkward haha
        console.error(
          "Failed to roll back cart item after quantity update failure",
        );
      } else {
        console.error("Rolled back cart item after quantity update failure");
      }

      throw new Error("Failed to update menu variant quantity");
    }

    return { ok: true, data: rows.affectedRows };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { ok: false, data: null };
  }
}

export async function makeOrder(cart_id: number, user_id: string) {
  try {
    const connection = await pool;

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query(
      "INSERT INTO makes_order (cart_id, user_id) VALUES (?, ?)",
      [cart_id, user_id],
    );
    return { ok: true, data: rows.insertId };
  } catch (error) {
    console.error("Error making order:", error);
    return { ok: false, data: null };
  }
}

export async function getCartItems(cart_id: number) {
  try {
    const connection = await pool;

    if (!connection) {
      throw new Error("Database connection pool is undefined");
    }

    const [rows] = await connection.query(
      `SELECT
        h.cart_id,
        h.menu_id,
        h.menu_variant_id,
        h.topping_id,
        h.modification_id,
        h.quantity,
        m.name AS product_name,
        m.image_url AS product_image_url,
        mv.size AS product_size,
        mv.price AS product_price,
        mv.quantity AS variant_quantity,
        mv.count AS variant_count
      FROM holds h
      INNER JOIN menu_item m ON m.id = h.menu_id
      INNER JOIN menu_variant mv ON mv.id = h.menu_variant_id
      WHERE h.cart_id = ?`,
      [cart_id],
    );
    return { ok: true, data: rows };
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return { ok: false, data: null };
  }
}
