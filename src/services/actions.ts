"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(accessToken: string) {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    maxAge: 30 * 24 * 60 * 60, // 7 days
    path: "/",
  };

  cookieStore.set("accessToken", accessToken, cookieOptions);
}

// export async function removeAuthCookie() {
//   const cookieStore = await cookies()

//   cookieStore.delete('auth_token')
//   cookieStore.delete('user_type')
//   cookieStore.delete('onboarding_steps')
//   cookieStore.delete('onboarding_finished')
// }

export async function getTokenFromCookies() {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
}

// export async function updateOnboardingStatus(
//   onboarding_steps: string,
//   onboarding_finished: boolean
// ) {
//   const cookieStore = await cookies()
//   const cookieOptions = {
//     httpOnly: true,
//     secure: true,
//     // process.env.NODE_ENV === 'production',
//     sameSite: 'strict' as const,
//     maxAge: 7 * 24 * 60 * 60, // 7 days
//     path: '/',
//   }
//   cookieStore.set('onboarding_steps', onboarding_steps, cookieOptions)
//   cookieStore.set(
//     'onboarding_finished',
//     onboarding_finished.toString(),
//     cookieOptions
//   )
// }
