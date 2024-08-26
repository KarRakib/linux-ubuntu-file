import connectDB from "@/app/libs/ConnectDB"
import { SocialPosts } from "@/app/libs/Models/models";

export const GET = async (req) => {
    try {
        await connectDB();
        const data = await SocialPosts.find({})
        return new Response(JSON.stringify(data), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response('error ', { status: 500 })

    }
} 