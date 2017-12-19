/*
* @Author: 15032063277
* @Date:   2017-08-01 13:43:13
* @Last Modified by:   15032063277
* @Last Modified time: 2017-08-01 13:57:57
*/

'use strict';
(function(){
	var publicContent = {
		init:function(){
			this.html();
			this.js();
			this.css();
		},
		html:function(){
			document.write(
				'<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">' +
				'<meta name="format-detection" content="telephone=no" />' +
				'<meta name="apple-mobile-web-app-capable" content="yes" />' 
			);
		},
		js:function(){
			document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+'px';
			//无论手机屏幕怎么变，页面的视图都随着变化
			window.addEventListener("resize",function(){
			document.documentElement.style.fontSize=document.documentElement.clientWidth/7.5+'px';
			});			
			document.write(
				'<script type="text/javascript" src="js/jquery-1.11.0.js"></script>'
			);

		},
		css:function(){
			document.write(
					'<link rel="stylesheet" type="text/css" href="css/common.css">'
			);			
		}
	};
	publicContent.init();
})();