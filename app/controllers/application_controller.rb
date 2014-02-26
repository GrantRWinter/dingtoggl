class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def not_authenticated
    redirect_to login_url, :alert => "First login to access this page."
  end

  def index
    @entries = Entries.all 
    @sum_of_hours = 0
    @sum_of_mins = 0
    @entries.each do |e|
      @sum_of_mins += e.minutes.to_f
      @sum_of_hours += e.hours.to_f
    end
  end
end
