class RenamePaymentIntentIdToPaymentSessionIdInPayments < ActiveRecord::Migration[7.0]
  def change
    rename_column :payments, :payment_intent_id, :payment_session_id
  end
end
