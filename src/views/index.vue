<template>
  <div class="box">
    <div class="block">
      <div class="shop" v-for="(item,index) in orderData" :key="index">
        <div class="line">
          <div class="pic" @click="selectShop(index)">
            <img
              :src="item.isShop == 1 ? 'https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png':'https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png'"
              alt
            />
          </div>
          <div>{{item.shopName}}</div>
        </div>
        <div class="row" v-for="(row,i) in item.goodsList" :key="i">
          <div class="pic" @click="selectGoods(index,i)">
            <img
              :src="row.isGoods == 1 ? 'http://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png' :'https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png'"
              alt
            />
          </div>
          <div class="detail">
            <div class="photo">
              <img :src="row.defaultPic" alt />
            </div>
            <div class="info">
              <div class="title">{{row.productName}}</div>
              <div class="norm">{{row.format}}</div>
              <div class="rol">
                <span class="amount">￥{{row.price}}</span>
                <van-stepper v-model="row.count" disable-input @change="countNum()" />
                <div class="del" @click="delGoods(index,i)">
                  <img src="https://sucai.suoluomei.cn/sucai_zs/images/20191121100950-3.png" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="close">
        <div class="all" @click="selectAll()">
          <div class="pic">
            <img
              :src="isAll == 1 ? 'https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png' : 'https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png'"
              alt
            />
          </div>
          <span>全选</span>
        </div>
        <div class="refer">
          <div class="total">
            <span>合计:</span>
            <span>￥{{allPrice}}</span>
          </div>
          <div class="settlement">结算</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAll: 0,
      allPrice: 0,
      orderData: [
        {
          shopId: 1,
          shopName: "京东自营",
          isShop: 0,
          goodsList: [
            {
              id: 1,
              shopId: 1,
              shopName: "京东自营",
              isGoods: 0,
              defaultPic:
                "https://img30.360buyimg.com/popWareDetail/jfs/t3208/194/7616404169/244198/369625db/58b7d093N03520fb7.jpg",
              productId: 1,
              productName: "三只松鼠_零食大礼包",
              format: "黑色18L",
              price: 20,
              count: 1
            },
            {
              id: 2,
              shopId: 1,
              shopName: "京东自营",
              isGoods: 0,
              defaultPic:
                "https://img14.360buyimg.com/n0/jfs/t2971/15/167732091/93002/204c1016/574d9d9aNe4e6fa7a.jpg",
              productId: 2,
              productName: "小米心跳手环",
              format: "白色20XXL",
              price: 148,
              count: 1
            }
          ]
        },
        {
          shopId: 2,
          shopName: "海澜之家",
          isShop: 0,
          goodsList: [
            {
              id: 1,
              shopId: 2,
              shopName: "海澜之家",
              isGoods: 0,
              defaultPic:
                "https://img30.360buyimg.com/popWaterMark/jfs/t4075/83/1343091204/132469/9034cb9c/5873496bN68020ba8.jpg",
              productId: 1,
              productName: "短袖T恤男 2017夏季新品",
              format: "蓝色30X",
              price: 181,
              count: 1
            }
          ]
        },
        {
          shopId: 3,
          shopName: "OPPO官方旗舰店",
          isShop: 0,
          goodsList: [
            {
              id: 1,
              shopId: 3,
              shopName: "OPPO官方旗舰店",
              isGoods: 0,
              defaultPic:
                "https://img10.360buyimg.com/cms/jfs/t6064/272/2163314583/157700/442d6477/593c1c49N7c63a7d9.jpg",
              productId: 1,
              productName: "OPPO R11 全网通",
              format: "蓝色30X",
              price: 1999,
              count: 1
            },
            {
              id: 2,
              shopId: 3,
              shopName: "OPPO官方旗舰店",
              isGoods: 0,
              defaultPic:
                "https://img14.360buyimg.com/n0/jfs/t3142/194/4953241722/254855/1651c2b1/585b9021Nf653e48a.jpg",
              productId: 1,
              productName: "OPPO R9 全网通",
              format: "蓝色30X",
              price: 999,
              count: 1
            }
          ]
        }
      ]
    };
  },

  mounted() {},
  methods: {
    // 删除商品
    delGoods(index, i) {
      var list = this.orderData[index].goodsList;
      list.splice(i, 1);
      if (list.length == 0) {
        this.orderData.splice(index, 1);
      }
      this.watchAll();
      this.countPrice();
    },

    // 选择商品
    selectGoods(index, i) {
      var list = this.orderData[index].goodsList;
      if (list[i].isGoods == 0) {
        list[i].isGoods = 1;
      } else {
        list[i].isGoods = 0;
      }
      var anti = list.map(item => item.isGoods).indexOf(0);
      if (anti == -1) {
        this.orderData[index].isShop = 1;
      } else {
        this.orderData[index].isShop = 0;
      }
      this.watchAll();
      this.countPrice();
    },

    // 选择店铺
    selectShop(index) {
      var list = this.orderData;
      var goodsList = list[index].goodsList;
      if (list[index].isShop == 0) {
        list[index].isShop = 1;
        for (let i in goodsList) {
          goodsList[i].isGoods = 1;
        }
      } else {
        list[index].isShop = 0;
        for (let i in goodsList) {
          goodsList[i].isGoods = 0;
        }
      }
      this.watchAll();
      this.countPrice();
    },

    // 全选
    selectAll() {
      var list = this.orderData;
      if (list.length == 0) {
        this.isAll = 0;
        return;
      }
      if (this.isAll == 0) {
        this.isAll = 1;
        for (let i in list) {
          list[i].isShop = 0;
          this.selectShop(i);
        }
      } else {
        this.isAll = 0;
        for (let i in list) {
          list[i].isShop = 1;
          this.selectShop(i);
        }
      }
      this.countPrice();
    },

    // 监听全选
    watchAll() {
      var list = this.orderData;
      if (list.length == 0) {
        this.isAll = 0;
        return;
      }
      var result = [];
      for (let i in list) {
        for (let j in list[i].goodsList) {
          result.push(list[i].goodsList[j].isGoods);
        }
      }
      var anti = result.map(item => item).indexOf(0);
      if (anti == -1) {
        this.isAll = 1;
      } else {
        this.isAll = 0;
      }
    },

    // 更改商品数量
    countNum() {
      this.countPrice();
    },

    // 计算总价格
    countPrice() {
      let count = 0;
      var list = this.orderData;
      for (let i in list) {
        for (let j in list[i].goodsList) {
          if (list[i].goodsList[j].isGoods == 1) {
            count += list[i].goodsList[j].price * list[i].goodsList[j].count;
          }
        }
      }
      this.allPrice = count;
    }
  }
};
</script>


<style lang="less" scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 104px;
}

.shop {
  margin-bottom: 60px;
  box-shadow: 0px 8px 20px 0px rgba(97, 97, 97, 0.19);
  border-radius: 12px;
  padding: 10px;
  box-sizing: border-box;
}

.line {
  display: flex;
  align-items: center;
}

.pic {
  width: 40px;
  height: 40px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.line div:nth-child(2) {
  font-size: 24px;
  margin-left: 16px;
}

.row {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.detail {
  width: 630px;
  height: 236px;

  margin-left: 16px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.photo {
  width: 132px;
  height: 132px;
}

.info {
  width: 74%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  text-align: left;
}

.title {
  font-size: 28px;
}

.norm {
  font-size: 22px;
  color: #999999;
}

.rol {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.amount {
  font-size: 38px;
  font-weight: 600;
  color: #ff3b30;
}

.del {
  width: 30px;
  display: flex;
  align-items: center;
}

.close {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 104px;
  border-top: 1px solid #eeeeee;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.all {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.all span {
  color: #999999;
  font-size: 24px;
  margin-left: 5px;
}

.refer {
  display: flex;
  align-items: center;
  height: 100%;
}

.total {
  display: flex;
  align-items: center;
}

.total span:nth-child(1) {
  font-size: 26px;
}

.total span:nth-child(2) {
  font-size: 38px;
  font-weight: 600;
  color: #ff3b30;
}

.settlement {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 100%;
  background: #ff3b30;
  color: #fff;
  font-size: 30px;
  margin-left: 15px;
}
</style>