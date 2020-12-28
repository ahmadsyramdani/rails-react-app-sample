class Api::V1::WorksheetsController < AuthorizationController

  def index
    worksheets = Worksheet.all.order(created_at: :desc)
    render json: worksheets
  end

  def create
    worksheet = Worksheet.create!(worksheet_params)
    if worksheet
      render json: worksheet
    else
      render json: worksheet.errors
    end
  end

  def show
    if worksheet
      render json: worksheet
    else
      render json: worksheet.errors
    end
  end

  def destroy
    worksheet&.destroy
    render json: { message: 'worksheet deleted!' }
  end

  private

  def worksheet_params
    params.permit(:title, :description, :number_of_question, :total_score, :obtained_score)
  end

  def worksheet
    @worksheet ||= Worksheet.find(params[:id])
  end
end
