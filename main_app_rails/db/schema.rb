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

ActiveRecord::Schema[7.1].define(version: 2026_08_15_191450) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["uuid"], name: "index_admin_users_on_uuid", unique: true
  end

  create_table "content_creators", force: :cascade do |t|
    t.string "name"
    t.string "avatar_url"
    t.string "channel_url"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_url"], name: "index_content_creators_on_channel_url", unique: true
    t.index ["name"], name: "index_content_creators_on_name", unique: true
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.decimal "latitude"
    t.decimal "longitude"
    t.string "cuisine_type"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "address"], name: "index_locations_on_name_and_address", unique: true
  end

  create_table "refresh_tokens", force: :cascade do |t|
    t.string "family_uuid", null: false
    t.string "token_digest", null: false
    t.datetime "used_at"
    t.datetime "expires_at", null: false
    t.bigint "admin_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_user_id"], name: "index_refresh_tokens_on_admin_user_id"
    t.index ["family_uuid"], name: "index_refresh_tokens_on_family_uuid"
    t.index ["token_digest"], name: "index_refresh_tokens_on_token_digest", unique: true
  end

  create_table "review_notes", force: :cascade do |t|
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "review_id", null: false
    t.index ["review_id"], name: "index_review_notes_on_review_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "source_url"
    t.integer "source_type"
    t.text "description"
    t.integer "rating"
    t.datetime "published_at"
    t.bigint "location_id", null: false
    t.bigint "content_creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["content_creator_id"], name: "index_reviews_on_content_creator_id"
    t.index ["location_id"], name: "index_reviews_on_location_id"
  end

  add_foreign_key "refresh_tokens", "admin_users"
  add_foreign_key "review_notes", "reviews"
  add_foreign_key "reviews", "content_creators"
  add_foreign_key "reviews", "locations"
end
