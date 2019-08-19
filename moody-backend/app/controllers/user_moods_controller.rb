class UserMoodsController < ApplicationController

    def index 
        render json: UserMood.all.to_json(user_mood_serializer_options)
    end 

    def create
        user_mood = UserMood.create(user_mood_params)
        render json: user_mood.to_json(user_mood_serializer_options)
    end


    private 

    def user_mood_params
        params.require(:user_mood).permit(:user_id, :mood_id, :date_entry, :note)
    end

    def user_mood_serializer_options()
        {
            :except =>[:created_at, :updated_at]
        }
    end
end