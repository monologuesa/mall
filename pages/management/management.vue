<template>
	<view class="comment">
		<!--商品详情-->
		<!--待发货-->
		<view v-for="(item,index) in indexData" :key="index" v-if="item.state == 1 ">
			<view class="info">
				<view class="infoData">
					<view class="infoDataLeft">
						<image :src="item.img_urls" mode=""></image>
					</view>
					<view class="infoDataRight">
						<view class="infoDataName">
							{{item.parentNames}}
						</view>
						<view class="infoDataNum">
							*{{item.totalPrices}}
						</view>
					</view>
				</view>
				<view class="money">
					实付：￥{{item.sum}}
				</view>
				<view class="btn">
					<!-- <view class="btnLeft" @click="cancel(item.id)">
						取消订单
					</view> -->
					<view class="btnRight" @click="Ship(item.id)">
						发货
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

			}
		},
		onLoad(){
			var that = this;
			that.getData()
		},
		onShow() {
			var that = this;
			that.getData()
		},
		methods: {
             //获取数据
			getData(){
				var that = this;
				helper.Ajax('api/order/admin_get_order', "POST", function(res) {
					console.log(res)
					that.indexData = res.data.data;
					for(let i in that.indexData){
						that.indexData[i].check = false
					}
				}, function(res) {
					// console.log(res) //请求失败回调
				})
				// uni.getStorage({
				// 	key: 'seal_params',
				// 	success(e) {
				// 		helper.request('api/order/admin_get_order', {
				// 		}, "POST", e.data, function(res) {
				// 			console.log(res)
				// 			that.indexData = res.data.data; 
				// 			for(let i in that.indexData){
				// 				that.indexData[i].check = false
				// 			}
				// 		}, function(res) {
				// 			console.log(res) //请求失败回调
				// 		})
				// 	}
				// })
			},
			//
			Ship(id){
				var that = this;
				helper.requestAjax('api/order/admin_delivery', {
					id:id,
				}, "POST", function(res) {
					
					uni.showToast({
						title: res.data.msg,
						icon: 'success'
					});
					that.getData()
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
