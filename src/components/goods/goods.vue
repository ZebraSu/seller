<template>
  <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li v-for="(item,index) in goods" class="food-list">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(value,num) in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img :src="value.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{value.name}}</h2>
                  <p class="desc">{{value.description}}</p>
                  <div class="extra">
                    <span>月销{{value.sellCount}}份</span>
                    <span>好评率{{value.rating}}%</span>
                  </div>
                  <div class="price">
                    <span>￥{{value.price}}</span>
                    <span v-show="value.oldPrice">{{value.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default{
      props: {
          seller: {
              type: Object
          }
      },
    data() {
      return {
          goods: []
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
          this.$http.get('/api/goods').then((response) => {
              response = response.body;
              if (response.errno === ERR_OK) {
                  this.goods = response.data;
                  console.log(this.goods);
              }
          });
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods{
    display:flex;
    overflow: hidden;
    position: absolute;
    top:174px;
    bottom:46px;
    width:100%;
    .menu-wrapper{
      flex:0 0 80px;
      width:80px;
      background:#f3f5f7;
      .menu-item{
        display:table;
        height:54px;
        width:56px;
        line-height:14px;
        padding:0 12px;
        text-align:center;
        .icon{
          display:inline-block;
          width:16px;
          height:16px;
          vertical-align :top;
          margin-right:2px;
          background-size:16px 16px;
          background-repeat:no-repeat;
          &.decrease {
            bg-image('decrease_3');
          }
          &.discount {
            bg-image('discount_3');
          }
          &.guarantee {
            bg-image('guarantee_3');
          }
          &.invoice {
            bg-image('invoice_3');
          }
          &.special {
            bg-image('special_3');
          }
        }
          .text{
            display: table-cell;
            font-size:12px;
            width:56px;
            vertical-align:middle;
            font-size:12px;
            border-1px(rgba(7,17,27,0.1));
          }
      }
    }
     .foods-wrapper{
      flex:1;
       .title{
         padding-left:14px;
         height:26px;
         line-height:26px;
         border-left:2px solid #d9dde1;
         font-size:12px;
         color:rgb(147,153,159);
         background:#f3f5f7;
       }
         .food-item{
           display: flex;
           margin:18px;
           border-1px(rgba(7,17,27,0.1));
           &:last-child{
             border-none()
           }
         }
     }
  }
</style>
