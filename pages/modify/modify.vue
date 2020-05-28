<template>
	<view class="content">
		<view class="top">
			<view class="topLeft">
				<view class="name">
					旧密码
				</view>
				<input type="password" value="" placeholder="请输入你的旧密码" class="input" v-model="oldPassword" />
			</view>
			<view class="topLeft">
				<view class="name">
					确认密码
				</view>
				<input type="password" value="" placeholder="请输入你的新密码" class="input" v-model="newPassword" />
			</view>
		</view>
		<view class="btn" @click="jump()">
			确认
		</view>
	</view>
</template>

<script>
	import helper from '../../common/conmmon.js'
	export default {
		data() {
			return {
				newPassword: '', //新密码
				oldPassword: '', //旧密码
			}
		},
		methods: {
			//点击确认
			jump(){
				var that = this;
				if(that.oldPassword  == ''){
					uni.showToast({
						title:'旧密码不能为空',
						icon:'none'
					})
				}else if(that.newPassword == ''){
					uni.showToast({
						title:'新密码不能为空',
						icon:'none'
					})
				}else{
					uni.getStorage({
						key: 'seal_params',
						success(e) {
							// console.log(e)
							helper.request('api/user/modify_password', {
								oldPassword:that.oldPassword,newPassword:that.newPassword
							}, "POST", e.data, function(res) {
								// console.log(res)
								if(res.data.code == 1000){
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}else{
									uni.showModal({
										title:'提示',
										content:res.data.msg
									})
								}
								
							}, function(res) {
								console.log(res) //请求失败回调
							})
						},fail(e) {
							if(e.data == ''){
								uni.showModal({
									title:'提示',
									content:'你当前尚未登录,是否登录',
									success(data) {
										if(data.confirm){
											uni.redirectTo({
												url: '/pages/login/login'
											})
										}else{
											uni.redirectTo({
												url: '/pages/login/login'
											})
										}
									}
								})
							}
						}
					})
				}
				
			},
		},
	}
</script>

<style>
	.topLeft {
		width: 100%;
		display: flex;
		align-items: center;
		height: 120upx;
	}

	.name {
		font-size: 32upx;
		margin: 0 20upx;
		width: 20%;
	}

	.input {
		width: 60%;
		height: 60upx;
		border: 1upx solid #DCDCDC;
		border-radius: 14upx;
		padding-left: 20upx;
	}

	.input-placeholder {
		font-size: 30upx;
	}

	.btn {
		width: 80%;
		margin-left: 10%;
		height: 80upx;
		line-height: 80upx;
		font-size: 32upx;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
		text-align: center;
		border-radius: 40upx;
		margin-top: 80upx;
		color: #FFFFFF;
	}
</style>
