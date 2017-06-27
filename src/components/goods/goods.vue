<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(value,num) in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="value.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{value.name}}</h2>
                  <p class="desc">{{value.description}}</p>
                  <div class="extra">
                    <span class="count">月销{{value.sellCount}}份</span><span>好评率{{value.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{value.price}}</span><span v-show="value.oldPrice" class="old">{{value.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    <shopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopCart from 'components/shopcart/shopcart';

  const ERR_OK = 0;
  export default{
      props: {
          seller: {
              type: Object
          }
      },
    data() {
      return {
          goods: [],
          listHeight: [],
          scrollY: 0
      };
    },
    computed: {
      currentIndex() {
          for (let i = 0; i < this.listHeight.length; i++) {
              let heigth1 = this.listHeight[i];
              let heigth2 = this.listHeight[i + 1];
              if (!heigth2 || (this.scrollY >= heigth1 && this.scrollY < heigth2)) {
                  return i;
              }
          }
          return 0;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
          this.$http.get('/api/goods').then((response) => {
              response = response.body;
              if (response.errno === ERR_OK) {
                  this.goods = response.data;
                  this.$nextTick(() => {
                    this._initScroll();
                    this._calcHeigth();
                  });
              }
          });
    },
    methods: {
        selectMenu(index, event) {
            if (!event._constructed) {
              return;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
        },
        _initScroll() {
              this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                  click: true
              });
              this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                  probeType: 3
              });
              this.foodsScroll.on('scroll', (pos) => {
                  this.scrollY = Math.abs(Math.round(pos.y));
              });
          },
        _calcHeigth() {
              let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
              let height = 0;
              this.listHeight.push(height);
              for (let i = 0; i < foodList.length; i++) {
                  let item = foodList[i];
                  height += item.clientHeight;
                  this.listHeight.push(height);
              }
          }
    },
    components: {
      shopCart
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
        &.current{
          position:relative;
          margin-top:-1px;
          z-index:10;
          background:#fff;
          font-weight:700;
          .text{
            border-none();
          }
        }
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
           padding-bottom:18px;
           border-1px(rgba(7,17,27,0.1));
           &:last-child{
             border-none()
             margin-bottom:0;
           }
           .icon{
                flex 0 0 57px;
                margin-right:10px;
           }
             .content{
               flex:1;
               .name{
                 margin:2px 0 8px 0;
                 height:14px;
                 line-height:14px;
                 font-size:14px;
                 color:rgb(7,17,27);
               }
               .desc,.extra{
                  margin-bottom:8px;
                 line-height:10px;
                 font-size:10px;
                 color:rgb(147,153,159);
               }
                 .extra{
                   line-height:10px;
                   .count{
                     margin-right:12px;
                   }
                 }
                   .price{
                     font-weight:700;
                     line-height:24px;
                     .now{
                       margin-right:8px;
                       font-size:14px;
                       color:rgb(240,20,20)
                     }
                       .old{
                         font-size:10px;
                         text-decoration:line-through;
                         color:rgb(147,153,159);
                       }
                   }
             }
         }
     }
  }
</style>
