import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'password') {
          return { id: '1', name: 'Admin User', email: 'admin@example.com' }
        }
        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: { maxAge: 60 * 60 * 24 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
     };
     return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
})

export { handler as GET, handler as POST }
