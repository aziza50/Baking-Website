// import { db } from "@/db";
// import { additional_info } from "@/db/schema";

// export async function GET() {
//   try {
//     const items = await db.select().from(additional_info);
//     console.log("Items from database:", items);
//     return new Response(JSON.stringify(items), {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching items from database:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch items" }), {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       status: 500,
//     });
//   }
// }
