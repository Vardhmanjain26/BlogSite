# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_05_032505) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "authors", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.integer "followers_count", default: 0
    t.text "about"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "author_id", null: false
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
  end

  create_table "drafts", force: :cascade do |t|
    t.string "title"
    t.string "featured_image"
    t.string "topic_name"
    t.text "text"
    t.integer "author_id", null: false
    t.integer "topic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_drafts_on_author_id"
    t.index ["topic_id"], name: "index_drafts_on_topic_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_likes_on_author_id"
    t.index ["post_id"], name: "index_likes_on_post_id"
  end

  create_table "payments", force: :cascade do |t|
    t.integer "amount"
    t.string "status"
    t.string "payment_session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "author_id", null: false
    t.index ["author_id"], name: "index_payments_on_author_id"
  end

  create_table "playlist_post_items", force: :cascade do |t|
    t.integer "playlist_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id"], name: "index_playlist_post_items_on_playlist_id"
    t.index ["post_id"], name: "index_playlist_post_items_on_post_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.string "name"
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_playlists_on_author_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.string "topic"
    t.string "featured_image"
    t.text "text"
    t.datetime "published_at"
    t.integer "author_id"
    t.integer "likes_count", default: 0
    t.integer "comments_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "view_count", default: 0, null: false
    t.integer "reading_time", default: 0
    t.integer "topic_id"
    t.index ["author_id"], name: "index_posts_on_author_id"
    t.index ["topic_id"], name: "index_posts_on_topic_id"
  end

  create_table "save_for_laters", force: :cascade do |t|
    t.integer "author_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_save_for_laters_on_author_id"
    t.index ["post_id"], name: "index_save_for_laters_on_post_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "authors"
  add_foreign_key "comments", "posts"
  add_foreign_key "drafts", "authors"
  add_foreign_key "drafts", "topics"
  add_foreign_key "likes", "authors"
  add_foreign_key "likes", "posts"
  add_foreign_key "payments", "authors"
  add_foreign_key "playlist_post_items", "playlists"
  add_foreign_key "playlist_post_items", "posts"
  add_foreign_key "playlists", "authors"
  add_foreign_key "posts", "authors"
  add_foreign_key "posts", "topics"
  add_foreign_key "save_for_laters", "authors"
  add_foreign_key "save_for_laters", "posts"
end
