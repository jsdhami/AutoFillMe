import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
import connectToDatabase from "./src/lib/db";
import { createDynamicModel } from "./src/lib/schema/user_collection";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user }) {
            const email = user.email;

            if (!email) {
                return false; // Reject if email is not available
            }

            await connectToDatabase();

            // Create or use the collection with the user's email
            const dynamicModel = createDynamicModel(email);
            const exists = await dynamicModel.exists({});

            if (!exists) {
                console.log(`Creating collection for ${email}`);
                await dynamicModel.create({ createdAt: new Date(), initial: true });
            } else {
                console.log(`Collection for ${email} already exists`);
            }
            return true; // Allow login
        },
    },
})