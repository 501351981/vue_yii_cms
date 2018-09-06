/*
* 动态路由的配置表
* 用于获取权限后，生成对应的路由，然后动态添加
* 添加新页面后，到此处进行配置
*/
const routes=[
  {
    path: '/',
    name: 'dashboard',
    component: (resolve) => require(['@/pages/layout/Layout'], resolve),
    meta:{requiresAuth:true,noPermission:true},
  },
  {
    path: '/index',
    name: 'dashboard',
    component: (resolve) => require(['@/pages/layout/Layout'], resolve),
    meta:{requiresAuth:true,noPermission:true},
    children:[
      {
        path: '/site/update-pwd',
        name: 'site-update-pwd',
        component: (resolve) => require(['@/pages/site/UpdatePwd'], resolve),
        meta:{requiresAuth:false,noPermission:true},
      },
      {
        path: '/administrators/index',
        name: 'administrators-index',
        component: (resolve) => require(['@/pages/permission/AdministratorsIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/administrators/edit',
        name: 'administrators-edit',
        component: (resolve) => require(['@/pages/permission/AdministratorsEdit'], resolve),
        meta:{requiresAuth:true},
      },
      {
        path: '/administrators/pwd',
        name: 'administrators-pwd',
        component: (resolve) => require(['@/pages/permission/AdministratorsPwd'], resolve),
        meta:{requiresAuth:true},
      },
      {
        path: '/roles/index',
        name: 'roles-index',
        component: (resolve) => require(['@/pages/permission/RolesIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/roles/edit',
        name: 'roles-edit',
        component: (resolve) => require(['@/pages/permission/RolesEdit'], resolve),
        meta:{requiresAuth:true},
      },
      {
        path: '/category/index',
        name: 'category-index',
        component: (resolve) => require(['@/pages/category/CategoryIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/category/children',
        name: 'category-children',
        component: (resolve) => require(['@/pages/category/CategoryChildren'], resolve),
        meta:{requiresAuth:true},
      },


      {
        path: '/member/index',
        name: 'member-index',
        component: (resolve) => require(['@/pages/member/MemberIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/member/edit',
        name: 'member-edit',
        component: (resolve) => require(['@/pages/member/MemberEdit'], resolve),
        meta:{requiresAuth:true},
      },

      {
        path: '/menu/index',
        name: 'menu-index',
        component: (resolve) => require(['@/pages/menu/MenuIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/menu/children',
        name: 'menu-children',
        component: (resolve) => require(['@/pages/menu/MenuChildren'], resolve),
        meta:{requiresAuth:true},
      },
      {
        path: '/menu/rights',
        name: 'menu-rights',
        component: (resolve) => require(['@/pages/menu/MenuRights'], resolve),
        meta:{requiresAuth:true},
      },


      {
        path: '/news/index',
        name: 'news-index',
        component: (resolve) => require(['@/pages/news/NewsIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/news/edit',
        name: 'news-edit',
        component: (resolve) => require(['@/pages/news/NewsEdit'], resolve),
        meta:{requiresAuth:true},
      },

      {
        path: '/banner/index',
        name: 'banner-index',
        component: (resolve) => require(['@/pages/banner/BannerIndex'], resolve),
        meta:{requiresAuth:true},
      },
      {
        path: '/banner/edit',
        name: 'banner-edit',
        component: (resolve) => require(['@/pages/banner/BannerEdit'], resolve),
        meta:{requiresAuth:true},
      },

      //以下为项目所需路由

      {
        path: '/course/index',
        name: 'course-index',
        component: (resolve) => require(['@/pages/course/CourseIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/course/edit',
        name: 'course-edit',
        component: (resolve) => require(['@/pages/course/CourseEdit'], resolve),
        meta:{requiresAuth:true},
      },

      {
        path: '/lesson/index',
        name: 'lesson-index',
        component: (resolve) => require(['@/pages/course/LessonIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/lesson/edit',
        name: 'lesson-edit',
        component: (resolve) => require(['@/pages/course/LessonEdit'], resolve),
        meta:{requiresAuth:true},
      },

      {
        path: '/topic/index',
        name: 'topic-index',
        component: (resolve) => require(['@/pages/course/TopicIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/topic/edit',
        name: 'topic-edit',
        component: (resolve) => require(['@/pages/course/TopicEdit'], resolve),
        meta:{requiresAuth:true},
      },
      {
        path: '/demo/index',
        name: 'demo-index',
        component: (resolve) => require(['@/pages/course/DemoIndex'], resolve),
        meta:{requiresAuth:true,keepAlive:true},
      },
      {
        path: '/demo/edit',
        name: 'demo-edit',
        component: (resolve) => require(['@/pages/course/DemoEdit'], resolve),
        meta:{requiresAuth:true},
      },


      {
        path: '/vip/index',
        name: 'vip-index',
        component: (resolve) => require(['@/pages/vip/VipIndex'], resolve),
        meta:{requiresAuth:true},
      },
      {
        path: '/vip/edit',
        name: 'vip-edit',
        component: (resolve) => require(['@/pages/vip/VipEdit'], resolve),
        meta:{requiresAuth:true},
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta:{requiresAuth:false,noPermission:true}
  }

]

function generateRouteByPermision(routes,permission) {

  let filter_result=[];
  for(let i=0;i<routes.length;i++){
    if(routes[i].children&&routes[i].children.length>0){
      let children_result=generateRouteByPermision(routes[i].children,permission)
      if(children_result.length>0){
        routes[i].children = children_result
        filter_result.push(routes[i])
      }else {
        routes[i].children = []
        if(routes[i].meta.noPermission||permission.indexOf(routes[i].path)>-1){
          filter_result.push(routes[i])
        }
      }
    }else{
      if(routes[i].meta.noPermission||permission.indexOf(routes[i].path)>-1){
        filter_result.push(routes[i])
      }
    }
  }

  return filter_result
}

export default {
  routes: routes,
  generateRouteByPermision:generateRouteByPermision
}
