class AddAboutToAuthors < ActiveRecord::Migration[7.0]
  def change
    add_column :authors, :about, :text
  end
end
