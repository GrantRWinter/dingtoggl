class AddIdToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :user_id, :integer
    remove_column :entries, :email
  end
end
