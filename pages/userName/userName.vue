<template>
	<view>
		<input type="text" value="" placeholder="请输入你想修改的昵称"  class="input"/>

		<view class="btn">
			确认
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

		}
	}
</script>

<style>
	.input{
		height: 80upx;
		padding-left: 30upx;
		border-bottom: 1upx solid #F5F5F5;
	}
	.btn {
		width: 85%;
		margin-left: 7.5%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 34upx;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
		color: #FFFFFF;
		border-radius: 50upx;
		margin-top: 150upx;
	}
</style>
