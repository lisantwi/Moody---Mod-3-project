class AddLikesToUserMoods < ActiveRecord::Migration[5.2]
  def change
    add_column :user_moods, :likes, :integer
  end
end
