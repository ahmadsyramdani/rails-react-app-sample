# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
AdminUser.destroy_all
Worksheet.destroy_all

ActiveRecord::Base.connection.execute("TRUNCATE users RESTART IDENTITY")
ActiveRecord::Base.connection.execute("TRUNCATE admin_users RESTART IDENTITY")
ActiveRecord::Base.connection.execute("TRUNCATE worksheets RESTART IDENTITY")

user = User.create(email: "user@example.com", password: "password123")
AdminUser.create(email: "admin@example.com", password: "password123")

9.times do |i|
  Worksheet.create(
    title: BetterLorem.w(15, true),
    description: BetterLorem.p(1, true, true ),
    number_of_question: rand(1..100),
    total_score: 100,
    obtained_score: rand(20..100)
  )
end
