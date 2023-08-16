class PlaylistsController < ApplicationController
    before_action :authorize_request, only: [:create_playlist,:add_to_playlist,:show_all_playlists]

    def create_playlist
        author = Author.find(@current_author_id)
        playlist_params = JSON.parse(request.body.read)
        playlist = Playlist.new(playlist_params)
        playlist.author = author
        if playlist.save
            render json: {message:"Playlist Created"}, status: :ok
        else
            render json: {message:"Unprocessible Entity"}, status: :unprocessable_entity
        end
    end

    def add_to_playlist
        playlist = Playlist.find(params[:playlist_id])
        post = Post.find(params[:post_id])

        playlist_post_item = PlaylistPostItem.new(playlist: playlist, post: post)
        if playlist_post_item.save
            render json: { message: 'Post added to playlist successfully' }, status: :ok
        else
            render json: { message: 'Failed to add post to playlist' }, status: :unprocessable_entity
        end
    end

    def show_all_playlists
        author = Author.find(@current_author_id)
        playlists = author.playlists.select(:id, :name)
        render json: playlists, status: :ok
    end

    def show_playlist_posts
        playlist = Playlist.find(params[:playlist_id])
        playlist_posts = playlist.posts.includes(:author).all
        
        post_data = playlist_posts.map do |post|
            {
              id: post.id,
              title: post.title,
              topic: post.topic,
              text: post.text,
              image: post.featured_image,
              likes_count: post.likes_count,
              comments_count: post.comments_count,
              published_at: post.published_at,
              author_name: post.author.name
            }
        end
        render json: post_data, status: :ok
      end
end
