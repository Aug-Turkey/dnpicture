<template>
	<view @click="handleClick"> <slot></slot> </view>
</template>

<script>
export default {
	name: 'goDetail',
	data() {
		return {
			
		}
	},
	props: {
		list: Array,
		index: Number,
	},
	methods: {
		handleClick() {
			// 缓存为全局数据
			getApp().globalData.imgList = this.list
			getApp().globalData.imgIndex = this.index
			// 点击跳转页面
			uni.navigateTo({
				url: '/pages/imgDetail/imgDetail'
			})
		},
	}
}
</script>

<style lang="scss"></style>
