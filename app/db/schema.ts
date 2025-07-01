import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Define the public users table
export const User = pgTable("users", {
  id: uuid().primaryKey(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export type User = typeof User.$inferInsert;

export const userRelations = relations(User, ({ many }) => ({
  posts: many(Post), // One user can have many posts
}));

export const userCommitRelations = relations(User, ({ many }) => ({
  posts: many(Comment), // One user can have many posts
}));

// Define the posts table
export const Post = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 1000 }).notNull(),
  user_id: uuid()
    .notNull()
    .references(() => User.id),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export type Post = typeof Post.$inferInsert;

export const postRelations = relations(Post, ({ one }) => ({
  author: one(User, {
    fields: [Post.user_id],
    references: [User.id],
  }),
}));

export const PostTagRelations = relations(Post, ({ many }) => ({
  postsTag: many(PostTag), // One user can have many posts
}));

export const Comment = pgTable("comments", {
  id: uuid().defaultRandom().primaryKey(),
  post_id: integer().notNull(),
  user_id: uuid()
    .notNull()
    .references(() => User.id),
  content: varchar({ length: 1000 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

export type Comment = typeof Comment.$inferInsert;

// Define the tags table
export const Tag = pgTable("tags", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export type Tag = typeof Tag.$inferInsert;

export const TagRelations = relations(Tag, ({ many }) => ({
  postsTag: many(PostTag), // One user can have many posts
}));

// Define the post_tags model (many-to-many relationship)
export const PostTag = pgTable("post_tags", {
  post_id: uuid()
    .notNull()
    .references(() => Post.id),
  tag_id: uuid()
    .notNull()
    .references(() => Tag.id),
});

export type PostTag = typeof PostTag.$inferInsert;

export const postTagRelations = relations(PostTag, ({ one }) => ({
  post: one(Post, {
    fields: [PostTag.post_id],
    references: [Post.id],
  }),
  tag: one(Tag, {
    fields: [PostTag.tag_id],
    references: [Tag.id],
  }),
}));
