class EntriesController < ApplicationController
  respond_to :json
  def index
    @entries = Entries.all
    respond_with(@entries) do |format|
      format.json { render :json => @entries.as_json }
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
