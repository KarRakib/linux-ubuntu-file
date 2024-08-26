import connectDB from "@/app/libs/ConnectDB";
import { SocialPosts, SocialUsers } from "@/app/libs/Models/models";

export const DELETE = async (req, { params }) => {
    try {
      await connectDB();
  
      await SocialPosts.findByIdAndDelete(params.id);
  
      const user = await SocialUsers.findByIdAndUpdate(
        params.creatorId,
        { $pull: { posts: params.id } },
        { new: true, useFindAndModify: false }
      )
        .populate("posts savedPosts likedPosts followers following")
        .exec();
  
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response("Failed to delete the post", { status: 500 });
    }
  };