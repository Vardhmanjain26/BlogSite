class CreatePlaylistPostItems < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_post_items do |t|
      t.references :playlist, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
