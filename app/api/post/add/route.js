import connectDB from "@/app/libs/ConnectDB";
import { SocialPosts, SocialUsers } from "@/app/libs/Models/models";
import { writeFile } from "fs/promises";
import fs from 'fs';
import path from 'path';
export const POST = async(req) =>{
    console.log(req);
    
    
    try {
        await connectDB();
        const data = await req.formData();
        let postPhoto = data.get('postPhoto');
        const bytes = await postPhoto.arrayBuffer()
        const buffer = Buffer.from(bytes);
       
        // Determine the path to save the file
        const currentWorkingDirectory = process.cwd();
        const uploadsDir = path.join(currentWorkingDirectory, 'public', 'uploads');
        
        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Set the full path to save the photo
        const postPhotoPath = path.join(uploadsDir, postPhoto.name);
        
        // Save the file to the server
        await writeFile(postPhotoPath, buffer);
        postPhoto = `/uploads/${postPhoto.name}`;
        
        // Create a new post in the database
        const newPost = await SocialPosts.create({
            creator: data.get('creatorId'),
            caption: data.get('caption'),
            tag: data.get('tag'),
            postPhoto: postPhoto,
        });
        await newPost.save();

        // Update the user's posts array
        await SocialUsers.findByIdAndUpdate(
            data.get("creatorId"),
            { $push: { posts: newPost._id } },
            { new: true, useFindAndModify: false }
        );

        return new Response(JSON.stringify(newPost), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to create a new post', { status: 500 });
    }
};