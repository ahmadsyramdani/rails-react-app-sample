Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'worksheets/index'
      post 'worksheets/create'
      get 'worksheets/show/:id', to: 'worksheets#show'
      delete 'worksheets/destroy/:id', to: 'worksheets#destroy'
    end
  end

  resource :users, only: [:create] do
    collection do
      post :forgot_password
      get 'check_reset_token/:token', action: :check_reset_token
      post 'reset_password', action: :reset_password
    end
  end
  post "/login", to: "auth#login"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
