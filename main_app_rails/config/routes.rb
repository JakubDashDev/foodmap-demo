Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :dashboard do
    post "login", to: "authentications#authenticate"
    get "me", to: "authentications#current"
    post "refresh", to: "authentications#refresh"
    post "logout", to: "authentications#logout"

    resources :locations, only: [:index, :show, :create, :update, :destroy]
    resources :content_creators, only: [:index, :show, :create, :update, :destroy]
    resources :reviews, only: [:index, :show, :create, :update, :destroy]
  end

  namespace :api do
    resources :reviews, only: [:index]
    resources :locations, only: [:show]
  end

end
