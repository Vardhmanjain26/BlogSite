class CreateDrafts < ActiveRecord::Migration[7.0]
  def change
    create_table :drafts do |t|
      t.string :title
      t.string :featured_image
      t.string :topic
      t.text :text
      t.references :author, null: false, foreign_key: true
      t.references :topic, null: false, foreign_key: true
      t.timestamps
    end
  end
end
