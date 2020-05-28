<template>
	<view class="top">
		<view class="TopInfo">
			<view class="topLeft">
				收货人
			</view>
			<input type="text" value="" placeholder="请填写收货人的姓名" class="input" v-model="name" />
		</view>
		<view class="TopInfo">
			<view class="topLeft">
				联系方式
			</view>
			<input type="number" value="" placeholder="请填写收货人的手机号码" class="input" v-model="phone" />
		</view>
		<view class="TopInfo">
			<view class="topLeft">
				所在地区
			</view>
			<view @tap="togglePopup('bottom','popup')" style="display: flex;align-items: center;font-size: 32upx;">
				<view v-for="(item, index) in selectList" :key="index">
					{{item.txt}}<span v-show="index == 0 || index == 1">,</span>
				</view>
			</view>
			<uni-popup ref="popup" :type="type" @change="change">
				<view class="select-border">
					<view class="header">
						<view class="title">
							选择地区
						</view>
						<view class="cancel-icon" @tap="cancel('popup')">
							X
						</view>
					</view>
					<view class="select-box">
						<view class="select-item">
							<view class="select-list" @tap="tabEvent(index)" :class="indexTab == index ? 'selected' : ''" v-for="(item, index) in selectList"
							 :key="index">
								{{item.txt}}
							</view>
						</view>
						<view class="select-item-box">
							<!-- 省 -->
							<view class="province-box" v-show="proviceShow">
								<view class="select-list-cont" @tap="provinceEvent(item,index)" v-for="(item,index) in provinceData" :key="item.code">
									{{item.name}}<span class="check" v-show="index == checkOne">√</span>
								</view>
							</view>
							<!-- 市 -->
							<view class="city-box" v-show="cityShow">
								<view class="select-list-cont" @tap="cityEvent(item,index)" v-for="(item,index) in cityData" :key="item.code">
									{{item.name}}<span class="check" v-show="index==checkTwo">√</span>
								</view>
							</view>
							<!-- 区 -->
							<view class="area-box" v-show="areaShow">
								<view class="select-list-cont" @tap="areaEvent(item,index)" v-for="(item,index) in areaData" :key="item.code">
									{{item.name}}<span class="check" v-show="index==checkThree">√</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="TopInfo">
			<view class="topLeft">
				详细地址
			</view>
			<input type="text" value="" placeholder="请填写你的详细地址" class="input" v-model="address" />
		</view>
		<view class="TopInfoR" @click="TopInfoR()">
			<view class="topLeftR">
				设为默认地址
			</view>
			<checkbox class="checkbox" :checked="check" /><text></text>
		</view>
		<view class="btn" @click="btn()">
			保存
		</view>
	</view>
</template>

<script>
	import cityDatas from '../../common/city.area.js';
	import uniPopup from '@/common/uni-pop.vue';
	import helper from '../../common/conmmon.js';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				check: false, //判断是否为默认按钮
				location_p: '', //省
				location_c: '', //市
				location_a: '', //县
				name: '', //绑定收货人
				phone: '', //绑定联系方式
				address: '', //绑定详细地址
				is_default: 0, //判断是不是点击了默认地址
				provinceData: cityDatas,
				cityData: [],
				areaData: [],
				selectList: [{
					txt: '请选择'
				}, {
					txt: '请选择'
				}, {
					txt: '请选择'
				}],
				tabOne: '请选择',
				indexTab: 0,
				proviceShow: true,
				areaShow: false,
				cityShow: false,
				show: false,
				type: '',
				checkOne: null,
				checkTwo: null,
				checkThree: null,
				id:'',//商品的id
				formtype:'',//判断详情还是购物车
				sort:'',//判断是详情进来的还是地址管理进来的
				num:'',
			}
		},
		onLoad(options) {
			var that = this;
			that.sort = options.sort;
			if(that.sort == 1){
				that.id = options.id;
				that.formtype = options.formtype;
				that.num = options.num
			}else if(that.sort == 2){
				console.log('这是点击地址管理的')
			}

		},
		watch: {

		},
		methods: {
			togglePopup(type, open) {
				this.type = type
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},
			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},
			change(e) {
				if (e.show == true) {
					uni.hideTabBar()
				} else {
					uni.showTabBar()
				}
			},
			tabEvent(index) {
				this.indexTab = index
				if (this.indexTab == 0) {
					this.proviceShow = true
					this.cityShow = false
					this.areaShow = false
					// this.checkOne = null
					this.checkTwo = null
					this.checkThree = null
					// this.cityData = []
					this.areaData = []
					// this.selectList[0].txt = "请选择"
					this.selectList[1].txt = "请选择"
					this.selectList[2].txt = "请选择"
				} else if (this.indexTab == 1) {
					this.proviceShow = false
					this.cityShow = true
					this.areaShow = false
					// this.checkTwo = null
					this.checkThree = null
					// this.areaData = []
					// this.selectList[1].txt = "请选择"
					this.selectList[2].txt = "请选择"
				} else if (this.indexTab == 2) {
					this.proviceShow = false
					this.cityShow = false
					this.areaShow = true
				}
			},
			provinceEvent(data, index) {
				this.checkOne = index
				this.selectList[0].txt = data.name
				this.indexTab = 1
				this.proviceShow = false
				this.cityShow = true
				this.areaShow = false
				this.cityData = data.cityList
				this.location_p = data.name
			},
			cityEvent(data, index) {
				this.checkTwo = index
				this.selectList[1].txt = data.name
				this.indexTab = 2
				this.proviceShow = false
				this.cityShow = false
				this.areaShow = true
				this.areaData = data.areaList
				this.location_c = data.name
			},
			areaEvent(data, index) {
				this.checkThree = index
				this.selectList[2].txt = data.name
				this.location_a = data.name
			},
			//点击是否为默认地址
			TopInfoR() {
				var that = this;
				that.check = !that.check;
				if (that.check == true) {
					that.is_default = 1;
				} else {
					that.is_default = 0;
				}
				console.log(that.is_default)
			},
			//点击保存
			btn() {
				var that = this;
				console.log(that.is_default)
				if (that.name == '') {
					uni.showToast({
						title: '请输入收货人',
						icon: 'none'
					})
				} else if (that.phone == '') {
					uni.showToast({
						title: '请输入联系方式',
						icon: 'none'
					})
				} else if (!helper.c_mobile.test(that.phone)) {
					uni.showToast({
						title: '手机格式错误',
						icon: 'none'
					})
				} else if (that.location_a == '' || that.location_c == '' || that.location_p == '') {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
				} else if (that.address == '') {
					uni.showToast({
						title: '请填写详细地址',
						icon: 'none'
					})
				} else {
					uni.getStorage({
						key: 'seal_params',
						success(e) {
							helper.request('api/user/save_address', {
									name: that.name,
									phone: that.phone,
									address: that.address,
									is_default: that.is_default,
									location_a: that.location_a,
									location_c: that.location_c,
									location_p: that.location_p
								},
								"POST", e.data,
								function(res) {
									// console.log(res)
									if (res.data.code == 1000) {
										if(that.sort == 1){
											uni.redirectTo({
												url:'/pages/address/address?sort=1' + '&id=' + that.id + '&formtype=' + that.formtype + '&num=' + that.num
											})
										}else if(that.sort == 2){
											uni.redirectTo({
												url:'/pages/address/address'
											})
										}
										
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
				}
			}
		}
	}
</script>

<style>
	.input-placeholder {
		font-size: 26upx;
		color: #000000;
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

	.checkbox {
		position: absolute;
		right: 30upx;
		/* top: 60upx; */
	}

	.TopInfo {
		display: flex;
		align-items: center;
		height: 120upx;
	}

	.TopInfoR {
		display: flex;
		align-items: center;
		height: 120upx;
		justify-content: space-between;
		width: 100%;
		position: relative;
	}

	.topLeft {
		width: 20%;
		font-size: 32upx;
		margin: 0 30upx;
	}

	.input {
		border-bottom: 1upx solid #F5F5F5;
	}

	.topLeftR {
		width: 30%;
		font-size: 32upx;
		margin: 0 30upx;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 35upx;
	}

	.title {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.cancel-icon {
		font-size: 34upx;
		color: rgba(153, 153, 153, 1);
	}

	.check {
		padding-left: 17upx;
		color: #FF7E28;
	}

	.select-box {
		height: 1024upx;
	}

	.select-item {
		display: flex;
		align-items: center;
		padding-left: 50upx;
		margin-bottom: 20upx;
		border-bottom: 1px solid #F6F6F6;
	}

	.select-list {
		width: 120upx;
		height: 40upx;
		text-align: center;
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-right: 30upx;
		border-bottom: 1px solid #FFFFFF;
	}

	.select-list-cont {
		padding-left: 67upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 40px;
	}

	.selected {
		border-bottom: 1px solid #F0AD4E;
		color: rgba(255, 133, 0, 1);
	}
</style>
