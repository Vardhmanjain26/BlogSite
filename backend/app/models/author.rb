class Author < ApplicationRecord
    has_many :posts
    has_secure_password
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
    has_many :follower_relationships, class_name: 'Follow', foreign_key: 'followed_id'
    has_many :followers, through: :follower_relationships, source: :follower
    has_many :save_for_laters
    has_many :playlists, dependent: :destroy

    has_many :followed_relationships, class_name: 'Follow', foreign_key: 'follower_id'
    has_many :followeds, through: :followed_relationships, source: :followed
end
