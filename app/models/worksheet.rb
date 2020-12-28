class Worksheet < ApplicationRecord
  validates :title, :description, :number_of_question, :total_score, presence: true
end
