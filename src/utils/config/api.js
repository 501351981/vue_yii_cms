

export default {
  //通用
  baseUrl:process.env.API_ROOT,
  login:'/adm/v1/user/login',
  logout:'/adm/v1/user/logout',
  get_user_info:'/adm/v1/user/get-info',
  clear_cache:'/adm/v1/cache/clear',
  roles_index:'/adm/v1/roles/index',
  roles_save:'/adm/v1/roles/save',
  roles_detail:'/adm/v1/roles/detail',
  user_index:'/adm/v1/user/index',
  user_save:'/adm/v1/user/save',
  user_detail:'/adm/v1/user/detail',
  user_reset_password:'/adm/v1/user/save-pwd',
  user_update_password:'/adm/v1/user/update-pwd',
  category_index:'/adm/v1/category/index',
  category_save:'/adm/v1/category/save',
  menu_index:'/adm/v1/menu/index',
  menu_save:'/adm/v1/menu/save',
  menu_children:'/adm/v1/menu/children',
  menu_rights:'/adm/v1/menu/rights',
  news_index:'/adm/v1/news/index',
  news_save:'/adm/v1/news/save',
  news_detail:'/adm/v1/news/detail',
  member_index:'/adm/v1/member/index',
  member_save:'/adm/v1/member/save',

  //上传
  upload_server:'/adm/v1/file/up',//通过服务器上传的接口地址
  upload_client:'https://upload.qiniup.com',//通过客户端直接上传到七牛云的接口地址

  //项目专有

}
