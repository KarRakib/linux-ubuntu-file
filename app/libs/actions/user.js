'use server'

import connectDB from "../ConnectDB";
import { SocialUsers } from "../Models/models";


export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  console.log('Attempting to create or update user:', id, first_name);

  try {
    await connectDB();
    console.log('Database connected');

    const existingUser = await SocialUsers.findOne({ clerkId: id });
    console.log('Existing user:', existingUser);

    if (existingUser) {
      const isDataChanged =
        existingUser.firstName !== first_name ||
        existingUser.lastName !== last_name ||
        existingUser.profilePhoto !== image_url ||
        existingUser.email !== email_addresses[0].email_address ||
        existingUser.username !== username;

      if (!isDataChanged) {
        console.log("No changes detected, user data not updated.");
        return existingUser;
      }

      const updatedUser = await SocialUsers.findOneAndUpdate(
        { clerkId: id },
        {
          $set: {
            firstName: first_name,
            lastName: last_name,
            profilePhoto: image_url,
            email: email_addresses[0].email_address,
            username: username,
          },
        },
        { new: true }
      );

      console.log("User updated:", updatedUser);
      return updatedUser;
    } else {
      const newUser = await SocialUsers.create({
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        profilePhoto: image_url,
        email: email_addresses[0].email_address,
        username: username,
      });

      console.log("New user created:", newUser);
      return newUser;
    }
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await connectDB();
    await SocialUser.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error(error);
  }
};
