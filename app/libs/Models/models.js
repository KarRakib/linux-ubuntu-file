import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    uinque: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialPosts" }],
    default: [],
  },
  savedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialPosts" }],
    default: [],
  },
  likedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialPosts" }],
    default: [],
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialUsers" }],
    default: [],
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialUsers" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SocialUsers",
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  postPhoto: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  likes: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "SocialUsers"}],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Register the models with Mongoose
export const SocialUsers = mongoose.models.SocialUsers || mongoose.model('SocialUsers', UserSchema);
export const SocialPosts = mongoose.models.SocialPosts || mongoose.model('SocialPosts', PostSchema);
