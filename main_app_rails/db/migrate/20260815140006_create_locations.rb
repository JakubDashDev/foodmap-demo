class CreateLocations < ActiveRecord::Migration[7.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.decimal :latitude
      t.decimal :longitude
      t.string :cuisine_type
      t.text :description
      t.timestamps
    end

    add_index :locations, [:name, :address], unique: true
  end
end
