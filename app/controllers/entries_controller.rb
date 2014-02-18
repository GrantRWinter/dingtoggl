class EntriesController < ApplicationController
  def index
    @entries = Entries.all
    render json: { entries: "test" }
  end

end
