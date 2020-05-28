<template>
	<view>
		<!--地址-->
		<view class="top" @click="jump()">
			<view class="TopInfo">
				<view class="TopInfoLeft">
					<text class="name">{{name}}</text><text class="phone">{{phone}}</text>
					<view class="TopInfoNameBotton" v-if="allAddress == ''">
						{{address}}
					</view>
					<view class="TopInfoNameBotton" v-if="allAddress != ''">
						{{allAddress}}
					</view>
				</view>
				<view class="TopInfoRight">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!--商品详情-->
		<view class="info" v-if="formtype == 1">
			<view class="infoData">
				<view class="infoDataLeft">
					<image :src="indexData.default_imgurl" mode=""></image>
				</view>
				<view class="infoDataRight">
					<view class="infoDataName">
						{{indexData.pname}}
					</view>
					<view class="infoDataBotton">
						<view class="infoDataBottonRighet">
							￥{{dataPrice}}
						</view>
						<view class="infoDataBottonLeft">
							*{{num}}
						</view>
					</view>
					<!-- <view class="infoDataNum">
						*{{num}}
					</view> -->
				</view>
			</view>
		</view>
		<view class="info" v-if="formtype == 2">
			<view class="infoData" v-for="(item,index) in indexDataInfo" :key='index'>
				<view class="infoDataLeft">
					<image :src="item.default_imgurl" mode=""></image>
				</view>
				<view class="infoDataRight">
					<view class="infoDataName">
						{{item.parentName}}
					</view>
					<view class="infoDataBotton">
						<view class="infoDataBottonRighet">
							￥{{item.money}}
						</view>
						<view class="infoDataBottonLeft">
							*{{item.value}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="choose">
			选择支付方式
		</view>
		<!--支付方式-->
		<view class="wxchat" @click="change()">
			<view class="wxchatLeft">
				零钱支付
			</view>
			<checkbox class="checkbox" :checked="check" /><text></text>
		</view>
		<!--底部点击支付-->
		<view class="botton">
			<view class="bottonLeft"  v-if="formtype == 1">
				<text>共{{num}}件</text><text>合计</text><text class="money">￥{{dataPrice}}</text>
			</view>
			<view class="bottonLeft"  v-if="formtype == 2">
				<text>共{{num}}件</text><text>合计</text><text class="money">￥{{dataPrice}}</text>
			</view>
			<view class="bottonRight" @click="pay()">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/conmmon.js';
	export default {
		data() {
			return {
				check: false,
				id: '', //传过来的数据
				index: '', //用来判断
				name: '', //这是默认的姓名
				phone: '', //这是默认的电话号码
				address: '', //这是默认的地址
				allAddress: '', //当想选择其他地址的时候，存放地址。
				indexData:'',//获取商品数据
				indexDataInfo:'',//获取数据
				num:'',//传的数量
				formtype:'',//区别购物车还是详情
				indexPrice:'',//购物车的价格
				indexNumber:'',//购物车的数量
				dataPrice:'',//详情的价格
				totelNum:'',//两个商品数量的拼接
			}
		},
		onLoad(options) {
			let that = this;
			that.index = options.index	
			that.formtype = options.formtype;
			that.id = options.id;
			console.log(options)
			if (that.index == 1) {
				
			} else if (that.index == 2){
				that.name = options.name;
				that.phone = options.phone;
				that.allAddress = options.address;
			}
			// console.log(options)
			if(that.formtype == 1){//这边为1是当用户在商品详情点击购买的
			    that.num = options.num;
				that.totelNum = options.num;
				that.getData()
			}else if(that.formtype == 2){//这是当用户在购物车里面购买的
				that.getDataInfo()
				// console.log(2222) 
			}
			
		},
		onShow() {
			var that = this;
			if (that.allAddress == '') {
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/user/get_my_address', '', "POST", e.data, function(res) {
							if (res.data.code == 1000) {
								let data = res.data.data;
								if (that.index == 1) {
									for (let i in data) {
										if (data[i].is_default == 1) {
											that.name = data[i].name;
											that.phone = data[i].phone;
											that.address = data[i].location_p + data[i].location_c + data[i].location_a + data[i].address
										}
									}
									if (that.address == '') {
										uni.showModal({
											title: '提示',
											content: '你当前尚未有默认地址,是否添加地址',
											success(res) {
												if (res.confirm) {
													uni.navigateTo({
														url: '/pages/address/address?sort=1' + '&formtype=' + that.formtype + '&id=' + that.id
													})
												} else {
													console.log('点击不添加地址')
												}
											}
										})
									}
								}

								

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						}, function(res) {
							console.log(res) //请求失败回调
						})
					}
				})
			} else if (that.allAddress != []) {

			}

		},
		methods: {
			//跳转地址
			jump() {
				let that = this;
				uni.redirectTo({
					url: '/pages/address/address?sort=1' + '&id=' + that.id + '&formtype=' + that.formtype + '&num=' + that.num
				})
			},
			//获取商品数据
			getData(){
				var that = this;
				helper.requestAjax('api/goods/product_detail',{pid:that.id},'POST',function(res){
					that.indexData = res.data.data;
					that.dataPrice = res.data.data.pros_all[0].price
				},function(res){ 
					console.log(res + '1111')
				})
			},
			//获取商品数据 
			getDataInfo(){
				var that = this;
				helper.requestAjax('api/goods/product_detail_multi',{pids:that.id},'POST',function(res){
					that.indexDataInfo = res.data.data;
					let data = res.data.data
					let price = 0;
					let number = 0;
					let totelNum = '';
					for(let i in data){
						price +=  parseInt(data[i].money);
						number += parseInt(data[i].value); 
						totelNum += data[i].value + ',';
					}
					totelNum = totelNum.slice(0, -1);
					that.dataPrice = price
					that.num = number;
					that.totelNum = totelNum
					console.log(that.totelNum)
				},function(res){ 
					console.log(res + '1111')
				})
			},
			//切换支付状态
			change(){
				var that = this;
				that.check = !that.check;
			}, 
			//点击购买
			pay(){
				var that = this;
				console.log(that.id);
				console.log(that.totelNum);
				if(that.check == false){
					uni.showToast({
						title:'请你选择支付方式',
						icon:'none'
					})
				}else{
					uni.getStorage({
						key: 'seal_params',
						success(e) {
							helper.request('api/order/add_order', {
								pIds:that.id,totalPrices:that.totelNum,
								address:that.address
							}, "POST", e.data, function(res) {
								console.log(res)
								if(res.data.code == 1000){
									uni.getStorage({
										key: 'seal_params',
										success(e) {
											helper.request('api/order/modify_state', {
												id:res.data.data.id
											}, "POST", e.data, function(res) {
												uni.showModal({
													title:'提示',
													content:res.data.msg,
													success(res) {
														if(res.confirm){
															uni.redirectTo({
																url:'/pages/my/my?id=3'
															})
														}else if(res.cancel){
															
														}
													}
												})
											}, function(res) {
												uni.redirectTo({
													url:'/pages/my/my?id=2'
												})
												// console.log(res) //请求失败回调
											})
										}
									})
									
								}else{
									uni.showModal({
										title:'提示',
										content:res.data.msg,
										success(res) {
											if(res.confirm){
												
											}else if(res.cancel){
												
											}
										}
									})
								}
								
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
	.TopInfo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 180upx;
		border-bottom: 10upx solid #F5F5F5;
	}

	.TopInfoLeft {
		font-size: 32upx;
		margin-left: 25upx;
	}

	.name {
		margin-right: 20upx;
	}

	.TopInfoRight image {
		height: 30upx;
		width: 25upx;
		margin-right: 25upx;
	}

	.TopInfoNameBotton {
		margin-top: 20upx;
	}

	.infoData {
		display: flex;
		padding: 20upx 0;
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
	.infoDataRight{
		width: 67%;
	}

	.infoDataName {
		font-size: 32upx;
		margin-top: 25upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.infoDataBotton{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 80upx;
	}
	.infoDataBottonRighet{
		font-size: 32upx;
		color: #FF3333;
	}
	.infoDataBottonLeft{
		font-size: 32upx;
	}

	.infoDataNum {
		font-size: 32upx;
		display: flex;
		justify-content: flex-end;
		margin-right: 20upx;
		margin-top: 50upx;
	}

	.choose {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 32upx;
		padding: 0 20upx;
		border-bottom: 8upx solid #F5F5F5;
	}

	.wxchat {
		font-size: 32upx;
		display: flex;
		align-items: center;
		height: 120upx;
		position: relative;
		border-bottom: 8upx solid #F5F5F5;
	}

	.wxchatLeft {
		margin-left: 30upx;
	}

	.checkbox {
		position: absolute;
		right: 25upx;
	}

	.botton {
		display: flex;
		align-items: center;
		height: 120upx;
		position: absolute;
		bottom: 0;
		background-color: #FFFFFF;
		width: 90%;
		padding: 0 5%;
	}

	.bottonLeft {
		font-size: 32upx;
		width: 70%;
	}

	.money {
		color: #FF0000;
		margin-left: 25upx;
	}

	.bottonRight {
		width: 30%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
		color: #FFFFFF;
		border-radius: 10upx;
	}
</style>
