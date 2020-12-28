class PasswordMailer < ApplicationMailer

  def reset
    @user = params[:user]
    @host = params[:host]
    mail(to: @user.email, subject: 'Reset password information')
  end
end
