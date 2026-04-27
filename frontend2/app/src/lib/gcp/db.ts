import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import mysql from "mysql2/promise";

let pool: any = null;

async function getPool(): Promise<any> {
  if (pool) {
    return pool;
  }

  const instanceConnectionName =
    process.env.INSTANCE_CONNECTION_NAME || process.env.NEXT_DB_CONNECTION_NAME;
  const useCloudSqlConnector =
    process.env.USE_CLOUD_SQL_CONNECTOR === "true" ||
    (process.env.VERCEL === "1" && Boolean(instanceConnectionName));

  if (instanceConnectionName && useCloudSqlConnector) {
    const connector = new Connector();

    const clientOptions = await connector.getOptions({
      instanceConnectionName,
      ipType: IpAddressTypes.PUBLIC,
    });

    pool = mysql.createPool({
      connectionLimit: 5,
      waitForConnections: true,
      queueLimit: 0,
      user: process.env.NEXT_DB_USER,
      password: process.env.NEXT_DB_PASSWORD,
      database: process.env.NEXT_DB_NAME,
      ...clientOptions,
    });
  } else {
    pool = mysql.createPool({
      host: process.env.NEXT_DB_HOST || "localhost",
      port: parseInt(process.env.NEXT_DB_PORT || "3306"),
      user: process.env.NEXT_DB_USER,
      password: process.env.NEXT_DB_PASSWORD,
      database: process.env.NEXT_DB_NAME,
      enableCleartextPlugin: true,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
    });
  }

  return pool;
}

export default getPool;
