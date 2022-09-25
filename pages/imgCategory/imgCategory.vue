<template>
	<view>
		<view class="category_tab">
			<view class="category_tab_title">
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
			<scroll-view
				@scrolltolower="handleScrolltolower"
				enable-flex
				scroll-y
				class="category_tab_content"
			>
				<view class="cate_item" v-for="(item, index) in vertical" :key="item.id">
					<go-detail :list="vertical" :index="index">
						<image :src="item.thumb" mode="aspectFill"></image>
					</go-detail>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { uniBadge } from '@dcloudio/uni-ui'
import { goDetail } from '@/components/goDetail'
export default {
	components: {
		goDetail,
	},
	data() {
		return {
			items: [{ title: '最新', order: 'new' }, { title: '热门', order: 'hot' }],
			current: 0,
			params: {
				limit: 30,
				skip: 0,
				order: 'new',
			},
			id: 0,
			// 获取到的图片数据
			vertical: [],
			// 是否有下一页数据
			hasMore: true,
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getList()
	},
	methods: {
		onClickItem(e) {
			if (this.current != e.currentIndex) {
				this.current = e.currentIndex
			} else {
				return
			}
			// 根据被点击的标题切换order
			this.params.order = this.items[e.currentIndex].order
			// 重置数据
			this.params.skip = 0
			this.vertical = []
			this.getList()
		},
		async getList() {
			const result = await this.request({
				url: `http://service.picasso.adesk.com/v1/vertical/category/${this.id}/vertical`,
				data: this.params,
			})
			// 判断是否还有数据
			if (result.res.vertical.length === 0) {
				this.hasMore = false
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none',
				})
				return
			}
			this.vertical = [...this.vertical, ...result.res.vertical]
		},
		// 触底加载下一页数据
		handleScrolltolower() {
			if (this.hasMore) {
				this.params.skip += this.params.limit
				this.getList()
			} else {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none',
				})
			}
		},
	},
}
</script>

<style lang="scss">
.category_tab {
	.category_tab_title {
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
	.category_tab_content {
		display: flex;
		flex-wrap: wrap;
		height: calc(100vh - 36px);
		.cate_item {
			width: 33.33%;
			border: 5rpx solid #fff;
			image {
			}
		}
	}
}
</style>
