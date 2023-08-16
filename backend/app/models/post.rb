class Post < ApplicationRecord
    belongs_to :author
    has_many :likes, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :save_for_laters, dependent: :destroy
    has_many :playlist_post_items, dependent: :destroy
    has_many :playlists, through: :playlist_post_items
end
