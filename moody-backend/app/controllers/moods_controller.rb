class MoodsController < ApplicationController

    def index 
        render json: Mood.all.to_json(mood_serializer_options)
    end 
  


    private 

    def mood_params
        params.require(:user_mood).permit(:name)
    end

    def mood_serializer_options()
        {
            :except =>[:created_at, :updated_at]
        }
    end
end