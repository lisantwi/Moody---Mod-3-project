class AddisPublicToUserMood < ActiveRecord::Migration[5.2]
  def change
    add_column :user_moods, :is_public, :boolean, default: false
  end
end
