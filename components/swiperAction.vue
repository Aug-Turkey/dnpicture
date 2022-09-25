<template>
	<view>
		<view @touchstart="handleTouchstart" @touchend="handleTouchend"> <slot></slot> </view>
	</view>
</template>

<script>
export default {
	name: 'swiperAction',
	data() {
		return {
			// 按下时间
			startTime: 0,
			// 按下坐标
			startX: 0,
			startY: 0,
		}
	},
	methods: {
		handleTouchstart(e) {
			// 按下开始时间
			this.startTime = Date.now()
			// 按下的坐标
			this.startX = e.changedTouches[0].clientX
			this.startY = e.changedTouches[0].clientY
		},
		handleTouchend(e) {
			// 手指抬起时间
			const endTime = Date.now()
			// 抬起坐标
			const endX = e.changedTouches[0].clientX
			const endY = e.changedTouches[0].clientY

			// 判断按下时长
			if (endTime - this.startTime > 2000) {
				return
			}

			// 滑动方向
			let direction = ''
			if (Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY) < 10) {
				direction = endX - this.startX > 0 ? 'right' : 'left'
			} else {
				return
			}
			this.$emit('swiperAction', { direction })
		},
	},
}
</script>

<style lang="scss"></style>
