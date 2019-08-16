class UsersController < ApplicationController

    def index 
        render json: User.all.to_json(user_serializer_options)
    end 



    private 

    def users_params
        params.require(:user_mood).permit(:name)
    end

    def user_serializer_options()
        {
            :include => {
                :user_moods => {
                    :except => [:created_at, :updated_at],
                    :include => {
                        :mood =>{
                            :except => [:created_at, :updated_at]
                        }
                    }
                }
            },
            :except => [:created_at, :updated_at]
        }
    end

end 
