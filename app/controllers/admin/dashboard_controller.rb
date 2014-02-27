class Admin::DashboardController < ApplicationController

 def show
    @entries = Entries.all
    @sum_of_hours = 0
    @sum_of_mins = 0
    @entries.each do |e|
      @sum_of_hours += e.hours.to_f
      @sum_of_mins += e.minutes.to_f
    end
  end

end
