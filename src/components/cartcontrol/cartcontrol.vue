<template>
    <div class="cartcontrol">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart"></div>
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
      <div class="car-add icon-add_circle" @click="addCart"></div>
    </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
      props: {
          food: {
              type: Object
          }
      },
    created() {
          // console.log(this.food);
    },
    methods: {
      addCart(event) {
          if (!event._constructed) {
            return;
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
      },
      decreaseCart() {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol {
    font-size:0;
    .car-add,.cart-decrease{
      display: inline-block;
      padding: 6px;
      line-height:24px;
      font-size:24px;
      color:rgb(0,160,220)
    }
    .cart-count {
      display: inline-block;
      vertical-align:top;
      font-size:10px;
      width:12px;
      padding-top:6px;
      line-height:24px;
      text-align:center;
      color:rgb(147,153,159);
    }
  }
</style>
