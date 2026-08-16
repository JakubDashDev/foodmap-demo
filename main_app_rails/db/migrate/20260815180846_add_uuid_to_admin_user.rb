class AddUuidToAdminUser < ActiveRecord::Migration[7.1]
  def change
    add_column :admin_users, :uuid, :uuid, null: false, default: -> { "gen_random_uuid()" }
    add_index :admin_users, :uuid, unique: true
  end
end
