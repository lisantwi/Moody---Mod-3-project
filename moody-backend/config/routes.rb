Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :user_moods, only: [:index, :create, :destroy, :show]
  # get 'user_moods', to: 'user_moods#index'
  # post 'user_moods', to: 'user_moods#create'
  # delete 'user_moods/:id', to: 'user_moods#destroy'
  post 'users', to: 'users#create'
  get 'users', to: 'users#index'
  get 'moods', to: 'moods#index'
  get 'users/:id', to: 'users#show'
 # resources :moods
end
