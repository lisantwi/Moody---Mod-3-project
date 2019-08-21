class ActivitiesController < ApplicationController

    def index 
        activities = Activity.all 
        render json: activities.to_json(activity_serializer_options)
    end

    def create
        mood = Mood.find_by(name: params[:mood_name])
        activity = Activity.create(user_id: params[:user_id], mood_id: mood.id, name: params[:name])
        render json: activity.to_json(activity_serializer_options)
    end

    private

    def activity_serializer_options
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

end