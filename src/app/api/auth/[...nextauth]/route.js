import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram"
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AcountType } from "@prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {

        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name ? profile.family_name : ' ',
          email: profile.email,

          // image: profile.picture,
          role: {
            connectOrCreate: {
              where: {
                role_name: AcountType.CUSTOMER,
              },
              create: {
                role_name: AcountType.CUSTOMER,
              },
            },
          },
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          firstName: profile.name,
          lastName: profile.name,
          email: profile.email,
          // image: profile.picture.data.url,
          role: {
            connectOrCreate: {
              where: {
                role_name: AcountType.CUSTOMER,
              },
              create: {
                role_name: AcountType.CUSTOMER,
              },
            },
          },
        };
      },
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          username: profile.name,
          email: profile.email,
       // image: profile.picture.data.url,
          role: {
            connectOrCreate: {
              where: {
                role_name: AcountType.CUSTOMER
              },
              create: {
                role_name: AcountType.CUSTOMER
              }
            },
          },
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            }, // Include the role relation
          },
        });
        if (!existingUser) {
          return null;
        }
        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          return null;
        }

        let permissions = [];
        if (existingUser.role.permissions) {
          permissions = existingUser.role.permissions.map((per) => {
            return per.permission.permission_name;
          });
        }
        return {
          id: existingUser.id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          account_type: existingUser.account_type,
          role: existingUser.role.role_name,
          roles: existingUser.role,
          permissions: permissions,
          status: existingUser.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        return {
          ...user,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
          firstName: token.firstName,
          lastName: token.lastName,
          image: token.image,
          account_type: token.account_type,
          role: token.role,
          status: token.status,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
