# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Mood.destroy_all
UserMood.destroy_all

#Seeding Mood Data
happy = Mood.create(name: "happy")
sad = Mood.create(name: "sad")
anxious = Mood.create(name:"anxious")
calm = Mood.create(name:"calm")
angry = Mood.create(name: "angry")

#Seeding User data
harum = User.create(name: "Harum")

harum_happy = UserMood.create(user_id: harum.id, mood_id: happy.id, note: "Hello, I'm happy", date_entry: 20190816)

