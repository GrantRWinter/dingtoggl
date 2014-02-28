# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
entries = Entry.create([{ project: "TA", comment: "had to stay late by half hour", date: "sunday the 1st", hours: 2.0, user_id: 2 },
  { project: "TA", comment: "Understaffed", date: "sat", hours: 5.0, user_id: 2 },
  { project: "HTML500", comment: "None", date: "wed", hours: 1.0, user_id: 2 },
  { project: "TA", comment: "None", date: "tues", hours: 5.0, user_id: 2 }])
# users = User.create([{ email: "grantrwinter@gmail.com", }])