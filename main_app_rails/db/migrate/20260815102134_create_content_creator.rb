class CreateContentCreator < ActiveRecord::Migration[7.1]
  def change
    create_table :content_creators do |t|
      t.string :name
      t.string :avatar_url
      t.string :channel_url
      t.string :description

      t.timestamps
    end
  end
end
