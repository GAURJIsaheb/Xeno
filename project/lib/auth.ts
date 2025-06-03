import { type AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin", // your custom sign-in page
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // If redirect url is relative, allow it
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // If it’s an absolute URL but on your domain, allow it
      try {
        const redirectUrl = new URL(url);
        if (redirectUrl.origin === baseUrl) return url;
      } catch {
        // invalid URL fallback
      }

      // Fallback redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
};
