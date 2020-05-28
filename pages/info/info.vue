<template>
	<view class="comment">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular=true class="swiper">
			<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
				<view class="image-wrapper">
					<image :src="item.imgurl" class="loaded"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 商品名称 -->
		<view class="data">
			<view class="money">￥{{indexData.money}}</view>
			<view class="name">
				{{indexData.pname}}
			</view>
		</view>
		<!-- 详情 -->
		<view class="info">
			<view class="infoTop">
				<text class="infoTopLeft"></text><text class="infoTopName">详情</text><text class="infoTopRight"></text>
			</view>
			<view class="infoBotton">
				<view class="infoBottonName">
					
				</view>
				<view class="infoBottonImg" v-for="(item,index) in imgList" :key="index">
					<image :src="item.imgurl" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 底部购买按钮 -->
		<view class="footer">
			<view class="footerLeft" @click="footerLeft()">
				加入购物车
			</view>
			<view class="footerRight" @click="footerRight()">
				立即购买
			</view>
		</view>
		<!-- 购买的详情也是隐藏的部分 -->
		<view class="shop" v-show="hidden">
			<view class="mark" @click="mark()"></view>
			<view class="shopInfo">
				<view class="shopInfoTop">
					<view class="shopInfoTopImage">
						<image :src="indexData.default_imgurl" mode="" class="shopInfoTopImageD"></image>
						<view class="shopInfoTopName">￥{{price}}</view>
					</view>
					<view class="shopIn" v-for="(item,index) in indexArr" :key = 'index'>
						<view class="shopInName">
							{{item.parentName}}
						</view>
						<view class="shopInNorm" >
							<view class="shopInNormVN" >
								<view :class="{active: item.id == currId}" @click="chooseNorm(item.id,item.price,item.parentId)">
									{{item.sonName}}
								</view>
							</view>
						</view>
						<view class="number">
							<view class="nunberLeft">
								数量
							</view>
							<view class="numberRight">
								<view class="numberRightLess" @click="less()">
									-
								</view>
								<view class="numberRightNum">
									{{num}}
								</view>
								<view class="numberRightAdd" @click="add()">
									+
								</view>
							</view>
						</view>
					</view>
					<view class="btn" v-if = 'sort == 1' @click="addShopping()">
						确认
					</view>
					<view class="btn" v-if = 'sort == 2' @click="pay()">
						确认
					</view>
				</view>
				
			</view>
		</view>
        
	</view>
</template>

<script>
	import helper from '../../common/conmmon.js';
	export default {
		data() {
			return {
				sort:'',//判断点击的是加入购物车还是立即购买
				hidden:false,//设置弹窗的隐藏判断
				id:'',//传过来的id
				imgList: [],//轮播图的数组
				imgListBotton:[],//商品详情照片的数组
				indexData:'',//这边放传过来的数组
				indexArr:'',//这边是放规格的选择
				currId:'',//这是判断选择什么尺寸的产品
				price:'',//这是你点击规格以后的价格
				num:1,//这边是当你选择了规格以后的数量
				pid:'',//这是商品的id
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getData(); 
		},
		methods: {
			//获取商品详情的数据
            getData(){
				var that = this;
				helper.requestAjax('api/goods/product_detail',{pid:that.id},'POST',function(res){
					console.log(res)
					that.indexData = res.data.data;
					console.log(that.indexData)
					that.imgList = res.data.data.imgurl;
					that.indexArr = res.data.data.pros_all;
					that.price = res.data.data.money;
				},function(res){
					
				})
			},
			//点击加入购物车
			footerLeft(){
				this.sort = 1;
				this.hidden = true;
			},
			//点击立即购买
			footerRight(){
				this.sort = 2;
				this.hidden = true;
			},
			//点击遮罩
			mark(){
				this.hidden = false;
			},
			//点击选择规格
			chooseNorm(e,res,data){
				var that = this;
				that.currId = e;
				that.price = res;
				that.pid = data
			},
			//点击数量减
			less(){
				if(this.num < 2){
					console.log('不能点击了')
				}else{
					let n = this.num -1;
					this.num = n
				}
			},
			//数量加
			add(){
				let n = this.num  + 1;
				this.num = n
			},
			//点击加入购物车
			addShopping(){
				var that = this;
				if(that.currId == ''){
					uni.showModal({
						title:'提示',
						content:'当前你还未选择规格'
					})
				}else{
					uni.getStorage({
						key: 'seal_params',
						success(e) {
							helper.request('api/cart/add_cart', {
								pId:that.currId,value:that.num
							}, "POST", e.data, function(res) {
								uni.switchTab({
									url:'/pages/cart/cart'
								})
							}, function(res) {
								console.log(res) //请求失败回调
							})
						}
					})
				}
			},
			//立即支付
			pay(){
				var that = this;
				uni.navigateTo({
						url:'/pages/pay/pay?id=' + that.pid + '&index=1' + '&num=' + that.num + '&formtype=1'
					})
				// if(that.currId == ''){
				// 	uni.showModal({
				// 		title:'提示',
				// 		content:'当前你还未选择规格'
				// 	})
				// }else{
				// 	uni.navigateTo({
				// 		url:'/pages/pay/pay?id=' + that.pid + '&index=1' + '&num=' + that.num + '&formtype=1'
				// 	})
				// }
			}
		}
	}
</script>

<style>
	.swiper {
		height: 100vw;
	}

	.loaded {
		width: 100%;
		height: 100vw;
	}

	.money {
		font-size: 32upx;
		color: rgba(255, 0, 0, 1);
		margin-left: 30upx;
		margin-top: 30upx;
	}

	.name {
		font-size: 32upx;
		margin: 20upx 0 20upx 20upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.data {
		padding-bottom: 20upx;
		border-bottom: 10upx solid #F5F5F5;

	}

	.infoTop {
		text-align: center;
		margin-top: 20upx;
	}

	.infoTopName {
		font-size: 32upx;
		color: rgba(152, 152, 152, 1);
	}

	.footer {
		position: fixed;
		bottom: 0;
		display: flex;
		height: 100upx;
		align-items: center;
		width: 100%;
	}

	.footerLeft {
		width: 50%;
		height: 100%;
		line-height: 100upx;
		text-align: center;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
		color: #FFFFFF;
		font-size: 34upx;
	}

	.footerRight {
		width: 50%;
		height: 100%;
		line-height: 100upx;
		text-align: center;
		background: linear-gradient(66deg, rgba(103, 193, 233, 1) 0%, rgba(77, 157, 209, 1)100%);
		color: #FFFFFF;
		font-size: 34upx;
	}
	.mark{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #000000;
		opacity: 0.5;
		width: 100%;
		z-index: 10;
	}
	.shopInfoTop{
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
		border:  20upx 20upx 0 0 ;
		padding-bottom: 30upx;
		z-index: 11;
	}
	.shopInfoTopImage{
		display: flex;
		align-items: center;
		height: 200upx;
		border: 5upx solid #F5F5F5;
	}
	.shopInfoTopImageD{
		height: 150upx;
		width: 150upx;
		margin-left: 20upx;
		border-radius: 14upx;
	}
	.shopInfoTopName{
		font-size: 32upx;
		color:rgba(232,37,70,1);
		margin-left: 30upx;
		margin-top: -30upx;
	}
	 .shopInName{
		 margin-left: 20upx;
		 font-size: 32upx;
		 margin-top: 20upx;
	 }
	 .shopInNorm{
		 display: flex;
		 align-items: center;
		 margin: 20upx 0;
		 
	 }
	 .shopInNormVN{
		 width: 20%;
		 margin-left: 4%;
		 height: 60upx;
		 line-height: 60upx;
		 font-size: 26upx;
		 text-align: center;
		 border-radius: 14upx;
		 color:rgba(153,153,153,1);
		 background-color: #F5F5F5;
	 }
	 .btn{
		 width: 100%;
		 text-align: center;
		 font-size: 34upx;
		 height: 90upx;
		 line-height: 90upx;
		 background:linear-gradient(66deg,rgba(77,157,209,1) 0%,rgba(103,193,233,1) 100%);
		 color: #FFFFFF;
		 margin-top: 20upx;
	 }
	 .infoBottonName{
		 font-size: 32upx;
	 }
	 .infoBottonImg image{
		 height: 100vw;
		 width: 100%;
	 }
	 .active{
		 border-radius: 14upx;
		 color: #FFFFFF;
		 background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
	 }
	 .number{
		 display: flex;
		 align-items: center;
		 justify-content: space-between;
		 padding: 0 20upx;
		 height: 120upx;
	 }
	 .nunberLeft{
		 font-size: 32upx;
	 }
	 .numberRight{
		 display: flex;
		 align-items: center;
	 }
	 .numberRightLess{
		 font-size: 34upx;
		 margin-right: 25upx;
	 }
	 .numberRightAdd{
		 font-size: 34upx;
		 margin: 0 25upx;
	 }
	 .numberRightNum{
		 font-size: 32upx;
	 }
</style>
