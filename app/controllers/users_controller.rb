class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      session[:user_id] = @user.id
      redirect_to login_url, :notice => "Signed up!"
    else
      render :new
    end
  end

protected

 def user_params
    params.require(:user).permit(
      :email, :password
    )
  end
end
