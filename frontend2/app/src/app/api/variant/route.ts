import { NextResponse } from "next/server"; 

import pool from "@/lib/gcp/db"; 

export async function GET() { 

    try { 
        const connection = await pool; 

        if (!connection) { 
            throw new Error("Database connection pool is undefined"); 
        } 

        const [rows] = await connection.query("SELECT * FROM menu_variant"); 

        return NextResponse.json(rows, { status: 200 }); 
        

    } catch (error: any) { 

        console.error("Error:", error.message); 

        return NextResponse.json( 
            { error: "Failed to fetch menu variants", details: error.message }, 
            { status: 500 }, 
        ); 

    } 

} 