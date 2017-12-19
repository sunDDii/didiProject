(function(){
	//初始化
	var a = 3;
	var siteArr = ['中国紫檀博物馆','北京大观园','中国人民抗日战争博物馆','中国传媒博物馆','北京古北水镇','富国海底世界','圆明园遗址公园']
	var voiceArr = ['http://audio.xmcdn.com/group24/M0A/CA/C2/wKgJMFhTqxSQYejWAAZWgmSU1l0359.m4a',
					'https://yjly.oss-cn-beijing.aliyuncs.com/yjly/power/144964434931643.mp3',
					'https://yjly.oss-cn-beijing.aliyuncs.com/yjly/power/144861879944090.MP3',
					'https://yjly.oss-cn-beijing.aliyuncs.com/msYjly/mp3/148705172704148.mp3',
					'https://yjly.oss-cn-beijing.aliyuncs.com/yjly/voice/144064760541389.mp3',
					'https://yjly.oss-cn-beijing.aliyuncs.com/yjly/voice/143865417023958.mp3',
					'https://yjly.oss-cn-beijing.aliyuncs.com/yjly/1453969823.mp3'
					]
	var voivePlay = {
		init:function(){
			this._requestData();
			this._listsClick();
			this._geolocation();
		},
		_requestData:function(){
			var mesLen = 7;
			for(var i= 0;i<mesLen;i++){
				if(i===a){
					$('#scenic-area').append(
						'<div id="" class="area-list" index="'+i+'">' +
							'<span class="play-btn fl" flag="false"><em class="rotate"></em><i></i></span>' +
							'<p class="fl">'+siteArr[i]+'</p>' +
							'<span class="distance fr"><strong class="fr active"><b></b><b></b><b></b><b></b><b></b></strong><em class="fr">当前位置</em><i class="fr"></i></span>' +
							'<audio src="'+voiceArr[i]+'" id="audio"></audio>' +
						'</div>'					
					);						
					voivePlay._autoplay(i);
				}else{
					$('#scenic-area').append(
						'<div id="" class="area-list" index="'+i+'">' +
							'<span class="play-btn fl" flag=true><em class="active rotate"></em><i class="active"></i></span>' +
							'<p class="fl active">'+siteArr[i]+'</p>' +
							'<span class="distance fr active"><strong class="fr"><b></b><b></b><b></b><b></b><b></b></strong><em class="fr">距离您15米</em><i class="fr"></i></span>' +
							'<audio src="'+voiceArr[i]+'"></audio>' +
						'</div>'					
					);					
				}

			};
		},
		_autoplay:function(i){//播放当前景点
			var audio = document.getElementById("audio");
			var duration=0,currentTime=0,deg=0;
			document.addEventListener("WeixinJSBridgeReady", function () {
						audio.play();
			}, false);	
			audio.oncanplay = function(){
				var duration = audio.duration;//音频总时长	
				console.log(duration)
				voivePlay._rotateAnimation(audio,duration,i);	
			};				
		},
		_listsClick:function(){
			$('.play-btn').on('click',function(){
				var index = $(this).parent().attr('index')*1;
				var flag = $(this).attr('flag');
				var audio = document.getElementById("audio");
				if(flag=='false'){
					$(this).attr('flag','true');
					$(this).find('i,em').addClass('active');
					$(this).parent().find('.distance b').css({"animation-play-state":"paused"});;
					audio.pause();
				}else{
					$('.play-btn').attr('flag','true');
					$(this).attr('flag','false')
					$(this).parent().find('.distance b').css({"animation-play-state":"running"});;
					$('.play-btn').find('i,em').addClass('active');
					$('.play-btn').parent().siblings().find('p,.distance').addClass('active').find('strong').removeClass('active');
					$('.play-btn').parent().siblings().find('p,.distance').addClass('active').find('em').text('距离您15米');
//					$('.rotate').css({
//	                         'transform':'rotate('+0+'deg)',
//	                        '-ms-transform':'rotate('+0+'deg)',     /* IE 9 */
//	                        '-moz-transform':'rotate('+0+'deg)',   /* Firefox */
//	                        '-webkit-transform':'rotate('+0+'deg)',/* Safari 和 Chrome */
//	                        '-o-transform':'rotate('+0+'deg)'  /* Opera */					
//					});
					$('audio').not(this).each(function(){
						this.removeAttribute('id');
						this.pause();
					});
					$(this).find('i,em').removeClass('active');
					$(this).parent().find('p').removeClass('active');
					$(this).parent().find('.distance').removeClass('active');
					$(this).parent().find('strong').addClass('active').find('em').text('当前位置');
					$(this).parent().find('.distance').find('em').text('当前位置');				
					$(this).parent().find('audio').attr('id','audio');
					var audio = document.getElementById("audio");
					audio.play();								
					var duration = audio.duration;//音频总时长	
					console.log(duration)		
					voivePlay._rotateAnimation(audio,duration,index);					
				}
			
			});
		},
		_rotateAnimation:function(audio,duration,i){
				audio.addEventListener("timeupdate", function(){					
					currentTime = audio.currentTime;
					deg = parseInt(currentTime/duration*1080);
					$('.rotate').eq(i).css({
                         'transform':'rotate('+deg+'deg)',
                        '-ms-transform':'rotate('+deg+'deg)',     /* IE 9 */
                        '-moz-transform':'rotate('+deg+'deg)',   /* Firefox */
                        '-webkit-transform':'rotate('+deg+'deg)',/* Safari 和 Chrome */
                        '-o-transform':'rotate('+deg+'deg)'  /* Opera */  						
					})	
				});					
			$('#audio').on('ended',function(){
				$(this).parent().find('.distance b').css({"animation-play-state":"paused"});
				$(this).parent().find('.play-btn').find('em,i').addClass('active');
			});				
		},	
		_geolocation:function(){
			var geolocation = new qq.maps.Geolocation("D6NBZ-JIBKQ-6OL5A-GNSXW-EBCSH-Q5FUP", "realtimeLocation");
			 document.addEventListener("WeixinJSBridgeReady", function () {
				geolocation.watchPosition(showPosition)	
			}, false);				
	        function showPosition(position) {
	        	console.log(position.lat)
	        	$('#x').text(position.lat)
	        	$('#y').text(position.lng)
	        };			
		},
	};
	voivePlay.init();
})();
