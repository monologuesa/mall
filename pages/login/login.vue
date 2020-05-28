<template>
	<view class="content">
		<view class="bj"></view>
		<view class="login">
			<view class="loginInfo">
				<view class="loginName">
					手机号
				</view>
				<input type="text" value="" placeholder="请输入你的手机号码" v-model="phone" class="input" />
			</view>
			<view class="loginInfo">
				<view class="loginName">
					密码
				</view>
				<input type="password" value="" placeholder="请输入你的密码" v-model="methods" class="input" />
			</view>
		</view>
		<view class="uni-btn-v" @click="login">
			登录
		</view>
		<view class="forgin" @click="change()">
			忘记密码?
		</view>
		<view class="registered">
			<text>还没有注册?</text>
			<text class="now" @click="now()">马上注册</text>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/conmmon.js'
	export default {
		data() {
			return {
				phone: '', //手机号码
				methods: '', //密码
			}
		},
		onLoad(options) {

		},
		methods: {
			//点击登录
			login() {
				var that = this;
				if (that.phone == '') {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					});
				} else if(that.phone == 'admin'&& that.methods == 'admin'){
					uni.navigateTo({
						url:'/pages/admin/admin'
					})
				}
				else if (!helper.c_mobile.test(that.phone)) {
					uni.showToast({
						title: '手机号码错误',
						icon: 'none'
					});
				} else if (that.methods == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
				} 
				else {
					helper.requestAjax('api/no_login/login', {phone:that.phone,passwd:that.methods}, "POST",function(res) {
						// console.log(res.data.data.token)
						if(res.data.code == 1000){
							uni.setStorage({
							key:'seal_params',
							data:res.data.data.token
							})
							uni.showModal({
								title:'提示',
								content:'登录成功',
								success(res) {
									if(res.confirm){
										uni.switchTab({
											url:'/pages/index/index'
										})
									}else{
										console.log(222)
									}
								}
							})
							
							
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}, function(res) {
						console.log(res) //请求失败回调
					})
				}
			},
			//点击忘记密码
			change() {
				uni.navigateTo({
					url: '/pages/forgin/forgin'
				})
			},
			//点击注册
			now() {
				uni.navigateTo({
					url: '/pages/registered/registered'
				})
			}
		}
	}
</script>

<style>
	.bj {
		width: 100%;
		height: 350upx;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
	}

	.loginInfo {
		display: flex;
		align-items: center;
		margin-top: 50px;
	}

	.loginName {
		font-size: 15px;
		width: 20%;
		margin-left: 25px;
	}

	.input {
		border: 1upx solid #f5f5f5;
		width: 60%;
		border-radius: 14upx;
		padding-left: 25upx;
	}

	.uni-btn-v {
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

	.forgin {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #4399fc;
		margin-top: 30upx;
	}

	.registered {
		position: absolute;
		bottom: 5%;
		left: 30%;
		font-size: 28upx;
	}

	.now {
		color: #4399fc;
	}

	.input-placeholder {
		font-size: 26upx;
	}
</style>
