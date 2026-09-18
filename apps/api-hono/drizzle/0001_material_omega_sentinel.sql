CREATE TABLE "watchlist_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"media_type" text NOT NULL,
	"title" text NOT NULL,
	"poster_url" text,
	"overview" text,
	"release_date" text,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "watchlist_item" ADD CONSTRAINT "watchlist_item_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "watchlist_user_provider_idx" ON "watchlist_item" USING btree ("user_id","provider_id","media_type");--> statement-breakpoint
CREATE INDEX "watchlist_user_idx" ON "watchlist_item" USING btree ("user_id");