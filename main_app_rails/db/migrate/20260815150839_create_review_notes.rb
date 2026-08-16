class CreateReviewNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :review_notes do |t|
      t.text :description
      t.timestamps

      t.references :review, null: false, foreign_key: true
    end
  end
end
