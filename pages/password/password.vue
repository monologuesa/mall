<template>
	<view>
		<view class="top">
			<view class="TopInfo">
				<view class="topLeft">
					旧密码
				</view>
				<view class="inTopRight">
					<input type="ttopLeftext" value="" placeholder="请输入你的旧密码" class="input"/>
				</view>
			</view>
			<view class="TopInfo">
				<view class="topLeft">
					新密码
				</view>
				<view class="inTopRight">
					<input type="ttopLeftext" value="" placeholder="请输入你的新密码" class="input"/>
				</view>
			</view>
			<view class="TopInfo">
				<view class="topLeft">
					确认密码
				</view>
				<view class="inTopRight">
					<input type="ttopLeftext" value="" placeholder="再次输入你的新密码" class="input"/>
				</view>
			</view>
			<view class="btn">
				确认
			</view>
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
	.btn{
		width: 85%;
		margin-left: 7.5%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 34upx;
		background:linear-gradient(66deg,rgba(77,157,209,1) 0%,rgba(103,193,233,1) 100%);
		color: #FFFFFF;
		border-radius: 50upx;
		margin-top: 150upx;
	}
	.TopInfo {
		display: flex;
		align-items: center;
		height: 120upx;
	}
	.topLeft{
		font-size: 32upx;
		margin: 0 30upx;
		width: 20%;
	}
	.input{
		height: 60upx;
		border: 1upx solid #F5F5F5;
		border-radius: 20upx;
		padding-left: 20upx;
	}
	.input-placeholder{
		font-size: 26upx;
		color: #000000;
	}
</style>
