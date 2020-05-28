<template>
	<view class="content">
		<view class="login">
			<view class="loginInfo">
				<view class="loginName">
					手机号
				</view>
				<input type="number" value="" placeholder="请输入你的手机号码" v-model="code" class="input" />
			</view>
			<view class="loginInfo">
				<view class="loginName">
					验证码
				</view>
				<input type="number" value="" placeholder="请输入验证码" v-model="mobile" class="Info" />
				<view class="numB" @click="numB()">
					{{ber}}
				</view>
				<!-- <button @click="getCode" :disabled="disabled" class="get-vcode">
					{{countdown}} <text v-show="timestatus">秒重获</text>
				</button> -->
			</view>
			<view class="loginInfo">
				<view class="loginName">
					新密码
				</view>
				<input type="password" value="" placeholder="请输入你的新密码" v-model="paw" class="input" />
			</view>
			<view class="loginInfo">
				<view class="loginName">
					确认密码
				</view>
				<input type="password" value="" placeholder="请输入你的新密码" v-model="paws" class="input" />
			</view>

			<view class="uni-btn-v" @click="confirm()">
				确认修改
			</view>
		</view>
	</view>
</template>

<script>
	import helper from "../../common/conmmon.js" //公共变量js

	export default {
		data() {
			return {
				code: '', //手机号
				mobile: '', //验证码
				paw: '', //新密码
				paws: '', //确认密码
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				clear: '',
				ber:'获取验证码'
			}
		},
		onLoad(options) {
			
		},
		methods: {
			//点击修改
			confirm(){
				var that = this;
				if(that.code == ''){
					uni.showToast({
						title:'请输入手机号码',
						icon: 'none'
					})
				}else if(!helper.c_mobile.test(that.code)){
					uni.showToast({
						title:'手机号码格式错误',
						icon: 'none'
					})
				}else if(that.mobile == ''){
					uni.showToast({
						title:'请输入验证码',
						icon: 'none'
					})
				}else if(that.ber != that.mobile ){
					uni.showToast({
						title:'验证码有误',
						icon: 'none'
					})
					that.numB()
				}
				else if(that.paw == ''){
					uni.showToast({
						title:'请输入新密码',
						icon: 'none'
					})
				}else if(that.paws == ''){
					uni.showToast({
						title:'请输入新密码',
						icon: 'none'
					})
				}else if(that.paw != that.paws){
					uni.showToast({
						title:'两次密码不一致',
						icon: 'none'
					})
				}
				else{
					helper.requestAjax('api/no_login/backpwd', {phone:that.code,code:that.mobile,newpwd:that.paw}, "POST",function(res) {
						if(res.data.code == 1000){
							uni.showModal({
								title:'提示',
								content:res.data.msg,
								success(res) {
									if(res.confirm){
										uni.redirectTo({
											url:'/pages/login/login'
										})
									}else if(res.cancel){
										console.log('点击了忘记密码的取消')
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
			//随机产生数字
			numB(){
				var that= this;
				let Number = Math.round(Math.random() * 10) + '' + Math.round(Math.random() * 10) + '' + Math.round(Math.random() * 10) + '' +Math.round(Math.random() * 10);
				that.ber = Number
			}
		}
	}
</script>

<style>
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
	.numB{
		 margin-left: 20upx;
		 color: #FF0000;
		 font-size: 32upx;
	}

	.Info {
		width: 30%;
		border: 1upx solid #f5f5f5;
		border-radius: 14upx;
		padding-left: 25upx;
	}

	.get-vcode {
		font-size: 28upx;

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
	.input-placeholder{
		font-size: 26upx;
	}
</style>
