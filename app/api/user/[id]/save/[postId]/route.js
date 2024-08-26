import connectDB from "@/app/libs/ConnectDB"
import { SocialPosts, SocialUsers } from "@/app/libs/Models/models"


export const POST = async (req, { params }) => {
  try {
    await connectDB()

    const userId = params.id
    const postId = params.postId

    const user = await SocialUsers.findOne({ clerkId: userId }).populate("posts savedPosts likedPosts following followers")
    const post = await SocialPosts.findById(postId).populate("creator likes")

    const isSaved = user.savedPosts.find((item) => item._id.toString() === postId)

    if (isSaved) {
      user.savedPosts = user.savedPosts.filter((item) => item._id.toString() !== postId)
    } else {
      user.savedPosts.push(post)
    }

    await user.save()

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to save/unsave post", { status: 500 })
  }
}