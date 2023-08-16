class CommentsController < ApplicationController
    before_action :authorize_request, only: [:create_comment,:remove_comment]

    def create_comment
        
        body_params = JSON.parse(request.body.read)
        post = Post.find(body_params["post_id"])

        puts body_params
        comment = Comment.new(post: post, author: Author.find(@current_author_id),text: body_params["text"])
        
        if comment.save
            post.increment!(:comments_count)
            render json: { message: 'Post commented successfully' }, status: :created
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
        
    end

    def remove_comment
        comment = Comment.find(params[:comment_id])
        post = Post.find(comment.post_id)
        if comment.present?
            comment.destroy
            post.decrement!(:comments_count)
            render json: { message: 'You have removed comment from this post' }, status: :ok
        else
            render json: { message: 'No comment found'}, status: :unprocessable_entity
        end
    end


    def get_comments
        post = Post.find(params[:post_id])
        comments = Comment.joins(:author).where(post: post)
        comments_data = comments.map do |comment|
            {
                id: comment.id,
                post_id: comment.post_id,
                author_id: comment.author_id,
                author_name: comment.author.name,
                comment_date: comment.created_at,
                text: comment.text
            }
        end
        render json: comments_data, status: :ok
    end

    # def total_like
    #     post = Post.find(params[:post_id])
    #     total_like = Like.where(post: post).count

    #     render json:{total_likes: total_like}
    # end
end
