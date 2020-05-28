<template>
	<view class="content">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular=true class="swiper">
			<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
				<view class="image-wrapper">
					<image :src="item.imgurl" class="loaded"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" @click="change(1)">
				<image src="../../static/c1.png" mode=""></image>
				<view class="cate-name">水果</view>
			</view>
			<view class="cate-item" @click="change(2)">
				<image src="../../static/c2.png" mode=""></image>
				<view class="cate-name">蔬菜</view>
			</view>
			<view class="cate-item" @click="change(3)">
				<image src="../../static/c3.png" mode=""></image>
				<view class="cate-name">肉禽</view>
			</view>
			<view class="cate-item" @click="change(4)">
				<image src="../../static/c7.png" mode=""></image>
				<view class="cate-name">禾谷类</view>
			</view>
			<view class="cate-item" @click="change(5)">
				<image src="../../static/c5.png" mode=""></image>
				<view class="cate-name">薯类</view>
			</view>
		</view>

		<!-- 猜你喜欢 -->
		<view class="getLove">
			<view class="getLoveTop">
				<image src="../../static/c6.png" mode="" class="getLoveTopImage"></image>
				<view class="getLoveTopName">
					猜你喜欢
				</view>
				<image src="../../static/right.png" mode="" class="getLoveTopRight"></image>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="shop">
			<view class="shopInfo" >
				<view class="shopData" v-for="(item,index) in shopList" :key="index" @click="jump(item.id)">
					<view class="shopDataImage">
						<image :src="item.default_imgurl" mode=""></image>
					</view>
					<view class="shopDataName">
						{{item.pname}}
					</view>
					<view class="shopDataMoney">
						￥{{item.money}}
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import helper from '../../common/conmmon.js'
	export default {
		data() {
			return {
				imgList: '',//轮播图数组
				shopList:'',//商品的数组
			}
		},
		onLoad() {
			
			
		},
		onShow() {
			var that = this;
			that.getData();
		},
		methods: {
			//获取头部轮播图
           getData(){
			   var that = this;
			   helper.Ajax('api/home/ads', "POST", function(res) {
				   that.getList();
			   	if(res.data.code == 1000) {
			   	  that.imgList = res.data.data 
			   	} else {
			   		uni.showToast({
			   			title: res.data.msg,
			   			icon: 'none'
			   		});
			   	}
			   }, function(res) {
			   	console.log(res) //请求失败回调
			   })
		   },
		   //获取商品的信息
		   getList(){
			   var that = this;
			   helper.Ajax('api/home/mission_indexlist', "POST", function(res) {
				   console.log(res) 
			   	if(res.data.code == 1000) {
			   	that.shopList = res.data.data;
			   	} else { 
			   		uni.showToast({
			   			title: res.data.msg,
			   			icon: 'none'
			   		});
			   	}
			   }, function(res) {
			   	// console.log(res) //请求失败回调
			   })
		   },
		   //点击跳转商品详情
		   jump(e){
			   // console.log(e); 
			   uni.navigateTo({
			   	url:'/pages/info/info?id=' + e
			   })
		   },
		   //
		   change(e){
			   var that = this;
			   uni.switchTab({
			   	url:'/pages/category/category?id=' + e
			   })
		   }
		},

	}
</script>

<style>
	.swiper {
		height: 500upx;
	}

	.loaded {
		width: 100%;
		height: 400upx;
	}

	.cate-section {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		height: 200upx;
		border-bottom: 15upx solid #F5F5F5;
	}

	.cate-item {
		width: 15%;
		margin-left: 4.5%;
		text-align: center;
	}

	.cate-item image {
		width: 80upx;
		height: 80upx;
	}

	.cate-name {
		font-size: 26upx;
	}

	.getLoveTop {
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
		height: 150upx;
	}

	.getLoveTopName {
		font-size: 32upx;
		width: 75%;
		padding-left: 30upx;
	}

	.getLoveTopImage {
		height: 60upx;
		width: 60upx;
		margin-left: 30upx;
	}

	.getLoveTopRight {
		height: 30upx;
		width: 25upx;
	}

	.shopData {
		width: 40%;
		margin-left: 5%;
		border: 1upx solid #F5F5F5;
		border-radius: 20upx;
		padding-bottom: 15upx;
		margin-top: 30upx;
	}

	.shopDataImage {
		width: 100%;
		height: 240upx;
	}

	.shopDataImage image {
		height: 100%;
		width: 100%;
		border-radius: 20upx 20upx 0 0;
	}

	.shopDataName {
		font-size: 32upx;
		color: #303133;
		overflow-x: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 15upx 0;
	}

	.shopDataMoney {
		font-size: 32upx;
		color: #fa436a;
	}

	.shopInfo {
		display: flex;
		flex-wrap: wrap;
	}
</style>
