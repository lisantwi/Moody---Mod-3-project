class CreateUserMoods < ActiveRecord::Migration[5.2]
  def change
    create_table :user_moods do |t|
      t.references :User, foreign_key: true
      t.references :Mood, foreign_key: true
      t.date :date_entry
      t.text :note

      t.timestamps
    end
  end
end
