class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :topic
      t.string :featured_image
      t.text :text
      t.datetime :published_at
      t.references :author, foreign_key: true
      t.integer :likes_count, default: 0 # Add column for likes count
      t.integer :comments_count, default: 0 # Add column for comments count
      
      t.timestamps
    end
  end
end
