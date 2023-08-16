class LikesController < ApplicationController
    before_action :authorize_request, only: [:create_like,:remove_like,:has_liked]

    def create_like
        post = Post.find(params[:post_id])
        existing_like = Like.find_by(post: post, author: Author.find(@current_author_id))

        if existing_like
            render json: { message: 'You have already liked this post' }, status: :unprocessable_entity
        else
            like = Like.new(post: post, author: Author.find(@current_author_id))
        

            if like.save
                post.increment!(:likes_count)
                render json: { message: 'Post liked successfully' }, status: :created
            else
                render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def remove_like
        post = Post.find(params[:post_id])
        existing_like = Like.find_by(post: post, author: Author.find(@current_author_id))

        if existing_like
            existing_like.destroy
            post.decrement!(:likes_count)
            render json: { message: 'You have removed like this post' }, status: :ok
        else
            render json: { message: 'No like found'}, status: :unprocessable_entity
        end
    end

    def has_liked
        post = Post.find(params[:post_id])
        author =  Author.find(@current_author_id)
        existing_like = Like.find_by(post: post, author: author)
        if existing_like
            render json: { message: 'You have already liked this post', success:true }, status: :unprocessable_entity
        else
            render json: { message: 'You have not liked this post',success: false }, status: :created
        end
    end

    def total_like
        post = Post.find(params[:post_id])
        total_like = Like.where(post: post).count

        render json:{total_likes: total_like}
    end
end
