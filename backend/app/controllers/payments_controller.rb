# app/controllers/payments_controller.rb
class PaymentsController < ApplicationController
  before_action :authorize_request, only: [:create_payment]
  def create_payment
    amount = params[:amount].to_i
    author = Author.find(@current_author_id)
    # Create a new Checkout Session with the Stripe gem
    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: 'Medium Subscription', # Replace with your product name
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://google.com', # Replace with your success URL
      cancel_url: 'https://google.com', # Replace with your cancel URL
    )

    payment = Payment.create(amount: amount, payment_session_id: session.id, status: 'pending',author_id: @current_author_id)
  

    render json: { sessionId: session.id }

  end

  def check_payment_status
    session_id = params[:session_id]

    # Retrieve the Session object from Stripe using the Session ID
    session = Stripe::Checkout::Session.retrieve(session_id)

    # Return the status of the payment as JSON to the client
    render json: { status: session.payment_status }
    rescue Stripe::StripeError => e
      render json: { error: e.message }, status: 500
  end
end
  