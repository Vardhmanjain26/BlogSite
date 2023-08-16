class Follow < ApplicationRecord
    belongs_to :follower, class_name: 'Author'
    belongs_to :followed, class_name: 'Author'
end
