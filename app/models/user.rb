class User < ActiveRecord::Base

  has_many :entries

  authenticates_with_sorcery!

  #attr_accessible :email, :password, :password_confirmation

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates :password, length: { in: 6..10}
  validates_presence_of :email
  validates_uniqueness_of :email

end



