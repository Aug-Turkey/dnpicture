<template>
	<view>
		<view class="home_tab">
			<view class="home_tab_title">
				<view class="title_inner">
					<uni-segmented-control
						:current="current"
						:values="items.map((v) => v.title)"
						@clickItem="onClickItem"
						styleType="text"
						activeColor="#d4237a"
					></uni-segmented-control>
				</view>
			</view>
			<view class="home_tab_content">
				<view v-if="current === 0"><homeRecommend></homeRecommend></view>
				<view v-if="current === 1"><homeCategory></homeCategory></view>
				<view v-if="current === 2"><homeAlbum></homeAlbum></view>
			</view>
		</view>
	</view>
</template>

<script>
import { homeRecommend } from '@/pages/home/home-recommend/home-recommend.vue'
import { homeCategory } from '@/pages/home/home-category/home-category.vue'
import { homeAlbum } from '@/pages/home/home-album/home-album.vue'
import { uniBadge } from '@dcloudio/uni-ui'
export default {
	data() {
		return {
			items: [{ title: '推荐' }, { title: '分类' }, { title: '专辑' }],
			current: 0,
		}
	},
	methods: {
		onClickItem(e) {
			if (this.current != e.currentIndex) {
				this.current = e.currentIndex
			}
		},
	},
	components: {
		homeRecommend,
		homeCategory,
		homeAlbum,
	},
}
</script>

<style lang="scss">
.home_tab {
	.home_tab_title {
		position: relative;
		.title_inner {
			width: 60%;
			margin: 0 auto;
		}
		.iconsearch {
			position: absolute;
			top: 30%;
			transform: translate(-50%);
			right: 5%;
		}
	}
	.home_tab_content {
	}
}
</style>
