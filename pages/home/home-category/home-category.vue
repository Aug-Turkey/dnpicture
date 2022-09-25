<template>
	<view class="home_category">
		<navigator class="cate_item" v-for="item in category" :key="item.id" :url="`/pages/imgCategory/imgCategory?id=${item.id}`">
			<image :src="item.cover" mode="aspectFill"></image>
			<view class="cate_name">{{ item.name }}</view>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			category: [],
		}
	},
	created() {
		this.getList()
	},
	mounted() {
		// 修改页面的标题
		uni.setNavigationBarTitle({
			title: '分类',
		})
	},
	methods: {
		// 获取数据
		async getList() {
			const result = await this.request({
				url: 'http://service.picasso.adesk.com/v1/vertical/category',
			})
			this.category = result.res.category
		},
	},
}
</script>

<style lang="scss">
.home_category {
	display: flex;
	flex-wrap: wrap;
	.cate_item {
		width: 33.33%;
		position: relative;
		border: 5rpx solid #fff;
		image {
			height: 240rpx;
		}
		.cate_name {
			position: absolute;
			width: 100%;
			height: 50rpx;
			left: 0;
			bottom: 0;
			color: #fff;
			background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
			font-size: 40rpx;
			align-items: center;
			padding-left: 20rpx;
		}
	}
}
</style>
