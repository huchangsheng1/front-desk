<template>
    <div class="bottom_bar">
       <div class="footer">
			<div class="alt">
				<div class="foot">
					<p>关于我们</p>
					<a >企业简介</a>
					<a>企业文化</a>
					<a>组织机构</a>
					<a>发展历程</a>
					<a>企业荣誉</a>
					<a>诚聘英才</a>
					<a>联系我们</a>
 
				</div>
				<div class="foot">
					<p>新闻中心</p>
					<a>公司新闻</a>
					<a>行业新闻</a>
				</div>
				<div class="foot">
					<p>产品及解决方案</p>
					<a>产品系列</a>
					<a>解决方案</a>
				</div>
				<div class="foot">
					<p>研发与创新</p>
					<a>核心技术</a>
					<a>技术创新</a>
				</div>
				<div class="foot">
					<p>经典案例</p>
					<a>智慧城市</a>
					<a>智慧高速</a>
					<a>智慧家居</a>
					<a>智慧网络</a>
				</div>
				<div class="foot">
					<p>服务支持</p>
					<a>技术支持</a>
					<a>服务网络</a>
					<a>资料下载</a>
					<a>公司理念</a>
				</div>
				<div class="foot">
					<p>关注我们</p>
					<img src="http://placehold.it/82x82" />
				</div>
			</div>
			<div style="border-top:1px #1F1F1F solid;">
				<p class="alt" style="color:#999; line-height:0;">@ 版权所有：HCWL    
					<span style="float: left;">技术支持：<a a target="_blank" style="color:#999;">HCWL</a></span>
					
					<span style="float:right;">地市：郑州市轩辕区摩天大厦大厦99楼</span>
				</p>
			</div>
		</div>
    </div>

</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

        .bottom_bar {
            width: 100%;
			padding-top: 50px;
			margin-top: 50px;
			background: #2b2e33;
            div {
				font-size: 12px;
			}
			
			span {
				font-size: 12px;
			}
            .footer {
                width: 100%;
				background: #2b2e33;
                text-align: center;
                .alt {
                    overflow: hidden;
                    padding: 20px 0;
                    width: 1200px;
                    margin: 0 auto;
                     .foot {
                        width: 138px;
                        float: left;
                            p {
                                color: #FFF;
                                line-height: 28px;
                            }
                            a {
                                color: #999;
                                display: block;
                                line-height: 24px;
                            }
                            a:hover {
                                color: #CCC;
                            }
                            img {
                                padding-top: 20px;
                            }
                    }
			    }
			}

        }
    
			
			
		    
			
			
			
	
			
			
    
</style>