class CreateSaveForLaters < ActiveRecord::Migration[7.0]
  def change
    create_table :save_for_laters do |t|
      t.references :author, foreign_key: true, null: false
      t.references :post, foreign_key: true, null: false

      t.timestamps
    end
  end
end
