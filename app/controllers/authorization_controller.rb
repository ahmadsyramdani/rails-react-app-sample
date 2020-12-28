class AuthorizationController < ApplicationController
  before_action :require_login

  def logged_in?    
    !!session_user
  end

  def require_login
    render json: { message: 'Please login'}, status: :unauthorized unless logged_in?
  end
end
