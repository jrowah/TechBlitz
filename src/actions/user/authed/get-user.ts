'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { prisma } from '@/utils/prisma';
import { UserRecord } from '@/types/User';
import { revalidateTag } from 'next/cache';

/**
 * Get the user from the server - used in api routes, server componets & server actions
 *
 * @returns User | null
 */
export const getUserFromSession = async () => {
  const supabase = await createServerClient();
  return await supabase?.auth?.getUser();
};

export const getUserFromDb = async (
  userUid: string
): Promise<UserRecord | null> => {
  if (!userUid) return null;
  const user = await prisma.users.findUnique({
    where: {
      uid: userUid,
    },
  });

  revalidateTag('user-details');

  if (!user) return null;

  return {
    ...user,
    codeEditorTheme: user.codeEditorTheme || undefined,
  };
};

/**
 * Method to get the user from the session, then return
 * the user's details from the database.
 *
 * We use this when we need to validate the user and their
 * permissions on the server, and cannot trust the client
 * to send the correct user details.
 *
 * @returns UserRecord | null
 */
export const getUser = async () => {
  const { data } = await getUserFromSession();
  if (!data?.user?.id) throw new Error('User not found');
  return await getUserFromDb(data.user.id);
};
