class CreateCrumbs < ActiveRecord::Migration
  def change
    create_table :crumbs do |t|
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.integer :user_id, null: false
      t.datetime :timestamp, null: false
      t.text :message

      t.timestamps null: false
    end

    add_index :crumbs, :user_id
    add_index :crumbs, :timestamp
  end
end
