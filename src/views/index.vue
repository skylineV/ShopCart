<template>
  <div class="box">
    <div class="block">
      <div class="shop" v-for="(item,index) in orderData" :key="index">
        <div class="line">
          <div class="pic" @click="getshop(index)">
            <img
              v-if="item.select_shop == 1"
              src="https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png"
              alt="店铺选中"
            />
            <img
              v-if="item.select_shop == 0"
              src="https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png"
              alt="店铺未选择"
            />
          </div>
          <div>{{item.shopName}}</div>
        </div>
        <div class="row" v-for="(row,i) in item.cartlist" :key="i">
          <div class="pic" @click="getgoods(index,i)">
            <img
              v-if="row.select_goods == 1"
              src="http://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png"
              alt="商品选中"
            />
            <img
              v-if="row.select_goods == 0"
              src="https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png"
              alt="商品未选择"
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
                <van-stepper v-model="row.count" async-change @change="getgoods_num(row,i)" />
                <div class="del" @click="getdel(index,i)">
                  <img src="https://sucai.suoluomei.cn/sucai_zs/images/20191121100950-3.png" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="close">
        <div class="all" @click="getall()">
          <div class="pic">
            <img :src="select_all" alt />
          </div>
          <span>全选</span>
        </div>
        <div class="refer">
          <div class="total">
            <span>合计:</span>
            <span>￥{{sum}}</span>
          </div>
          <div class="settlement" @click="getbill()">结算</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select_all:
        "https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png",
      sum: 0,
      orderData: [
        {
          shopId: 1,
          shopName: "京东自营",
          select_shop: 0,
          cartlist: [
            {
              id: 1,
              shopId: 1,
              shopName: "京东自营",
              select_goods: 0,
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
              select_goods: 0,
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
          select_shop: 0,
          cartlist: [
            {
              id: 1,
              shopId: 2,
              shopName: "海澜之家",
              select_goods: 0,
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
          select_shop: 0,
          cartlist: [
            {
              id: 1,
              shopId: 3,
              shopName: "OPPO官方旗舰店",
              select_goods: 0,
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
              select_goods: 0,
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
    //删除商品
    getdel(index, i) {
      this.orderData[index].cartlist.splice(i, 1);
      if (this.orderData[index].cartlist.length == 0) {
        this.orderData.splice(index, 1);
      }
      this.getprice();
      this.getwatchall();
    },
    //选择商品
    getgoods(index, i) {
      var goods_status = this.orderData[index].cartlist[i].select_goods;
      if (goods_status == 0) {
        this.orderData[index].cartlist[i].select_goods = 1;
      } else {
        this.orderData[index].cartlist[i].select_goods = 0;
      }
      //选择完商品对店铺进行回选
      var select_item = 0;
      for (let i in this.orderData[index].cartlist) {
        if (this.orderData[index].cartlist[i].select_goods == 1) {
          select_item = select_item + 1;
        }
      }
      if (select_item < this.orderData[index].cartlist.length) {
        this.orderData[index].select_shop = 0;
      } else {
        this.orderData[index].select_shop = 1;
      }
      this.getprice();
      this.getwatchall();
    },
    //店铺全选
    getshop(index) {
      var shop_status = this.orderData[index].select_shop;
      if (shop_status == 0) {
        this.orderData[index].select_shop = 1;
        for (let i in this.orderData[index].cartlist) {
          this.orderData[index].cartlist[i].select_goods = 1;
        }
      } else {
        this.orderData[index].select_shop = 0;
        for (let i in this.orderData[index].cartlist) {
          this.orderData[index].cartlist[i].select_goods = 0;
        }
      }
      this.getprice();
      this.getwatchall();
    },
    // 看页面的选择状态，如果全部点击为选择则全选
    getwatchall() {
      for (let i in this.orderData) {
        if (this.orderData[i].select_shop == 0) {
          this.select_all =
            "https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png";
          break;
        }
        if (this.orderData[i].select_shop == 1) {
          this.select_all =
            "https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png";
        }
      }
      if (this.orderData.length == 0) {
        this.select_all =
          "https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png";
      }
    },
    //全选
    getall() {
      if (
        this.select_all ==
        "https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png"
      ) {
        for (let i in this.orderData) {
          this.orderData[i].select_shop = 1;
          this.getshop(i);
        }
        this.select_all =
          "https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-2.png";
      } else {
        for (let i in this.orderData) {
          this.orderData[i].select_shop = 0;
          this.getshop(i);
        }
        this.select_all =
          "https://sucai.suoluomei.cn/sucai_zs/images/20191121093322-1.png";
      }
    },
    // 变更商品数量
    getgoods_num() {
      this.getprice();
    },
    //总价钱
    getprice() {
      let allPrice = 0;
      for (let i in this.orderData) {
        for (let j in this.orderData[i].cartlist) {
          if (this.orderData[i].cartlist[j].select_goods == 1) {
            allPrice +=
              this.orderData[i].cartlist[j].price *
              this.orderData[i].cartlist[j].count;
          }
        }
      }
      this.sum = allPrice;
    },
    //结账
    getbill() {
      console.log(this.sum);
      for (let i in this.orderData) {
        for (let j in this.orderData[i].cartlist) {
          if (this.orderData[i].cartlist[j].select_goods == 1) {
            console.log(this.orderData[i].cartlist[j].shopId);
            console.log(this.orderData[i].cartlist[j].id);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
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