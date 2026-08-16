class CreateRefreshTokens < ActiveRecord::Migration[7.1]
  def change
    create_table :refresh_tokens do |t|
      t.string :family_uuid, null: false
      t.string :token_digest, null: false
      t.datetime :used_at
      t.datetime :expires_at, null: false

      t.references :admin_user, null: false, foreign_key: true
      t.timestamps
    end

    add_index :refresh_tokens, :token_digest, unique: true
    add_index :refresh_tokens, :family_uuid
  end
end
