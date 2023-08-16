class AddPasswordDigestToAuthors < ActiveRecord::Migration[7.0]
  def change
    add_column :authors, :password_digest, :string
  end
end
