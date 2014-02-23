class AdminController < ApplicationController

  def index
    @entries = Entries.all
  end

end
