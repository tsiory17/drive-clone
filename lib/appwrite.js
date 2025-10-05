import { Client, TablesDB, Account } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(`${PROJECT_ID}`); // Replace with your project ID

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
