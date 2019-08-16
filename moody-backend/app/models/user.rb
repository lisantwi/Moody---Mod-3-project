class User < ApplicationRecord
    has_many :user_moods, dependent: :destroy
    has_many :moods, through: :user_moods
end
