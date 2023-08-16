class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token


    private

    def authorize_request
        header = request.headers['authToken']
        token = header.split(' ').last if header
        begin
            decoded = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
            @current_author_id = decoded[0]['author_id']
        rescue JWT::DecodeError, ActiveRecord::RecordNotFound
            render json: { error: 'Unauthorized' }, status: :unauthorized
        end
    end
end
