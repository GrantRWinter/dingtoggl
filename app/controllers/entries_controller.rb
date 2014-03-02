class EntriesController < ApplicationController
  respond_to :json
  def index
    @entries = current_user.entries
    respond_with(@entries) do |format|
      format.json { render :json => @entries.as_json } 

    end
  end

  def create
    new_params = entry_params
    new_params[:user_id] = current_user.id
    respond_with Entry.create(new_params)
  end

  def update
    respond_with Entry.update(params[:id], entry_params)
  end

  def destroy
    respond_with Entry.destroy(params[:id])
  end

  protected

  def entry_params
    params.require(:entry).permit(:email, :comment, :hours, :minutes, :date, :project)
  end

end
