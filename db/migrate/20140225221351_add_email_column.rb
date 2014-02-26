class AddEmailColumn < ActiveRecord::Migration
  def change
    add_column :entries, :email, :string
    remove_column :entries, :user_id   
  end
end
