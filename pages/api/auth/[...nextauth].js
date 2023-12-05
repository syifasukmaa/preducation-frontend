import { loginAdmin } from "@/utils/fetch";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const response = await loginAdmin(username, password);
        const data = await response.json();
        if (response?.ok) {
          return data.data;
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.accessToken = token.token;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(nextAuthOptions);
