class AddViewCountToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :view_count, :integer, default: 0
    change_column_default :posts, :view_count, 0
    change_column :posts, :view_count, :integer, null: false, default: 0
  end
end
