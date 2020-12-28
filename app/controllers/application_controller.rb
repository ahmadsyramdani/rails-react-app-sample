class ApplicationController < ActionController::Base

  def auth_header
    request.headers['Autorization']
  end

  def session_user
    decoded_hash = decoded_token
    if !decoded_hash.empty?
      user_id = decoded_hash[0]['user_id']
      is_admin = decoded_hash[0]['is_admin']
      if is_admin
        @user = AdminUser.find_by(id: user_id)
      else
        @user = User.find_by(id: user_id)
      end
    else
      nil
    end
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, ENV.fetch("JWT_SECRET"), true, algorithm: 'HS256')
      rescue JWT::DecodeError
        []
      end
    else
      []
    end
  end

  def encode_token(payload)
    JWT.encode(payload, ENV.fetch("JWT_SECRET"))
  end
end
