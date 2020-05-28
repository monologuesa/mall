<template>
	<view class="content">
		<view class="top">
			<!--顶部-->
			<view class="topName">
				<view class="topImage">
					<image src="../../static/32.png" mode=""></image>
				</view>
				<view class="topCommon">
					<view class="topNameRight">
						{{getName}}
					</view>
					<view class="botton">
						<view class="bottonLeft">
							<!-- 零钱:{{money}} -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--全部订单-->
		<view class="bj">
			<view class="in">
				<view class="inTop" @click="goMyOrder(1)">
					<view class="inTopLeft">
						全部订单
					</view>
					<view class="inTopRight">
						<image src="../../static/right.png" mode=""></image>
					</view>
				</view>
				<view class="inCommon">
					<view class="inCommonTop" @click="goMyOrder(2)">
						<image src="../../static/per-nav1.png" mode="" class="inCommonTopImge"></image>
						<view class="inCommonTopName">
							待付款
						</view>
					</view>
					<view class="inCommonTop" @click="goMyOrder(3)">
						<image src="../../static/per-nav2.png" mode="" class="inCommonTopImge"></image>
						<view class="inCommonTopName">
							待发货
						</view>
					</view>
					<view class="inCommonTop" @click="goMyOrder(4)">
						<image src="../../static/per-nav3.png" mode="" class="inCommonTopImge"></image>
						<view class="inCommonTopName">
							待收货
						</view>
					</view>
					<view class="inCommonTop" @click="goMyOrder(5)">
						<image src="../../static/per-nav4.png" mode="" class="inCommonTopImge"></image>
						<view class="inCommonTopName">
							已完成
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 排列-->
		<view class="data">
			<view class="dataInfo" @click="address()">
				<image src="../../static/person6.png" mode="" class="dataInfoImage"></image>
				<view class="dataInfoName">
					地址管理
				</view>
				<image src="../../static/right.png" mode="" class="dataInfoRight"></image>
			</view>
			<view class="dataInfo" @click="name()">
				<image src="../../static/person6.png" mode="" class="dataInfoImage"></image>
				<view class="dataInfoName">
					修改昵称
				</view>
				<image src="../../static/right.png" mode="" class="dataInfoRight"></image>
			</view>
			<view class="dataInfo" @click="modify()">
				<image src="../../static/person6.png" mode="" class="dataInfoImage"></image>
				<view class="dataInfoName">
					修改登录密码
				</view>
				<image src="../../static/right.png" mode="" class="dataInfoRight"></image>
			</view>
			<view class="dataInfo" @click="jump()">
				<image src="../../static/person6.png" mode="" class="dataInfoImage"></image>
				<view class="dataInfoName">
					退出登录
				</view>
				<image src="../../static/right.png" mode="" class="dataInfoRight"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/conmmon.js';
	export default {
		data() {
			return {
				getName: ''
			}
		},
		onLoad(options) {
			
		},
		onShow() {
			this.getData();
			uni.getStorage({
				key: 'seal_params',
				success(e) {
					console.log(e + '11')
				},fail(e) {
					if(e.data == ''){
						uni.showModal({
							title:'提示',
							content:'你当前尚未登录，是否登录',
							success(res) {
								if(res.confirm){
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}else if(res.cancel){
									console.log('点击了取消')
								}
							}
						})
					}
				}
				
			})
		},
		methods: {
			getData(){
				var that = this;
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/user/get_nickName', {
						}, "POST", e.data, function(res) {
							console.log(res.data)
							if(res.data == ''){
								that.getName = '当前尚未名字'
							}else{
								that.getName = res.data
							}
							
						}, function(res) {
							console.log(res) //请求失败回调
						})
					}
				})
			},
			//跳转地址
			address() {
				var that = this;
				uni.navigateTo({
					url: '/pages/address/address?sort=2'
				})
			},
			//修改地址
			name() {
				var that = this;
				uni.navigateTo({
					url: '/pages/name/name'
				})
			},
			//退出登录
			jump() {
				var that = this;
				uni.showModal({
					title:'提示',
					content:'是否退出登录',
					success(r) {
						if(r.confirm){
							uni.getStorage({
								key: 'seal_params',
								success: function(res) {
									console.log(res)
									uni.removeStorage({
										key: 'seal_params',
										success: function(re) {
											uni.redirectTo({
												url: '/pages/login/login'
											})
										}
									})
								}
							})
						}else if(r.cancel){
							console.log('点击取消')
						}
					}
				})
				
				
			},
			//点击跳转相对应的状态
			goMyOrder(e) {
				var that = this;
				uni.navigateTo({
					url: '/pages/my/my?id=' + e
				})
			},
			//点击修改密码
			modify(){
				var that = this;
				uni.navigateTo({
					url: '/pages/modify/modify'
				})
			}
		}
	}
</script>

<style>
	.topName {
		display: flex;
		align-items: center;
		height: 400upx;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
	}

	.topImage {
		height: 120upx;
		width: 120upx;
		margin: 0 30upx;
	}

	.topImage image {
		width: 100%;
		height: 100%;
	}

	.topNameRight {
		font-size: 32upx;
		color: #FFFFFF;
	}

	.bottonLeft {
		font-size: 32upx;
		margin-top: 10upx;
		color: #FFFFFF;
	}

	.in {
		width: 90%;
		margin-left: 5%;
		/* height: 200upx; */
		padding-bottom: 20upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		border: 1upx solid #dcdcdc;
		margin-top: -50upx;

	}

	.inTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 15upx 10upx 0 10upx;
		padding-bottom: 20upx;
		border-bottom: 1upx solid #DCDCDC;
	}

	.inTopRight {
		height: 30upx;
		width: 28upx;
	}

	.inTopRight image {
		height: 100%;
		width: 100%;
	}

	.inTopLeft {
		font-size: 32upx;
	}

	.inCommon {
		display: flex;
		/* flex-wrap: nowrap; */
	}

	.inCommonTop {
		width: 16%;
		margin-left: 6%;
		text-align: center;
		margin-top: 20upx;
	}

	.inCommonTopName {
		font-size: 26upx;
	}

	.inCommonTopImge {
		height: 60upx;
		width: 55upx;
	}

	.data {
		margin-top: 20upx;
	}

	.dataInfo {
		display: flex;
		align-items: center;
		height: 120upx;
		border: 1upx solid #F5F5F5;
	}

	.dataInfoName {
		font-size: 32upx;
		width: 80%;
		margin-left: 20upx;
	}

	.dataInfoImage {
		height: 50upx;
		width: 50upx;
		margin-left: 20upx;
	}

	.dataInfoRight {
		width: 28upx;
		height: 30upx;
	}
</style>
