<template>
	<view>
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="user_icon" v-if="imgDetail.user">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user_desc">
				<view class="user_name" v-if="imgDetail.user">{{ imgDetail.user.name }}</view>
				<view class="user_time">{{ imgDetail.cnTime }}</view>
			</view>
		</view>
		<!-- 高清大图 -->
		<view class="high_img">
			<swiper @swiperAction="handleSwiperAction" style="height: 100%;">
				<image :src="imgDetail.thumb" mode="widthFix"></image>
			</swiper>
		</view>
		<!-- 点赞 -->
		<view class="user_rank">
			<view class="rank">
				<text class="iconfont icondianzan">{{ imgDetail.rank }}</text>
			</view>
			<view class="user_collect"> <text class="iconfont iconshoucang">收藏</text> </view>
		</view>
		<!-- 专辑 -->
		<view class="album_wrap" v-if="album.length">
			<view class="album_title">相关</view>
			<view class="album_list">
				<veiw class="album_item" v-for="(item, index) in album" :key="index">
					<view class="album_cover"> <image :src="item.cover" mode="aspectFill"></image> </view>
					<view class="album_info">
						<view class="album_info_text">专辑</view>
						<view class="album_name">{{ item.name }}</view>
						<text class="iconfont iconiconfontjiantou4"></text>
					</view>
				</veiw>
			</view>
		</view>
		<!-- 热评 -->
		<view class="comment hot" v-if="hot.length">
			<view class="comment_title">
				<text class="iconfont iconhot1"></text> <text class="comment_text">最热评论</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="(item, index) in hot" :key="index">
					<view class="comment_user">
						<view class="user_icon"> <image :src="item.user.avatar" mode="widthFix"></image> </view>
						<view class="user_name">
							<view class="user_nickname">{{ item.user.name }}</view>
							<view class="user_time">{{ item.cnTime }}</view>
						</view>
						<view class="user_badge">
							<image
								:src="item2.icon"
								mode=""
								v-for="(item2, index) in item.user.title"
								:key="index"
							></image>
						</view>
					</view>
					<view class="comment_desc">
						<view class="comment_content">{{ item.content }}</view>
						<view class="comment_like">
							<text class="iconfont icondianzan">{{ item.size }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 最新评论 -->
		<view class="comment new" v-if="comment.length">
			<view class="comment_title">
				<text class="iconfont iconpinglun"></text> <text class="comment_text">最新评论</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="item in comment" :key="item.id">
					<view class="comment_user">
						<view class="user_icon" style="width:88rpx;">
							<image :src="item.user.avatar" mode="widthFix"></image>
						</view>
						<view class="user_name">
							<view class="user_nickname">{{ item.user.name }}</view>
							<view class="user_time">{{ item.cnTime }}</view>
						</view>
						<view class="user_badge">
							<image
								:src="item2.icon"
								mode=""
								v-for="item2 in item.user.title"
								:key="item2.id"
							></image>
						</view>
					</view>
					<view class="comment_desc">
						<view class="comment_content">{{ item.content }}</view>
						<view class="comment_like">
							<text class="iconfont icondianzan">{{ item.size }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下载图片 -->
		<view class="download">
			<view class="download_btn" @click="handleDownload">下载图片</view>
		</view>
	</view>
</template>

<script>
import swiper from '@/components/swiperAction.vue'
import moment from 'moment'
// 设置语言为中文
moment.locale('zh-cn')
export default {
	components: {
		swiper,
	},
	data() {
		return {
			// 图标信息对象
			imgDetail: {},
			// 专辑数据
			album: [],
			// 热评
			hot: [],
			// 最新评论
			comment: [],
			// 图片索引
			imgIndex: 0,
		}
	},
	onLoad() {
		const { imgIndex } = getApp().globalData
		this.imgIndex = imgIndex
		this.getData()
	},
	methods: {
		// 给当前页面赋值
		getData() {
			const { imgList } = getApp().globalData
			this.imgDetail = imgList[this.imgIndex]
			this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
			this.getComments(this.imgDetail.id)
		},
		getComments(id) {
			this.request({
				url: `http://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`,
			}).then((result) => {
				this.album = result.res.album
				// 时间修改成 xxx月前
				result.res.hot.forEach((v) => (v.cnTime = moment(v.atime * 1000).fromNow()))
				result.res.comment.forEach((v) => (v.cnTime = moment(v.atime * 1000).fromNow()))
				this.hot = result.res.hot
				this.comment = result.res.comment
			})
		},
		// 图片滑动事件
		handleSwiperAction(e) {
			const { imgList } = getApp().globalData
			// 左滑
			if (e.detail.__args__[0].direction === 'left' && this.imgIndex < imgList.length - 1) {
				this.imgIndex++
				this.getData()
				// 右滑
			} else if (e.detail.__args__[0].direction === 'right' && this.imgIndex > 0) {
				this.imgIndex--
				this.getData()
			} else {
				uni.showToast({
					title: '没有数据了',
					icon: 'none',
				})
			}
		},
		// 下载图片
		async handleDownload() {
			await uni.showLoading({
				title: '下载中',
			})
			// 将远程文件下载到小程序的内存中  tempFilePath
			const result = await uni.downloadFile({ url: this.imgDetail.img })
			const { tempFilePath } = result[1]
			// 将小程序内存中的临时文件下载到本地
			const result2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath })
			// 提示用户下载成功
			uni.hideLoading()
			await uni.showToast({
				title: '下载成功',
			})
		},
	},
}
</script>

<style lang="scss">
.user_info {
	display: flex;
	padding: 20rpx;
	.user_icon {
		padding: 0 20rpx;
		image {
			width: 88rpx;
			border-radius: 50%;
		}
	}
	.user_desc {
		.user_name {
			color: #000;
			font-weight: 600;
		}
		.user_time {
			color: #ccc;
			font-size: 20rpx;
			padding: 10rpx 0;
		}
	}
}

.user_rank {
	display: flex;
	height: 80rpx;
	border-bottom: 5rpx solid #eee;
	.rank {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.iconfont {
		}
	}
	.user_collect {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.iconfont {
		}
	}
}

.high_img {
	image {
		border-bottom: 1rpx solid #eee;
	}
}

.album_wrap {
	padding: 20rpx;
	.album_title {
		padding: 10rpx 0;
	}
	.album_list {
		.album_item {
			display: flex;
			padding: 10rpx 0;
			border-bottom: 10rpx solid #eee;
			.album_cover {
				flex: 1;
				image {
					width: 180rpx;
					height: 180rpx;
				}
			}
			.album_info {
				flex: 3;
				padding-left: 20rpx;
				position: relative;
				.album_info_text {
					width: 100rpx;
					height: 50rpx;
					background-color: #d52a7e;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.album_name {
					padding: 10rpx 0;
					color: #888;
				}
				.iconfont {
					font-size: 40rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 10%;
					color: #000;
				}
			}
		}
	}
}

.comment {
	.comment_title {
		padding: 15rpx;
		.iconfont {
			color: red;
			font-size: 40rpx;
		}
		.comment_text {
			font-weight: 600;
			font-style: 28rpx;
			color: #666;
			margin-left: 10rpx;
		}
	}
	.comment_list {
		.comment_item {
			border-bottom: 15rpx solid #eee;
			.comment_user {
				display: flex;
				padding: 20rpx 0;
				.user_cion {
					width: 15%;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 90%;
					}
				}
				.user_name {
					flex: 1;
					.user_nickname {
						color: #777;
					}
					.user_time {
						color: #ccc;
						font-size: 24rpx;
						padding: 5rpx;
					}
				}
				.user_badge {
					image {
						width: 40rpx;
						height: 40rpx;
						display: inline-block;
					}
				}
			}
			.comment_desc {
				display: flex;
				padding: 30rpx 0;
				.comment_content {
					flex: 1;
					padding-left: 15%;
					color: #000;
				}
				.comment_like {
					text-align: right;
					.icondianzan {
					}
				}
			}
		}
	}
}

.new {
	.iconpinglun {
		color: aqua !important;
	}
}

.download {
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	.download_btn {
		width: 90%;
		height: 80%;
		background-color: #d52a7e;
		color: #fff;
		font-size: 50rpx;
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
