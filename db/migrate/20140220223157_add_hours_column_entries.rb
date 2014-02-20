class AddHoursColumnEntries < ActiveRecord::Migration
  def change
    add_column :entries, :hours, :integer
  end
end
