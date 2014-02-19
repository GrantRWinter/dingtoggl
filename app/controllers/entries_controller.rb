class EntriesController < ApplicationController
  respond_to :json
  def index
    @entries = Entries.all
    respond_with(@entries) do |format|
      format.json { render :json => @entries.as_json }
    end
  end

end
