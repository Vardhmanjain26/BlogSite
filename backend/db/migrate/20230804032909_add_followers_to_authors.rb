class AddFollowersToAuthors < ActiveRecord::Migration[7.0]
  def change
    add_column :authors, :followers, :integer, default: 0
  end
end
