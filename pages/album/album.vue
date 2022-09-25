<template>
	<view>
		<!-- 专辑背景 -->
		<view class="album_bg">
			<image :src="album.cover" mode="widthFix"></image>
			<view class="album_info">
				<view class="album_name">{{ album.name }}</view> <view class="album_btn">关注专辑</view>
			</view>
		</view>
		<!-- 专辑作者 -->
		<view class="album_author">
			<view class="album_author_info">
				<image :src="album.user.avatar" mode="widthFix"></image>
				<view class="author_name">{{ album.user.name }}</view>
			</view>
			<view class="album_author_desc">
				<text>{{ album.desc }}</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="album_list">
			<view class="album_item" v-for="(item, index) in wallpaper" :key="index">
				<go-detail :list="wallpaper" :index="index">
					<image :src="item.thumb + item.rule.replace('$<Height>', 360)" mode="aspectFill"></image>
				</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
import goDetail from '@/components/goDetail.vue'
export default {
	components: {
		goDetail,
	},
	data() {
		return {
			params: {
				limit: 30,
				order: 'new',
				skip: 0,
				// 1 返回值中有 album对象 表示第一次请求数据
				// 0 返回值只有 wallpaper 不是第一次请求数据
				first: 1,
			},
			id: -1,
			album: {},
			wallpaper: [],
			hasMore: true,
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getList()
	},
	methods: {
		getList() {
			this.request({
				url: `http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
				data: this.params,
			}).then((result) => {
				if (Object.keys(this.album).length === 0) {
					this.album = result.res.album
				}
				if (result.res.wallpaper.length === 0) {
					this.hasMore = false
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none',
					})
					return
				}
				this.wallpaper = [...this.wallpaper, ...result.res.wallpaper]
			})
		},
	},
	// 上拉加载
	onReachBottom() {
		if (this.hasMore) {
			this.params.first = 0
			this.params.skip += this.params.limit
			this.getList()
		} else {
			uni.showToast({
				title: '没有更多数据了',
				icon: 'none',
			})
		}
	},
}
</script>

<style lang="scss">
.album_bg {
	position: relative;
	image {
	}
	.album_info {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		align-items: center;
		color: #fff;
		padding: 0 15rpx;
		.album_name {
			font-style: 40rpx;
		}
		.album_btn {
			background-color: #d52a7e;
			width: 152rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
		}
	}
}

.album_author {
	padding: 10rpx;
	.album_author_info {
		padding: 10rpx 0;
		display: flex;
		image {
			width: 50rpx;
		}
		.author_name {
			color: #000;
			margin-left: 15rpx;
		}
	}
	.album_author_desc {
	}
}

.album_list {
	display: flex;
	flex-wrap: wrap;
	.album_item {
		width: 33.33%;
		border: 3rpx solid #fff;
		image {
			height: 160rpx;
		}
	}
}
</style>
