class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.integer :amount
      t.string :status
      t.string :payment_intent_id

      t.timestamps
    end
  end
end
