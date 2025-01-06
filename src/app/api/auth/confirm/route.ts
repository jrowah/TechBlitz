import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/utils/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // pull the token has out of the query params
  // this gets set on the OTP in the email sent to the user
  // on signup
  const token_hash = searchParams.get('token_hash');
  // this will be the type of OTP that was sent to the user
  const type = searchParams.get('type') as EmailOtpType | null;

  // get the next URL from the query params - default to login for now
  const next = searchParams.get('next') ?? '/login';

  // clone the url so we can modify it
  const redirectTo = request.nextUrl.clone();
  // set the pathname to the next URL that is set above
  redirectTo.pathname = next;

  // delete the query params from the URL
  // so that the user doesn't see them when they get redirected
  // as javascript objects (the url object) are passed by reference
  // and not value. This means changing the searchParams on the
  // redirectTo object will also change the searchParams on the
  // request.nextUrl object.
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');

  // if we have the required vars to verify the OTP
  if (token_hash && type) {
    // create a new supabase client from our util
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // get the current user from the supabase client
      const { data: userSession } = await supabase.auth.getUser();

      // check if we have the user in the db and if not, create them
      const existingUser = await prisma.users.findUnique({
        where: { uid: userSession.user?.id },
      });

      if (!existingUser) {
        await prisma.users.create({
          data: {
            uid: userSession.user?.id ?? '',
            email: userSession.user?.email ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      // redirect the user to the next page
      redirectTo.searchParams.delete('next');
      return NextResponse.redirect('/login');
    } else {
      console.error('Error verifying OTP:', error.message);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error';
  return NextResponse.redirect(redirectTo);
}
