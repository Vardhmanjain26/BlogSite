class RenameFollowersColumnInAuthors < ActiveRecord::Migration[7.0]
  def change
    rename_column :authors, :followers, :followers_count
  end
end
