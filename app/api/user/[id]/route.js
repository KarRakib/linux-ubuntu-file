
import connectDB from "@/app/libs/ConnectDB";
import { SocialPosts, SocialUsers } from "@/app/libs/Models/models"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const user = await SocialUsers.findOne({ clerkId: params.id })
            .populate({
                path: "posts savedPosts likedPosts",
                model: SocialPosts,
                populate: {
                    path: 'creator',
                    model: SocialUsers,
                },
            })
            .exec();
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to get user', { status: 500 });
    }
};
