class AuthorsController < ApplicationController
    before_action :authorize_request, only: [:follow_unfollow,:check_follow,:update_author,:save_for_later_add,:show_all_saved,:my_details]
    def create
        author_params = JSON.parse(request.body.read)
        # password = author_params['password']
        # encrypted_password = BCrypt::Password.create(password)
        # author_params['password'] = encrypted_password

        author = Author.new(author_params)
        if author.save
          render json: { message: 'Author created successfully' }, status: :created
        else
          render json: { errors: author.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def login
        author = Author.find_by(email: params[:email])

        if author && author.authenticate(params[:password])
          token = JWT.encode({ author_id: author.id }, Rails.application.secrets.secret_key_base, 'HS256')
          render json: { message: 'Login successful', token: token }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
    
    def show_all_authors
      authors =  Author.all.select(:id,:name)
      render json: authors, status: :ok
    end

    def search_author
      if params[:search].present?
        search_query = params[:search].strip.downcase
        
        where_clause = "lower(name) LIKE '%"+search_query+"%'"
        # Find articles that match the search query in title, description, or tags
        authors = Author.where(where_clause).select(:id,:name)
      else
        authors = Author.all.select(:id,:name)
      end

      render json: authors, status: :ok
    end

    def check_follow
      followed_author = Author.find(params[:author_id])
      if Follow.exists?(follower_id: @current_author_id, followed_id: followed_author.id)
        render json: { message: 'You are already following the author.', success: true }, status: :ok
      else
        render json: { message: 'You are not following the author.', success: false }, status: :ok
      end
    end

    def follow_unfollow
      followed_author = Author.find(params[:author_id])
      if Follow.exists?(follower_id: @current_author_id, followed_id: followed_author.id)
        follow = Follow.find_by(follower_id: @current_author_id, followed_id: followed_author.id)
        follow.destroy
        followed_author.decrement!(:followers_count)
        render json: { message: 'You have unfollowed the author.' }, status: :ok
      else
        if Follow.create(follower_id: @current_author_id, followed_id: followed_author.id)
          followed_author.increment!(:followers_count)
          render json: { message: 'You are now following the author.' }, status: :ok
        else
          render json: { error: 'Failed to follow the author.' }, status: :unprocessable_entity
        end
      end
    end

    def update_author
      author_params = JSON.parse(request.body.read)
      author = Author.find(@current_author_id)
      author.about = author_params["about"]
      if author.save
        render json: { message: 'Author updated successfully' }, status: :ok
      else
        render json: { errors: author.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def author_details
      author = Author.find(params[:author_id])
      author = author.slice(:name, :email, :followers_count, :about)
      render json: author,status: :ok
    end

    def my_details
      author = Author.find(@current_author_id)
      author = author.slice(:id,:name, :email, :followers_count, :about)
      render json: author,status: :ok
    end

    def save_for_later_add
      author = Author.find(@current_author_id)
      post = Post.find(params[:post_id])

      if !author.save_for_laters.exists?(post.id)
        author.save_for_laters.create(post:post)
        render json: {message: "Post saved for later successfully"}, status: :ok
      else
        render json: {message: "Post Already Saved"}, status: :unprocessable_entity
      end
    end

    def show_all_saved
      author = Author.find(@current_author_id)
      saved_posts = author.save_for_laters.includes(post: :author)
      saved_data = saved_posts.map do |save_for_later|
        post = save_for_later.post
        {
          save_for_later_id: save_for_later.id,
          post_id: post.id,
          post_title: post.title,
          topic: post.topic,
          featured_image: post.featured_image,
          text: post.text, 
          author_name: post.author.name,
          likes_count: post.likes_count,
          comments_count: post.comments_count
        }
      end
      render json: saved_data,status: :ok
    end
end
