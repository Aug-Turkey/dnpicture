<template>
	<scroll-view
		@scrolltolower="handleToLower"
		class="recommend_view"
		scroll-y
		v-if="recommends.length > 0"
	>
		<view class="recommend_wrap">
			<!-- 推荐 开始 -->
			<navigator
				class="recommend_item"
				v-for="item in recommends"
				:key="item.id"
				:url="`/pages/album/album?id=${item.target}`"
			>
				<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>
		<view>
			<!-- 月份 -->
			<view class="monthes_wrap">
				<view class="monthes_title">
					<view class="monthes_title_info">
						<view class="monthes_info">
							<text> {{ monthes.DD }} / </text> {{ monthes.MM }} 月
						</view>
						<view class="monthes_text">{{ monthes.title }}</view>
					</view>
					<view class="monthes_title_more">更多 ></view>
				</view>
				<view class="monthes_content">
					<view class="monthes_item" v-for="(item, index) in monthes.items" :key="item.id">
						<go-detail :list="monthes.items" :index="index">
							<image
								:src="item.thumb + item.rule.replace('$<Height>', 360)"
								mode="aspectFill"
							></image>
						</go-detail>
					</view>
				</view>
			</view>

			<!-- 热门 -->
			<view class="hots_wrap">
				<view class="hots_title"> <text class="hot_text">热门</text> </view>
				<view class="hots_content">
					<view class="hot_item" v-for="(item, index) in hots" :key="item.id">
						<go-detail :list="hots" :index="index">
							<image v-if="item.thumb" :src="item.thumb" mode="widthFix"></image>
						</go-detail>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import moment from 'moment'
import { goDetail } from '@/components/goDetail.vue'
export default {
	components: {
		goDetail,
	},
	data() {
		return {
			// 推荐列表
			recommends: [],
			// 月份
			monthes: {},
			// 热门
			hots: [],
			params: {
				// 获取几条数据
				limit: 30,
				// 关键字
				order: 'hot',
				// 跳过几条
				skip: 0,
			},
			// 是否还有下一页
			hasMore: true
		}
	},
	created() {
		this.getList()
		},
	mounted() {
		// 修改页面的标题
		uni.setNavigationBarTitle({
			title: '推荐',
		})
	},
	methods: {
		// 获取接口数据
		getList() {
			this.request({
				url: 'http://service.picasso.adesk.com/v3/homepage/vertical',
				data: this.params,
			}).then((result) => {
				// 判断还有么有下一页
				if (result.res.vertical.length === 0) {
					this.hasMore = false
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none',
					})
					return
				}
				// 第一次发请求
				if (this.recommends.length === 0) {
					// 推荐模块
					this.recommends = result.res.homepage[1].items
					// 月份模块
					this.monthes = result.res.homepage[2]
					// 时间戳
					this.monthes.MM = moment(this.monthes.stime).format('MM')
					this.monthes.DD = moment(this.monthes.stime).format('DD')
				}
				// 获取热门数据列表
				// 数组拼接 es6
				this.hots = [...this.hots, ...result.res.vertical]
			})
		},
		// 滚动条触底事件
		handleToLower() {
			// 有下一页
			if (this.hasMore) {
				this.params.skip += this.params.limit
				this.getList()
			} else {
				// 没有下一页
				uni.showToast({
					title: '没有数据了',
					icon: 'none',
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.recommend_view {
	// 屏幕的高度 - 标题高度
	height: calc(100vh - 36px);
}

.recommend_wrap {
	display: flex;
	flex-wrap: wrap;
	.recommend_item {
		width: 50%;
		border: 5rpx solid #fff;
	}
}

.monthes_wrap {
	.monthes_title {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		.monthes_title_info {
			color: #d52a7e;
			font-size: 30rpx;
			font-weight: 600;
			display: flex;
			.monthes_info {
				text {
					font-size: 36rpx;
				}
			}
			.monthes_text {
				font-size: 34rpx;
				color: #666;
				margin-left: 30rpx;
			}
		}
		.monthes_title_more {
			font-size: 24rpx;
			color: #d52a7e;
		}
	}
	.monthes_content {
		display: flex;
		flex-wrap: wrap;
		.monthes_item {
			width: 33.33%;
			border: 5rpx solid #fff;
		}
	}
}

.hots_wrap {
	.hots_title {
		padding: 20rpx;
		.hot_text {
			border-left: 20rpx solid #d52a7e;
			padding-left: 20rpx;
			font-size: 24rpx;
			font-weight: 600;
		}
	}
	.hots_content {
		display: flex;
		flex-wrap: wrap;
		.hot_item {
			width: 33.33%;
			border: 5rpx solid #fff;
			image {
			}
		}
	}
}
</style>
