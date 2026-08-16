class AddContentCreatorUniqness < ActiveRecord::Migration[7.1]
  def change
    add_index :content_creators, :name, unique: true
    add_index :content_creators, :channel_url, unique: true
  end
end
