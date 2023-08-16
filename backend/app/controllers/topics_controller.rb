class TopicsController < ApplicationController
    before_action :authorize_request, only: [:create_topic]
    def create_topic
        topic_params = JSON.parse(request.body.read)
        topic = Topic.new({name: topic_params["name"]})
        if topic.save
          render json: topic, status: :created
        else
          render json: topic.errors, status: :unprocessable_entity
        end
      end
    
      def show_topics
        topics = Topic.all
        render json: topics, status: :ok
      end
end
