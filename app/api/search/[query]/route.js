import connectDB from "@/app/libs/ConnectDB";
import { SocialPosts } from "@/app/libs/Models/models";


export const GET = async (req, { params }) => {
  const { query } = params;

  try {
    await connectDB();

    const searchedPosts = await SocialPosts.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    }).populate("creator likes").exec();

    return new Response(JSON.stringify(searchedPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get posts by search", { status: 500 })
  }
};
