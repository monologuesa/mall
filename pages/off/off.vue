<template>
	<view class="comment">
		<!--商品详情-->
		<view v-for="(item,index) in indexData" :key="index">
			<view class="info">
				<view class="infoData">
					<view class="infoDataLeft">
						<image :src="item.default_imgurl" mode=""></image>
					</view>
					<view class="infoDataRight">
						<view class="infoDataName">
							{{item.pname}}
						</view>
					</view>
				</view>
				<view class="money">
					价格：￥{{item.money}}
				</view>
				<view class="btn">
					<!-- <view class="btnLeft">
						取消订单
					</view> -->
					<view class="btnRight" @click="less(item.id)" v-if="item.offShelf == 0">
						下架
					</view>
					<view class="btnRight" @click="add(item.id)" v-if="item.offShelf == 1">
						上架
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
				indexData:'',
				state:1,

			}
		},
		onShow() {
			var that = this;
			that.getData()
		},
		methods: {
			getData() {
					var that = this;
					helper.Ajax('api/goods/findAll', "POST", function(res) {
						console.log(that.state)
						that.indexData = res.data.data;
					}, function(res) {
						console.log(res) //请求失败回调
					})
				},
				//下架
				less(id){
					var that = this;
					helper.requestAjax('api/goods/set_offShelf', {
						id: id,offShelf:1
					}, "POST", function(res) {
						that.getData()
						that.state = 2
					}, function(res) {
						console.log(res) //请求失败回调
					})
				},
				//上架
				add(id){
					var that = this;
					helper.requestAjax('api/goods/set_offShelf', {
						id: id,offShelf:0
					}, "POST", function(res) {
						that.getData()
						that.state = 1
					}, function(res) {
						console.log(res) //请求失败回调
					})
				}

		}
	}
</script>

<style>
	.infoData {
		display: flex;
		border-bottom: 10upx solid #F5F5F5;
	}

	.infoDataLeft {
		margin: 20upx;
	}

	.infoDataLeft image {
		height: 180upx;
		width: 180upx;
		border-radius: 20upx;
	}

	.infoDataName {
		font-size: 32upx;
		margin-top: 25upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.infoDataNum {
		font-size: 34upx;
		display: flex;
		justify-content: flex-end;
		margin-right: 20upx;
		margin-top: 50upx;
	}

	.money {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 80upx;
		font-size: 32upx;
		padding-right: 25upx;
	}

	.btn {
		display: flex;
		align-items: center;
		height: 80upx;
		justify-content: flex-end;
		border-bottom: 15upx solid #F5F5F5;
	}

	.btnLeft {
		width: 20%;
		margin-right: 20upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		border-radius: 14upx;
		border: 1upx solid #DCDCDC;
		font-size: 27upx;
	}

	.btnRight {
		width: 20%;
		margin-right: 20upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		border-radius: 14upx;
		border: 1upx solid #DCDCDC;
		font-size: 27upx;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
		color: #FFFFFF;

	}
</style>
