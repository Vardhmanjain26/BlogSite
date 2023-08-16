class PlaylistPostItem < ApplicationRecord
  belongs_to :playlist
  belongs_to :post
end
