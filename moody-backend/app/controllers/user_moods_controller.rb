class UserMoodsController < ApplicationController

    def index 
        render json: UserMood.all.to_json(mood_note_serializer_options)
    end 

    def create
        mood = Mood.find_by(name: params[:mood_name])
        if UserMood.find_by(date_entry: params[:date_entry])
            json_string = {'message' => 'You have already set a note for today'}.to_json
            render json: json_string
        else
            user_mood = UserMood.create(user_id: params[:user_id], mood_id:mood.id, date_entry: params[:date_entry], note: params[:note], is_public: params[:is_public], likes: params[:likes])
            render json: user_mood.to_json(mood_note_serializer_options)
        end
    end

    def destroy
        user_mood = UserMood.find(params[:id])
        user_mood.destroy
        render json: user_mood   
    end

    def update
        user_mood = UserMood.find(params[:id])
        user_mood.update(note: params[:note], likes: params[:likes])
        render json: user_mood
    end

    private 

    def user_mood_params
        params.require(:user_mood).permit(:user_id, :mood_id, :date_entry, :note, :is_public, :likes)
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