"use server";
import { db } from "@/app/index";
import { Post } from "../db/schema";
import { desc, eq, is } from "drizzle-orm";
import { createClient } from "@/utils/supabase/server";

type PostType = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

// Fetch posts for a specific user
export const fetchPosts = async (userId: string) => {
  try {
    // Fetch posts from Drizzle ORM based on user_id
    const posts = await db
      .select()
      .from(Post)
      .where(eq(Post.user_id, userId)) // Filter by user_id
      .orderBy(desc(Post.created_at)); // Sort by creation date
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

// Add a new post for the logged-in user
export const addPost = async (
  title: string,
  content: string,
  userId: string,
  image: File | null
) => {
  try {
    // Insert new post using Drizzle ORM
    const newPost = await db
      .insert(Post)
      .values({
        title,
        content,
        user_id: userId,
      })
      .returning({
        id: Post.id,
        title: Post.title,
        content: Post.content,
        created_at: Post.created_at,
        updated_at: Post.updated_at,
      });

    const post = newPost[0];

    // If file is provided, upload image and update post with image URL
    if (image) {
      const imageUrl = await uploadImage(image, post.id);

      if (imageUrl) {
        // Update the post with the image URL
        await db
          .update(Post)
          .set({ image_url: imageUrl })
          .where(eq(Post.id, post.id))
          .returning({
            id: Post.id,
            title: Post.title,
            content: Post.content,
            created_at: Post.created_at,
            updated_at: Post.updated_at,
          });
      }
    }

    return post; // Return the inserted post
  } catch (error) {
    console.error("Error adding post:", error);
    throw new Error("Failed to create post");
  }
};

export const deletePost = async (postId: string) => {
  try {
    await db.delete(Post).where(eq(Post.id, postId));
  } catch (error) {
    console.error("Error delete post:", error);
    throw new Error("Failed to delete post");
  }
};

export const editPost = async (id: string, title: string, content: string) => {
  try {
    const updatedPost = await db
      .update(Post)
      .set({ title: title, content: content })
      .where(eq(Post.id, id))
      .returning({
        id: Post.id,
        title: Post.title,
        content: Post.content,
        created_at: Post.created_at,
        updated_at: Post.updated_at,
      });
    return updatedPost[0];
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
};

const uploadImage = async (file: File, postId: string) => {
  const supabase = await createClient();
  const storagePath = `posts/${postId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("post-images")
    .upload(storagePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: publicData } = supabase.storage
    .from("post-images")
    .getPublicUrl(storagePath);

  if (!data) {
    console.error("Error getting public URL:");
    return null;
  }
  return publicData.publicUrl;
};
