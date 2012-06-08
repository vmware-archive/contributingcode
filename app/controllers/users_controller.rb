class UsersController < ApplicationController
 
  # Create user only if registration form is complete
  def create
    redirect_to "/" if session[:auth].blank?
    auth = session[:auth]
    user = User.new 
    user.uid = auth["uid"]
    user.name = params[:name]
    user.email = params[:email] 
    user.handle = auth["extra"]["raw_info"]["login"]
    user.avatar = auth["extra"]["raw_info"]["avatar_url"]
      if user.save
        Resque.enqueue(RegisterMailer, user.id)
        session[:user_id] = user.id
        redirect_to "/"
      else
        flash[:errors] = user.errors
        @name = params[:name]
        @email = params[:email]
        @avatar = auth["extra"]["raw_info"]["avatar_url"]
        @handle = auth["extra"]["raw_info"]["login"]
        render "home/index"
      end 
  end  

end