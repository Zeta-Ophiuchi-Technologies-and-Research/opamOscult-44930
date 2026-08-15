import { auth, currentUser } from "@clerk/nextjs/server";

export default async function userLoginObjectCheck() {
  await auth.protect();
  const user = await currentUser();
  if (!user) return null;
  return user;
}
