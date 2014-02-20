class AddMinutesColumnEntries < ActiveRecord::Migration
  def change
    add_column :entries, :minutes, :integer
    remove_column :entries, :hours
    
  end
end
