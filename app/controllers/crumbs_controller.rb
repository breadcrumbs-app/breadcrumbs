class CrumbsController < ApplicationController
  before_filter :authenticate_user, except: [:index]
  before_action :set_crumb, only: [:show, :edit, :update, :destroy]

  # GET /crumbs
  # GET /crumbs.json
  def index
    @crumbs = Crumb.all
  end

  # GET /crumbs/mine.json
  def mine
    @crumbs = current_user.crumbs

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @crumbs }
    end
  end

  # GET /crumbs/1
  # GET /crumbs/1.json
  def show
  end

  # GET /crumbs/new
  def new
    @crumb = Crumb.new
  end

  # GET /crumbs/1/edit
  def edit
  end

  # POST /crumbs
  # POST /crumbs.json
  def create
    @crumb = Crumb.new(crumb_params)

    respond_to do |format|
      if @crumb.save
        format.html { redirect_to @crumb, notice: 'Crumb was successfully created.' }
        format.json { render :show, status: :created, location: @crumb }
      else
        format.html { render :new }
        format.json { render json: @crumb.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /crumbs/1
  # PATCH/PUT /crumbs/1.json
  def update
    respond_to do |format|
      if @crumb.update(crumb_params)
        format.html { redirect_to @crumb, notice: 'Crumb was successfully updated.' }
        format.json { render :show, status: :ok, location: @crumb }
      else
        format.html { render :edit }
        format.json { render json: @crumb.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /crumbs/1
  # DELETE /crumbs/1.json
  def destroy
    @crumb.destroy
    respond_to do |format|
      format.html { redirect_to crumbs_url, notice: 'Crumb was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_crumb
      @crumb = Crumb.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def crumb_params
      params.require(:crumb).permit(:latitude, :longitude, :user_id, :timestamp, :message)
    end
end
