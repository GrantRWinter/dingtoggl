class EntriesController < ApplicationController
  respond_to :json
  def index
    @entries = Entries.all
    respond_with(@entries) do |format|
      format.json { render :json => @entries.as_json }
    end
    @sum_of_hours = 0
    @sum_of_mins = 0
    @hours_today = 0
    @entries.each do |e|
      @sum_of_mins += e.minutes.to_i
      @sum_of_hours += e.hours.to_i
      @hours_today += e.hours.to_i if e.date == Date.today.to_s
    end

    
  end

  def create
    respond_with Entries.create(entry_params)
  end

  def update
    respond_with Entries.update(params[:id], entry_params)

  end

  def destroy
    respond_with Entries.destroy(params[:id])
  end

  protected

  def entry_params
    params.require(:entry).permit(:user_id, :comment, :hours, :minutes, :date, :project)
  end

end
