import { onUnmounted } from 'vue';

class AvatarService {
  private avatar: any = null;

  async init(containerId: string, appId: string, appSecret: string) {
    this.avatar = new window.XmovAvatar({
      containerId, // 容器DOM ID（如"#sdk-container"）
      appId,
      appSecret,
      gatewayServer: 'https://nebula-agent.xingyun3d.com/user/v1/ttsa/session',
      hardwareAcceleration: 'prefer-hardware', // 启用硬件加速
      onStateChange: (state: string) => console.log('状态变化:', state),
      onVoiceStateChange: (status: string) => {
        if (status === 'voice_start') console.log('数字人开始说话');
      }
    });

    // 加载3D模型资源（自动触发进度回调）
    await this.avatar.init({
      onDownloadProgress: (progress: number) => {
        console.log(`资源加载: ${progress}%`);
      }
    });
  }

  // 非流式说话（整段文本播报）
  speak(text: string) {
    this.avatar?.speak(text, true, true);
  }

  // 页面卸载时销毁实例（关键！避免内存泄漏）
  destroy() {
    this.avatar?.destroy();
    this.avatar = null;
  }
}

export const avatarService = new AvatarService();