require 'test_helper'

class CrumbsControllerTest < ActionController::TestCase
  setup do
    @crumb = crumbs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:crumbs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create crumb" do
    assert_difference('Crumb.count') do
      post :create, crumb: { latitude: @crumb.latitude, longitude: @crumb.longitude, message: @crumb.message, timestamp: @crumb.timestamp, user_id: @crumb.user_id }
    end

    assert_redirected_to crumb_path(assigns(:crumb))
  end

  test "should show crumb" do
    get :show, id: @crumb
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @crumb
    assert_response :success
  end

  test "should update crumb" do
    patch :update, id: @crumb, crumb: { latitude: @crumb.latitude, longitude: @crumb.longitude, message: @crumb.message, timestamp: @crumb.timestamp, user_id: @crumb.user_id }
    assert_redirected_to crumb_path(assigns(:crumb))
  end

  test "should destroy crumb" do
    assert_difference('Crumb.count', -1) do
      delete :destroy, id: @crumb
    end

    assert_redirected_to crumbs_path
  end
end
