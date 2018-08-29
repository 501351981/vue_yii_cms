<template>
  <div class="menu">
    <div class="menu-name">{{projectName}}</div>
    <ul class="menu-list">
      <li v-for="(menu,index) in menus" :class="index==curent_p_menu_index?'active':''">
        <a class="nav-item" @click="changeMenu(index)">
          <i class="icon" :class="menu.icon"></i>
          {{menu.name}}{{index}}
          <span class="fa arrow " :class="index==curent_p_menu_index?'fa-caret-up':'fa-caret-down'"></span>
        </a>
        <transition name="spread">
          <ul class="nav-second" v-show="index==curent_p_menu_index">
            <li v-for="(child,child_index) in menu.children">
              <router-link class="nav-item" :class="index+'_'+child_index==curent_menu_index?'active':''" :to="child.url">{{child.name}}</router-link>
            </li>
          </ul>
        </transition>

      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'Menu',
    props:['menus','projectName'],
    data:function(){
      return {
        curent_p_menu_index:'',//当前应该选中的导航，父级index
        curent_menu_index:'', //当前应该选中的导航，子级index
      }
    },
    watch:{
      '$route':function (to,from) {
        let current_path=to.path
        this.getMenuIndex(current_path)
      }
    },
    mounted:function () {
      console.log("当前路径")
      console.log(this.$route.path)
      let current_path=this.$route.path
      this.getMenuIndex(current_path)


    },
    methods:{
      changeMenu:function (index) {
        if( this.curent_p_menu_index==index){
          //如果点击的就是当前的，收起
          this.curent_p_menu_index= '－1'
        }else {
          this.curent_p_menu_index=index
        }

      },
      getMenuIndex:function(current_path){
        for(let i=0;i<this.menus.length;i++){
          let menu=this.menus[i].children;
          for(let j=0;j<menu.length;j++){
            let action=menu[j].action.split(',');
            if(action.indexOf(current_path)>-1){
              this.curent_p_menu_index=i
              this.curent_menu_index=i+'_'+j
              return
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .menu{
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background-color: #2e3e4e;
    z-index: 10;
    .menu-name{
      width: 100%;
      height: 56px;
      line-height: 56px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      letter-spacing: 2px;
    }

    .menu-list{
      padding-top: 10px;
      padding-bottom: 10px;
      li{
        &.active > .nav-item{
          background-color: #273644;;
        }
        .nav-item{
          display: block;
          font-size: 13px;
          letter-spacing: 1px;
          padding: 10px 15px;
          color: #b4babe;
          cursor: pointer;

          .icon{
            margin-left: 10px;
            margin-right: 10px;
          }

          .arrow{
            float: right;
            padding-right: 15px;
          }
        }

        .nav-second{
          overflow: hidden;

          &.spread-enter-active{
            animation: spread .3s;
            animation-fill-mode: both;
          }
          &.spread-leave-active{
            animation: shrink .3s;
            animation-fill-mode: both;
          }


          .nav-item{
            padding-left: 50px !important;
            &.active{
              background: #1d2a38;
              color: #fff;
            }

          }

        }
      }

    }
  }

  @keyframes spread {
    0%{
      max-height: 0;
    }
    100%{
      max-height: 300px;
    }
  }
  @keyframes shrink {
    0%{
      max-height:100px;
    }
    100%{
      max-height: 0;
    }
  }
</style>
