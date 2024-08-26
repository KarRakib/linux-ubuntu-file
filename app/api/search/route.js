import connectDB from "@/app/libs/ConnectDB"
import { SocialPosts } from "@/app/libs/Models/models"


export const GET = async (req) => {
  try {
    await connectDB()

    const feedPosts = await SocialPosts.find().populate("creator likes").exec()

    return new Response(JSON.stringify(feedPosts), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to fetch all Feed Posts", { status: 500 })
  }
}