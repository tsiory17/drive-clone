"use server";
// flow
// Enter name + email → Check if exists → Send OTP → Verify OTP → Create user → Authenticate
//
// Enter email → Check if exists → Send OTP → Verify OTP → Authenticate

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query } from "node-appwrite";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listRows(
    appwriteConfig.databaseId,
    appwriteConfig.usersTable,
    [Query.equal("email", email)],
  );

  return result.total > 0 ? result.Rows[0] : null;
};

const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingAccount = await getUserByEmail(email);
};
