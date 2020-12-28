class UsersController < ApplicationController
  def create
    user = User.create(user_params)
    if user.valid?
      payload = { user_id: user.id }
      token = encode_token(payload)
      render json: { user: user, jwt: token, logged_in: true }
    else
      render json: { failure: user.errors.full_messages.join(', ') }
    end
  end

  def forgot_password
    user = User.find_by(email: params[:email])
    if user
      user.update(reset_password_token: SecureRandom.uuid)
      PasswordMailer.with(host: root_url, user: user).reset.deliver_now
      render json: { message: 'A password reset link was sent to your email'}
    else
      render json: { failure: 'email not found' }
    end
  end

  def check_reset_token
    user = User.find_by(reset_password_token: params[:token])
    unless user
      render json: { failure: 'token not found' }
    end
  end

  def reset_password
    user = User.find_by(reset_password_token: params[:token])

    unless params[:password]
      return render json: { failure: 'Password is required' }
    end

    unless user
      return render json: { failure: 'token not found' }
    end

    user.update(
      password: params[:password],
      reset_password_token: nil
    )
    render json: { message: 'password has been updated'}
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
