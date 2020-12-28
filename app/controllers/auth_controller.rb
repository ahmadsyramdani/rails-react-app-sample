class AuthController < ApplicationController
  def login
    admin_user = AdminUser.find_by(email: params[:email])
    if admin_user
      user = admin_user
    else
      user = User.find_by(email: params[:email])
    end

    if user && user.authenticate(params[:password])
      is_admin = user.class.name == "AdminUser"
      payload = { user_id: user.id, is_admin: is_admin }
      token = encode_token(payload)
      render json: {
        user: user,
        jwt: token,
        success: "Welcome back",
        logged_in: true,
        is_admin: is_admin
      }
    else
      render json: { failure: "Login failed! Username or password invalid"}
    end
  end

  def auto_login
    if session_user
      render json: session_user
    else
      render json: { errors: "No user logged in" }
    end
  end

  def user_is_authed
    if session_user
      logged_in = true
    else
      logged_in = false
    end
    render json: { user: session_user, logged_in: logged_in, is_admin: session_user.class.name == "AdminUser" }
  end
end
