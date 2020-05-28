<template>
	<view class="content">
		<view class="dataInfo">
			<!-- <image src="../../static/person6.png" mode="" class="dataInfoImage"></image> -->
			<view class="dataInfoName" @click="jump()">
				发货商品
			</view>
			<image src="../../static/right.png" mode="" class="dataInfoRight"></image>
		</view>
		<view class="dataInfo">
			<!-- <image src="../../static/person6.png" mode="" class="dataInfoImage"></image> -->
			<view class="dataInfoName" @click="off()">
				下架商品
			</view>
			<image src="../../static/right.png" mode="" class="dataInfoRight"></image>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			jump(){
				var that = this;
				uni.navigateTo({
					url:'/pages/management/management'
				})
			},
			off(){
				var that = this;
				uni.navigateTo({
					url:'/pages/off/off'
				})
			}
		}
	}
</script>

<style>
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
