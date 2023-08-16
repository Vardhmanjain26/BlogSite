class DraftsController < ApplicationController
    before_action :authorize_request, only: [:create_draft,:edit_draft,:showAll,:publish_draft]

    def create_draft
        draft_params = JSON.parse(request.body.read)
        @draft = Draft.new(JSON.parse(request.body.read))
        author_id =  @current_author_id
        @draft.author_id = author_id
        @draft.topic = draft_params["topic"]
        @draft.reading_time = reading_time(draft_params["text"])
        if @draft.save
          render json: {message:"Draft Has been created"}, status: :created
        else
          render json: { errors: @draft.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def edit_draft
        @draft = Draft.find(params[:id])
        draft_params = JSON.parse(request.body.read)
        topic = Topic.find(draft_params["topic_id"])
        
        @draft.topic_name = topic.name
        if @draft.update(draft_params)
          render json: {message:"Draft Has been Updated"}, status: :created
        else
          render json: { errors: @draft.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def showAll
        drafts = Draft.where(author_id: @current_author_id)
        draft_data = drafts.map do |draft|
            {
              id: draft.id,
              title: draft.title,
              topic: draft.topic_name,
              topic_id: draft.topic_id,
              text: draft.text,
              image: draft.featured_image,
              author_id: draft.author_id
            }
        end
  
        render json: draft_data
    end

    def publish_draft
        draft = Draft.find(params[:id])
        draft.destroy
        render json: {message: "Draft Published"}, status: :ok
    end
end
