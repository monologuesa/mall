<template>
	<view class="comment">
		<view class="Top" v-for="(item,index) in addressList" :key='index' >
			<view class="TopInfo">
				<view @click="jump(item.name,item.phone,item.location_p,item.location_c,item.location_a,item.address)">
				<view class="infoTop">
					<view class="infoTopName">
						{{item.name}}
					</view>
					<view class="infoTopPhone">
						{{item.phone}}
					</view>
				</view>
				<view class="infoBotton">
					{{item.location_p}}{{item.location_c}}{{item.location_a}}{{item.address}}
				</view>
				</view>
				<view class="bottom">
					<view class="bottomLeft">
						<checkbox class="checkbox" :checked="item.checked" disabled="false"/><text></text>
						<text>设置默认地址</text>
					</view>
					<view class="bottomIn" @click="modify(item.id)">
						<text>修改</text>
					</view>
					<view class="bottonInfo">
						<view class="bottonInfoImage">
							<image src="../../static/39.png"></image>
						</view>
						<view class="bottonInfoName" @click="del(item.id)">
							删除
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="change()">
			新建地址
		</view>
	</view>
</template>

<script>
	import helper from '../../common/conmmon.js';
	export default {
		data() {
			return {
				addressList: '' ,//地址的数组 
				id:'',//点击修改时传过去的参数
				sort:'',//1是订单详情点击进来的，2是地址管理进来的
				num:'',//传过来的数据
				formtype:'',//区别是详情进来的还是购物车进来的
			}
		},
		onPullDownRefresh() { // 下拉监听事件
			console.log('refresh');
			setTimeout(function() {

				uni.stopPullDownRefresh();
			}, 1000);
			this.getData();
		},
		onLoad(options) {
			var that = this;
			that.sort = options.sort;
			console.log(options)
			if(that.sort == 1){
				that.id = options.id;
				that.formtype = options.formtype;
				that.num = options.num
			}else{
				console.log('点击地址管理进来的')
			}
			
		},
		onShow() {
			var that = this;
			uni.getStorage({
				key: 'seal_params',
				success(e) {
					helper.request('api/user/get_my_address', '', "POST", e.data, function(res) {
						// console.log(res)
						if (res.data.code == 1000) {
							that.addressList = res.data.data;
							let data = res.data.data;
							for (let i = 0; i < data.length; i++) {
								if (data[i].is_default == 1) {
									data[i].checked = true;
								} else {
									data[i].checked = false;
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
		},
		methods: {
			getData() {
				var that = this;
				uni.getStorage({
					key: 'seal_params',
					success(e) {
						helper.request('api/user/get_my_address', '', "POST", e.data, function(res) {
							// console.log(res)
							if (res.data.code == 1000) {
								that.addressList = res.data.data;
								let data = res.data.data;
								for (let i = 0; i < data.length; i++) {
									if (data[i].is_default == 1) {
										data[i].checked = true;
									} else {
										data[i].checked = false;
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
			},
			//点击新增地址
			change() {
				var that = this;
				uni.redirectTo({
					url: '/pages/addressM/addressM?formtype=' + that.formtype + '&id=' + that.id + '&sort=' + that.sort + '&num=' + that.num
				})
			},
			//点击修改
			modify(e) {
				var that = this;
				uni.redirectTo({
					url:'/pages/new_address/new_address?id=' + e + '&formtype=' + that.formtype + '&pid=' + that.id + '&sort=' + that.sort + '&num=' + that.num
				})
			},
			//点击删除
			del(data) {
				var that = this;
				uni.showModal({
					title:'提示',
					content:'是否删除此地址',
					success(re){
						if(re.confirm){
							uni.getStorage({
								key: 'seal_params',
								success(e) {
									helper.request('api/user/delete_address', {
											id: data
										},
										"POST", e.data,
										function(res) {
											console.log(res)
											if (res.data.code == 1000) {
												that.getData()
											} else {
												uni.showToast({
													title: res.data.msg,
													icon: 'none'
												});
											}
										},
										function(res) {
											console.log(res) //请求失败回调
										})
								}
							})
						}else if(re.cancel){
							console.log('点击了取消')
						}
					}
				})
				
			},
			//点击回订单
			jump(name,phone,location_p,location_c,location_a,address){
				var that = this;
				if(that.sort == 1){
					let addresss = location_p + location_c + location_a + address;
					uni.redirectTo({
						// url:"/pages/pay/pay?name=" + name + '&phone=' + phone + '&address='+ addresss + '&index=2' + '&id=' + that.pid + '&num=' + that.num
						url:"/pages/pay/pay?name=" + name + '&phone=' + phone + '&address='+ addresss + '&index=2' + '&formtype=' + that.formtype + '&id=' + that.id + '&num=' + that.num
					})
				}else if(that.sort == 2){
					console.log('这是管理订单进来的')
				}
			}
		}
	}
</script>

<style>
	.infoTop {
		display: flex;
		align-items: center;
	}

	.TopInfo {
		margin: 20upx 0;
		padding-bottom: 10upx;
		border-bottom: 5upx solid #F5F5F5;
	}

	.infoTopName {
		font-size: 32upx;
		color: rgba(51, 51, 51, 1);
		margin-left: 25upx;
	}

	.infoTopPhone {
		font-size: 32upx;
		color: rgba(51, 51, 51, 1);
		margin-left: 25upx;
	}

	.infoBotton {
		font-size: 32upx;
		color: rgba(51, 51, 51, 1);
		margin: 20upx 0 20upx 25upx;
	}

	.bottonInfo {
		display: flex;
		align-items: center;
		margin-right: 20upx;
		margin-top: 8upx;
	}

	.bottonInfoImage image {
		height: 35upx;
		width: 30upx;
	}

	.bottonInfoName {
		font-size: 32upx;
		margin-top: -10upx;
		margin-left: 10upx;
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
		margin-bottom: 150upx;
	}

	.bottom {
		display: flex;
		align-items: center;
		height: 80upx;
		border-top: 2upx solid #F5F5F5;
	}

	.bottomLeft {
		font-size: 32upx;
		width: 60%;
		margin-left: 25upx;
	}

	.bottomLeft text {
		margin-top: 8upx;
	}

	.bottomIn {
		font-size: 32upx;
		margin-right: 30upx;
	}
</style>
