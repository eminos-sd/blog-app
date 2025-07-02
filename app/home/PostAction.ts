"use server";
import { db } from "@/app/index";
import { Post } from "../db/schema";
import { desc, eq, is } from "drizzle-orm";

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
  userId: string
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

    return newPost[0]; // Return the inserted post
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
