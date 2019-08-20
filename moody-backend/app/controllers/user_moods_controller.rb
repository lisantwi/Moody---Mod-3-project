class UserMoodsController < ApplicationController

    def index 
        render json: UserMood.all.to_json(mood_note_serializer_options)
    end 

    def create
        user_mood = UserMood.create(user_mood_params)
        render json: user_mood.to_json(mood_note_serializer_options)
    end

    def destroy
        user_mood = UserMood.find(params[:id])
        user_mood.destroy
        render json: user_mood   
    end

    def update
        user_mood = UserMood.find(params[:id])
        user_mood.update(note: params[:note])
        render json: user_mood
    end

    private 

    def user_mood_params
        params.require(:user_mood).permit(:user_id, :mood_id, :date_entry, :note, :is_public)
    end

    def mood_note_serializer_options()
        {  :include => {
                :user => {
                    :except => [:created_at, :updated_at]
                },
                :mood => {
                    :except => [:created_at, :updated_at]
                }
            },
            :except => [:created_at, :updated_at]
        }
    end

    def user_mood_serializer_options()
        {
            :except =>[:created_at, :updated_at]
        }
    end
end