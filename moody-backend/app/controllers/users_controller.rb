class UsersController < ApplicationController

    def index 
        render json: User.all.to_json(user_serializer_options)
    end 

    def note 
        date = Time.now
        date_formatted = date.strftime("%Y%m%d")
        user = User.find(params[:id])
        if user.user_moods.find_by(date_entry: date_formatted.to_i) != nil
            render json: user.user_moods.find_by(date_entry: date_formatted.to_i).to_json(user_note_serializer_options)
        else
            json_string = {'message' => "You have not set your mood for today"}.to_json
            render json: json_string
        end
    end

    def show
        user = User.find(params[:id])
        render json: user.to_json(user_serializer_options)

    end

    def create 
        user = User.find_or_create_by(user_params)
        render json: user.to_json(user_serializer_options)
    end

    private 

    def user_params
        params.require(:user).permit(:name, :image)
    end

    def user_serializer_options()
        {   :include => { 
                :user_moods => {
                    :except => [:created_at, :updated_at],
                    :include => {
                        :mood => {
                            :except => [:created_at, :updated_at]
                        }
                    }
                }
            },
            :except => [:created_at, :updated_at]
        }
    end

    def user_note_serializer_options()
        {  :include => {
                :mood => {
                    :except => [:created_at, :updated_at]
                }
            },
            :except => [:created_at, :updated_at]
        }
    end

end 
