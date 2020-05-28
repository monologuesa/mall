<template>
	<view class="comment">
		<view class="top" @click="change()">
			{{ remove ? '编辑' : '管理' }}
		</view>
		<view class="data" v-for="(item,index) in indexData" :key='index'>
			<view class="dataInfo">
				<checkbox class="checkbox" :checked="item.check" @click="cilckButton(item.pId)" /><text></text>
				<view class="Info">
					<view class="InfoImage">
						<image :src="item.default_imgurl" mode=""></image>
					</view>
					<view class="infoName">
						{{item.parentName}}
					</view>
					<view class="infoNorm">
						{{item.pName}}
					</view>
					<view class="infoBotton">
						<view class="infoMoney">
							￥{{item.money}}
						</view>
						<view class="infoRight">
							<text class="less" @click="lessShopping(item.pId,item.value)">-</text>
							<text class="number">{{item.value}}</text>
							<text class="add"  @click="addShopping(item.pId,item.value)">+</text>
						</view>
					</view>
				</view>
			</view>

		</view>

		<!--底部-->
		<view class="botton">
			<view class="bottonLeft " :class="remove == false ? 'hide': ''">
				合计{{money}}
			</view>
			<view class="bottonRight" :class="remove == false ? 'hide': ''" @click="pay()">
				去结算
			</view>
			<view class="bottonRight right" :class="remove == false ? '': 'hide'" @click="del()">
				删除
			</view>
		</view>

	</view>
</template>

<script>
	import helper from '../../common/conmmon.js'
	export default {
		data() {
			return {
				check: false,
				money: '￥0',
				indexData: '', //获取数据
				remove: true, //判断点击管理是切换结算
				id:'',//存放所选的商品pid
				num:'',//存放所选商品的数量

			}
		},
		onLoad() {
			// this.getData();
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
			this.money = '￥0'
		},
		methods: {
			//获取商品详情的数据
			getData() {
				var that = this;
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/cart/findAll', {}, "POST", e.data, function(res) {
							that.indexData = res.data.data;
							let data = res.data.data
							for (let i in data) {
								data[i].check = false
							}
							// console.log(res)
						}, function(res) {
							console.log(res) //请求失败回调
						})
					}
				})
			},
			//点击管理出现删除
			change() {
				var that = this;
				let remo = false;
				remo = !that.remove;
				that.remove = remo;
			},
			//点击商品中的按钮
			cilckButton(e) {
				let that = this;
				let data = that.indexData;
				for (let i in data) {
					if (data[i].pId == e) {
						data[i].check = !data[i].check
					}
				}
				that.countPrice(data)
			},
			//计算总价格
			countPrice(data) {
				let that = this;
				let price = 0;
				for (let i in data) {
					if (data[i].check == true) {
						price += data[i].money * data[i].value
					}
				}
				that.money = '￥' + price;
			},
			//增加数量
			addShopping(id, number) {
				var that = this;
				let num  = number;
				num = num + 1;
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/cart/add_cart', {
							pId: id,
							value: num
						}, "POST", e.data, function(res) {
							that.getData();

						}, function(res) {
							console.log(res) //请求失败回调
						})
					}
				})
			},
			//减少数量
			lessShopping(id, number){
				let that = this;
				let num  = number;
				num = num - 1;
				if(num < 1){
					uni.showToast({
						title:'不能在减少了',
						icon:'none'
					})
				}else{
					uni.getStorage({
						key: 'seal_params',
						success(e) {
							helper.request('api/cart/add_cart', {
								pId: id,
								value: num
							}, "POST", e.data, function(res) {
								that.getData();
					
							}, function(res) {
								console.log(res) //请求失败回调
							})
						}
					})
				}
			},
			//删除商品
			del(){
				var that = this;
				let data = that.indexData;
				for(let i in data){
					if(data[i].check == true){
						uni.getStorage({
							key: 'seal_params',
							success(e) {
								helper.request('api/cart/add_cart', {
									pId: data[i].pId,
									value:0
								}, "POST", e.data, function(res) {
						that.getData() 
								}, function(res) {
									console.log(res) //请求失败回调
								})
							}
						})
					}
				}
			},
			//去结算
			pay(){
				var that = this;
				let arrId = '';
				let arrNum = '';
				let data = that.indexData;
				console.log(JSON.stringify(data))
				for(let i in data){
					if(data[i].check == true){
						arrId += data[i].pId + ',';
						arrNum += data[i].value + ',';
					}
				}
				if(that.money == '￥0'){
					uni.showToast({
						title:'你当前尚未选择商品',
						icon:'none'
					})
				}else{
					arrId  = arrId.slice(0, -1);
					arrNum  = arrNum.slice(0, -1);
					that.id = arrId; 
					that.num = arrNum;
					uni.navigateTo({
						url:'/pages/pay/pay?id=' + that.id + '&index=1' + '&num=' + that.num + '&formtype=2'
					})
				}
				
			}
		}
	}
</script>

<style>
	.comment {
		padding-bottom: 150upx;
	}

	.top {
		width: 20%;
		height: 60upx;
		border-radius: 14upx;
		text-align: center;
		line-height: 60upx;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
		color: #FFFFFF;
		/* margin-right: 30upx; */
		margin-left: 78%;
		font-size: 32upx;
		margin-top: 25upx;
		margin-bottom: 25upx;
	}

	.dataInfo {
		width: 99%;
		position: relative;
		height: 250upx;
		border: 1upx solid #F5F5F5;
	}

	.checkbox {
		position: absolute;
		top: 100upx;
		left: 10upx;
	}

	.InfoImage {
		position: absolute;
		top: 40upx;
		left: 60upx;
		height: 180upx;
		width: 180upx;
	}

	.infoName {
		position: absolute;
		top: 40upx;
		left: 250upx;
		font-size: 30upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.InfoImage image {
		width: 100%;
		height: 100%;
		border-radius: 20upx;
	}

	.infoBotton {
		position: absolute;
		top: 180upx;
		left: 250upx;
		display: flex;
		width: 65%;
		justify-content: space-between;
	}

	.infoNorm {
		font-size: 32upx;
		position: absolute;
		top: 120upx;
		left: 260upx;
		font-size: 30upx;
		color: #999999;
	}

	.infoMoney {
		font-size: 32upx;
		color: rgba(255, 0, 0, 1);
	}

	.less {
		font-size: 34upx;
		color: rgba(102, 102, 102, 1);
		margin-right: 20upx;
	}

	.add {
		font-size: 34upx;
		color: rgba(102, 102, 102, 1);
		margin-left: 20upx;
	}

	.number {
		font-size: 32upx;
		color: rgba(102, 102, 102, 1);
	}

	.botton {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120upx;
		position: fixed;
		bottom: 0%;
		background-color: #FFFFFF;
	}

	.bottonLeft {
		font-size: 32upx;
		color: rgba(51, 51, 51, 1);
		margin-left: 30upx;
	}

	.bottonRight {
		width: 20%;
		height: 60upx;
		line-height: 60upx;
		background: linear-gradient(66deg, rgba(77, 157, 209, 1) 0%, rgba(103, 193, 233, 1) 100%);
		border-radius: 50upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
	}

	.hide {
		display: none;
	}

	.right {
		margin-left: 80%;
	}
</style>
