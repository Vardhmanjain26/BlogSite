class AddTopicToPosts < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :topic, foreign_key: true
  end
end
