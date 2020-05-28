const webUrl = "http://student.lgdhh.cf.:8080/";    //改成你们自己的公共接口变量
// const webUrl = "http://192.168.1.7:8080/";    //改成你们自己的公共接口变量
const c_mobile = /^1[3|4|5|6|7|8][0-9]{9}$/;  //判断手机号码正则
const user_id = null;//登录成功时存token
const pay_index = '';
const pay_id = '';
const pay_num = '';  
const formtype = '';




function requestAjax(url,data,type,success, fail){
	uni.request({
		url: webUrl + url,
		method:type, 
		data:data,
		dataType: 'json',
		header: {
		      "Content-Type": "application/x-www-form-urlencoded"
		    },
		success:function(res){
			success(res)
		},fail:function(res){
			fail()
		}
	})
}

function Ajax(url,type,success, fail){
	
	uni.request({
		url: webUrl + url,
		method:type,
		dataType: 'json',
		header: {
		      "Content-Type": "application/x-www-form-urlencoded"
		    },
		success:function(res){
			success(res)
		},fail:function(res){
			fail(res)
		}
	})
}

function request(url,data,type,id,success, fail){
	// console.log(id)
	uni.request({
		url: webUrl + url,
		data:data,
		method:type,
		dataType: 'json',
		header: {
		      "Content-Type": "application/x-www-form-urlencoded",
			  'token':id
		    },
		success:function(res){
			success(res)
		},fail:function(res){
			fail(res)
		}
	})
}


export default{  
    webUrl,  
    c_mobile,
	requestAjax,
	Ajax,
	request,
	pay_index,
	pay_id,
	pay_num,
	formtype
}

