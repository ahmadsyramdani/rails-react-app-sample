class CreateWorksheets < ActiveRecord::Migration[6.1]
  def change
    create_table :worksheets do |t|
      t.string :title
      t.text :description
      t.integer :number_of_question
      t.float :total_score
      t.float :obtained_score, default: 0.5

      t.timestamps
    end
  end
end
