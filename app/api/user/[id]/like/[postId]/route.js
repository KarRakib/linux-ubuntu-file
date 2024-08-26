import connectDB from "@/app/libs/ConnectDB"
import { SocialPosts, SocialUsers } from "@/app/libs/Models/models"


export const POST = async (req, { params }) => {
  try {
    await connectDB()

    const userId = params.id
    const postId = params.postId

    const user = await SocialUsers.findOne({ clerkId: userId }).populate("posts savedPosts following followers").populate({
      path: "likedPosts",
      model: "SocialPosts",
      populate: {
        path: "creator",
        model: "SocialUsers",
      },
    })

    const post = await SocialPosts.findById(postId).populate("creator likes")

    const isLiked = user.likedPosts.find((item) => item._id.toString() === postId)

    if (isLiked) {
      user.likedPosts = user.likedPosts.filter((item) => item._id.toString() !== postId)
      post.likes = post.likes.filter((item) => item._id.toString() !== user._id.toString())
    } else {
      user.likedPosts.push(post._id)
      post.likes.push(user._id)
    }

    await user.save()
    await post.save()

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to like/dislike post", { status: 500 })
  }
}