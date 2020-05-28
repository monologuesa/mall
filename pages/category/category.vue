<template>
	<view class="content">
		<scroll-view class="floor-list" scroll-y>
			<view class="scoll-wrapper">
				<view v-for="(item, index) in goodsList" :key="index" class="scoll-name " :class="{active: item.id == currentId}"
				 @click="tabtap(item)">
					{{item.type}}
				</view>
			</view>
		</scroll-view>
		<!-- 商品详情 -->
		<view class="shop">
			<view class="shopInfo" v-for="(item,index) in shopList" :key="index" @click="jump(item.id)">
				<view class="shopData">
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
	import helper from '../../common/conmmon.js';
	export default {
		data() {
			return {
				currentId: 1, //第一个显示红色
				goodsList: '', //列表
				shopList: '', //商品列表
			}
		},
		onLoad(options) {
			var that = this;
			console.log(options)
			that.getData();
		},
		methods: {
			//一级分类点击
			tabtap(item) {
				var that = this;
				this.currentId = item.id;
				// console.log(this.currentId) 
				that.getShop();
			},
			getData() {
				var that = this;
				helper.Ajax('api/home/category_list', "POST", function(res) {
					that.getShop();
					if (res.data.code == 1000) {
						that.goodsList = res.data.data;
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
			getShop() {
				var that = this;
				helper.requestAjax('api/home/mission_list', {
					type: this.currentId
				}, "POST", function(res) {
					// console.log(res);  
					if (res.data.code == 1000) {
						that.shopList = res.data.data;
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
			//点击跳转商品详情
			jump(e) {
				// console.log(e); 
				uni.navigateTo({
					url: '/pages/info/info?id=' + e
				})
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		display: none;
		/* Chrome Safari */
	}

	.floor-list {
		width: 15%;
		height: 154vw;
		float: left;
		overflow-y: auto;
		scrollbar-width: none;
		/* firefox */
		-ms-overflow-style: none;
		/* IE 10+ */
	}


	.scoll-wrapper {
		line-height: 100upx;
		white-space: nowrap;
		height: 100%;
	}

	.scoll-name {
		font-size: 30upx;
		margin-left: 20upx;
		color: #606266;
		border-bottom: 2upx solid #F5F5F5;
	}

	.active {
		color: #fa436a;
	}

	.shop {
		width: 85%;
		height: 154vw;
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
	}

	.shopData {
		/* width: 40%;
		margin-left: 5%;
		border: 1upx solid #F5F5F5;
		border-radius: 20upx;
		padding-bottom: 15upx;
		margin-top: 30upx; */
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
		/* display: flex;
		flex-wrap: wrap; */
		width: 44%;
		height: 48vw;
		margin-left: 5%;
		border: 1upx solid #F5F5F5;
		border-radius: 20upx;
		padding-bottom: 15upx;
		margin-top: 30upx;
	}
</style>
