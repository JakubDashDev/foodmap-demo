class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.string :source_url
      t.integer :source_type
      t.text :description
      t.integer :rating
      t.datetime :published_at

      t.references :location, null: false, foreign_key: true
      t.references :content_creator, null: false, foreign_key: true
      t.timestamps
    end
  end
end
