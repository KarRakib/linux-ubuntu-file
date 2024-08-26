import connectDB from "@/app/libs/ConnectDB";
import { SocialUsers } from "@/app/libs/Models/models";


export const GET = async (req, { params }) => {
  const { query } = params;

  try {
    await connectDB();

    const searchedUsers = await SocialUsers.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    }).populate("posts savedPosts likedPosts followers following").exec();

    return new Response(JSON.stringify(searchedUsers), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get users by search", { status: 500 })
  }
}