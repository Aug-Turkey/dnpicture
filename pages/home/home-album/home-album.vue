<template>
	<scroll-view class="album_scroll_view" scroll-y @scrolltolower="handlerToLower">
		<!-- 轮播图 -->
		<view class="album_swiper">
			<swiper :indicator-dots="true" :autoplay="true" circular>
				<swiper-item v-for="item in banner" :key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表 -->
		<view class="album_list">
			<navigator
				class="album_item"
				v-for="item in album"
				:key="item.id"
				:url="`/pages/album/album?id=${item.id}`"
			>
				<view class="album_img"> <image :src="item.cover" mode="aspectFill"></image> </view>
				<view class="album_info">
					<view class="album_name">{{ item.name }}</view>
					<view class="album_desc">{{ item.desc }}</view>
					<view class="album_btn"> <view class="album_attention">关注</view> </view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			params: {
				limit: 30,
				order: 'new',
				skip: 0,
			},
			// 轮播图数据
			banner: [],
			// 列表数据
			album: [],
			// 是否有下一页
			hasMore: true,
		}
	},
	created() {},
	mounted() {
		// 修改页面的标题
		uni.setNavigationBarTitle({
			title: '专辑',
		})
		this.getList()
	},
	methods: {
		// 获取接口数据
		getList() {
			this.request({
				url: 'http://service.picasso.adesk.com/v1/wallpaper/album',
				data: this.params,
			}).then((result) => {
				// 只在第一次发请求
				if (this.banner.length === 0) {
					this.banner = result.res.banner
				}
				// 如果没有下一页
				if (result.res.album.length === 0) {
					this.hasMore = false
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none',
					})
					return
				}
				this.album = [...this.album, ...result.res.album]
			})
		},
		// 上拉加载
		handlerToLower() {
			// 判断是否有下一页
			if (this.hasMore) {
				this.params.skip += this.params.limit
				this.getList()
			} else {
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
.album_scroll_view {
	height: calc(100vh - 36px);
}
.album_swiper {
	swiper {
		height: calc(750rpx / 2.3);
		image {
			height: 100%;
		}
	}
}

.album_list {
	padding: 10rpx;
	.album_item {
		padding: 10rpx 0;
		display: flex;
		border-bottom: 1rpx solid #ccc;
		.album_img {
			flex: 1;
			padding: 10rpx;
			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
		.album_info {
			flex: 2;
			padding: 0 10rpx;
			overflow: hidden;
			.album_name {
				font-size: 30rpx;
				color: #000;
				padding: 10rpx 0;
			}
			.album_desc {
				padding: 10rpx 0;
				font-size: 24rpx;

				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.album_btn {
				padding: 10rpx;
				display: flex;
				justify-content: flex-end;
				.album_attention {
					color: #d52a7e;
					border: 1rpx solid #d52a7e;
					padding: 10rpx;
				}
			}
		}
	}
}
</style>
