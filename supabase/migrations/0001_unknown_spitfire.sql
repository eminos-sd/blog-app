ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "post_tags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "tags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "comments" CASCADE;--> statement-breakpoint
DROP TABLE "post_tags" CASCADE;--> statement-breakpoint
DROP TABLE "tags" CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;