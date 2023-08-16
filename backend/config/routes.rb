Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # posts
  get '/posts/all', to: 'posts#showAll'
  post '/create/post', to: 'posts#create'
  put '/edit/post/:id', to: 'posts#edit_post'
  delete '/delete/posts/:id', to: 'posts#delete_post'
  get '/posts/search', to: 'posts#search'
  get '/get/post/:id', to: 'posts#get_post'
  get 'get/post/author/:author_id', to: 'posts#filter_by_author'
  get 'get/post/filter/date/:date', to: 'posts#filter_by_date'
  get 'get/post/filter/likesAndComments/:filter_param', to: 'posts#filter_likes_commments'
  get '/get/myPost', to: 'posts#my_posts'
  post '/add/view/:post_id', to: 'posts#add_view'
  get '/get/topPosts', to: 'posts#top_posts'
  get '/post/recommended', to: 'posts#find_recommended_posts'

  # upload image
  post '/upload', to: 'posts#upload'

  # add author
  post '/create/author', to: 'authors#create'
  post '/author/login', to: 'authors#login'
  get '/author/showAll', to: 'authors#show_all_authors'
  get '/author/search', to: 'authors#search_author'
  post '/author/follow/:author_id', to: 'authors#follow_unfollow'
  get '/check/follow/:author_id', to: 'authors#check_follow'
  put '/authors/edit', to: 'authors#update_author'
  get '/author/details/:author_id', to: 'authors#author_details'
  post '/author/saveForLater/:post_id', to:'authors#save_for_later_add'
  get '/author/savedPosts', to: 'authors#show_all_saved'
  get '/author/my/details', to: 'authors#my_details'

  # like 
  post '/like/create/:post_id', to: 'likes#create_like'
  delete '/like/remove/:post_id', to: 'likes#remove_like'
  get '/like/already/liked', to: 'likes#has_liked'
  get '/like/totalLikes/:post_id', to: 'likes#total_like'

  # comment
  post '/comment/create', to: 'comments#create_comment'
  delete '/comment/delete/:comment_id', to: 'comments#remove_comment'
  get '/comment/all/:post_id', to: 'comments#get_comments'

  # topic
  post '/topic/create', to: 'topics#create_topic'
  get '/topic/showAll', to: 'topics#show_topics'


  # Draft
  post '/draft/create', to: 'drafts#create_draft'
  put '/draft/edit/:id', to: 'drafts#edit_draft'
  get '/draft/get/all', to: 'drafts#showAll'
  delete '/draft/publish/:id', to: 'drafts#publish_draft'


  # Payments
  post '/payments/create', to: 'payments#create_payment'
  get '/payment/status/:session_id', to: 'payments#check_payment_status'
  # root 'payments#index'

  # Playlist
  post '/playlists/create', to: 'playlists#create_playlist'
  post '/playlists/add/post', to: 'playlists#add_to_playlist'
  get '/playlists/show/all', to: 'playlists#show_all_playlists'
  get '/playlists/show/playlist/post/:playlist_id', to: 'playlists#show_playlist_posts'

end

