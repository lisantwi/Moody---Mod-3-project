Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'user_moods', to: 'user_moods#index'
  get 'users', to: 'users#index'
  get 'moods', to: 'moods#index'
  # resources :moods
end
