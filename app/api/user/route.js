import connectDB from "@/app/libs/ConnectDB"
import { SocialUsers } from "@/app/libs/Models/models"

export const GET = async (req) => {
  try {
    await connectDB()

    const allUsers = await SocialUsers.find({})

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    return new Response("Failed to get all users", { status: 500 })
  }
}