class Playlist < ApplicationRecord
  belongs_to :author
  has_many :playlist_post_items, dependent: :destroy
  has_many :posts, through: :playlist_post_items
end
