<template>
	<view>
		<!--头部-->
		<scroll-view class="floor-list" scroll-x>
			<view class="scoll-wrapper">
				<view v-for="(item, index) in goodsList" :key="index" class="scoll-name " :class="{active: item.id === currentId}"
				 @click="tabtap(item)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!--商品详情-->
		<!--全部-->
		<view v-for="(item,index) in indexData" :key="index" v-if="currentId == 1">
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
				<!-- <view class="btn">
					<view class="btnLeft">
						取消订单
					</view>
					<view class="btnRight">
						未付款
					</view>
				</view> -->
			</view>
		</view>
		<!--待付款-->
		<view v-for="(item,index) in indexData" :key="index" v-if="item.state == 0 && currentId == 2">
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
					<view class="btnLeft" @click="cancel(item.id)" v-if="item.check == false">
						取消订单
					</view>
					<view class="btnRight" @click="click(item.id)">
						去付款
					</view>
				</view>
			</view>
		</view>
		<!--待发货-->
		<view v-for="(item,index) in indexData" :key="index" v-if="item.state == 1 && currentId == 3">
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
					<view class="btnLeft" @click="cancel(item.id)">
						取消订单
					</view>
					<!-- <view class="btnRight">
						未付款
					</view> -->
				</view>
			</view>
		</view>
		<!--待收货-->
		<view v-for="(item,index) in indexData" :key="index" v-if="item.state == 2 && currentId == 4">
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
					<view class="btnLeft" @click="cancel(item.id)" >
						取消订单
					</view>
					<view class="btnRight" @click="click(item.id)">
						确认收货
					</view>
				</view>
			</view>
		</view>
		<!--已完成-->
		<view v-for="(item,index) in indexData" :key="index" v-if="item.state == 3 && currentId == 5">
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
					<view class="btnLeft">
						已完成
					</view>
					<!-- <view class="btnRight">
						确认收货
					</view> -->
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
				currentId: 1, //
				goodsList: [{name: '全部',id: '1'},{name: '待付款',id: '2'},{name: '待发货',id: '3'},{name: '待收货',id: '4'},{name: '已完成',id: '5'},],
				indexData:'',//
			}
		},
		onLoad(options) {
			var that = this;
			that.currentId = options.id;
			that.getData()
		},
		onShow() {
			
		},
		methods: {
			
			//一级分类点击
			tabtap(item) {
				var that = this;
				that.currentId = item.id;
				that.getData()
			},
			//获取数据
			getData(){
				var that = this;
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/order/get_my_order', {
							
						}, "POST", e.data, function(res) {
							// console.log(res)
							that.indexData = res.data.data;
							for(let i in that.indexData){
								that.indexData[i].check = false
							}
						}, function(res) {
							console.log(res) //请求失败回调
						})
					}
				})
			},
			//取消订单
			cancel(id){
				var that = this;
				// console.log(JSON.stringify(indexData))
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/order/modify_state', {
							id:id,
							cancel:true
						}, "POST", e.data, function(res) {
							that.getData()
						}, function(res) {
							console.log(res) //请求失败回调
						})
					}
				})
			},
			//确认收货
			click(id){
				var that = this;
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/order/modify_state', {
							id:id,
						}, "POST", e.data, function(res) {
							that.getData()
						}, function(res) {
							console.log(res) //请求失败回调
						})
					}
				})
			}
		}
	}
</script>

<style>
	.scoll-wrapper {
		display: flex;
		justify-content: space-around;
		align-items: center;
		white-space: nowrap;
		height: 80upx;
		border-bottom: 5upx solid #F5F5F5;
	}
	.scoll-name {
		font-size: 30upx;
		margin-left: 30upx;
		color: #606266;
	}
	.active {
		color: #fa436a;
	}
	.infoData{
		display: flex;
		border-bottom: 10upx solid #F5F5F5;
	}
	.infoDataLeft{
		margin: 20upx;
	}
	.infoDataLeft image{
		height: 180upx;
		width: 180upx;
		border-radius: 20upx;
	}
	.infoDataName{
		font-size: 32upx;
		margin-top: 25upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.infoDataNum{
		font-size: 34upx;
		display: flex;
		justify-content: flex-end;
		margin-right: 20upx;
		margin-top: 50upx;
	}
	.money{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 80upx;
		font-size: 32upx;
		padding-right: 25upx;
		border-bottom: 1upx solid #F5F5F5;
	}
	.btn{
		display: flex;
		align-items: center;
		height: 100upx;
		justify-content: flex-end;
		border-bottom: 15upx solid #F5F5F5;
	}
	.btnLeft{
		width: 20%;
		margin-right: 20upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		border-radius: 14upx;
		border:1upx solid #DCDCDC;
		font-size: 27upx;
	}
	.btnRight{
		width: 20%;
		margin-right: 20upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		border-radius: 14upx;
		border:1upx solid #DCDCDC;
		font-size: 27upx;
		background:linear-gradient(66deg,rgba(77,157,209,1) 0%,rgba(103,193,233,1) 100%);
		color: #FFFFFF;
		
	}
</style>
