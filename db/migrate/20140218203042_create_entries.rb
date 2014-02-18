class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :project
      t.text :comment
      t.datetime :date
      t.float :hours
      t.integer :user_id

      t.timestamps
    end
  end
end
