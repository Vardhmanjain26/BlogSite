class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.integer :follower_id, foreign_key: { to_table: :authors }
      t.integer :followed_id, foreign_key: { to_table: :authors }

      t.timestamps
    end
  end
end
