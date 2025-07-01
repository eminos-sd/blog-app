ALTER TABLE "comments" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "post_tags" ALTER COLUMN "post_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "post_tags" ALTER COLUMN "tag_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "id" DROP IDENTITY;