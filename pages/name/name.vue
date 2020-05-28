<template>
	<view class="content">
		<input type="text" value="" placeholder="输入新昵称" class="input" v-model="name"/>
		<view class="name" @click="nickName()">
			修改昵称
		</view>
	</view>
</template>

<script>
	import helper from '../../common/conmmon.js'
	export default {
		data() {
			return {
				name:'',

			}
		},
		methods: {
			nickName(){
				var that = this;
				if(that.name == ''){
					uni.showToast({
						title:'昵称不能为空',
						icon:'none'
					})
				}else{
					uni.getStorage({
						key: 'seal_params',
						success(e) {
							helper.request('api/user/set_nickName', {
								nickName:that.name
							}, "POST", e.data, function(res) {
								uni.showToast({
									title:'修改成功',
									icon:'success'
								})
								uni.switchTab({
									url:'../user/user'
								})
							}, function(res) {
								console.log(res) //请求失败回调
							})
						}
					})
				}
				
			}

		}
	}
</script>

<style>
	.input {
		border: none;
		font-size: 16px;
		width: 70%;
		margin-bottom: 0;
		margin-left: 25px;
		margin-top: 80upx;
	}
	.name{
		width: 80%;
		margin-left: 10%;
		background:linear-gradient(66deg,rgba(77,157,209,1) 0%,rgba(103,193,233,1) 100%);
		height: 45px;
		line-height: 45px;
		font-size: 17px;
		color: #FFFFFF;
		text-align: center;
		border-radius: 20px;
		margin-top: 50px;
	}
</style>
