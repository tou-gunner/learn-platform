import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import comparePasswords from '../../../../utils/compare-password';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        //TODO: for test admin page
        if (credentials.email == 'admin@onemiracles.com') {
          return {
            id: 1,
            role: "admin",
            name: "admin",
            email: "www",
            image: "123",
          }
        } else if (credentials.email == 'instructor@onemiracles.com') {
          return {
            id: 1,
            role: "instructor",
            name: "instructor",
            email: "www",
            image: "123",
          }
        } else if (credentials.email == 'student@onemiracles.com') {
          return {
            id: 1,
            role: "student",
            name: "student",
            email: "www",
            image: "123",
          }
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        const validate = await comparePasswords(credentials.password, user.password);
        if (validate) {
          return user;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If it's the first time (sign in), attach user role to the token
      if (user) {
        token.role = user.role; // Add role from user to token
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the role to the session object
      session.user.role = token.role;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
