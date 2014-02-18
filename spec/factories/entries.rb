# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :entry, :class => 'Entries' do
    project "MyString"
    comment "MyText"
    date "2014-02-18 20:30:42"
    hours 1.5
    user_id 1
  end
end
