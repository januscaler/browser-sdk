import { JanuScaler } from '@januscaler/browser-sdk';
import { Ref } from 'vue';

export class VideoCallManager {
  private client: any;
  private videoCallHandle: any;
  private localVideoElement: Ref<HTMLVideoElement | null>;
  private remoteVideoElement: Ref<HTMLVideoElement | null>;
  private remoteAudioElement: Ref<HTMLAudioElement | null>;

  constructor({
    token,
    localVideoElement,
    remoteVideoElement,
    remoteAudioElement,
  }: {
    token: string;
    localVideoElement: Ref<HTMLVideoElement | null>;
    remoteVideoElement: Ref<HTMLVideoElement | null>;
    remoteAudioElement: Ref<HTMLAudioElement | null>;
  }) {
    this.client = new JanuScaler({ token });
    this.localVideoElement = localVideoElement;
    this.remoteVideoElement = remoteVideoElement;
    this.remoteAudioElement = remoteAudioElement;
  }

  async init() {
    await this.client.init();
    this.videoCallHandle = await this.client.videoCall.createServiceHandle();
    console.log('VideoCallManager initialized');
  }

  async register(username: string) {
    if (!this.videoCallHandle) await this.init();
    await this.videoCallHandle.register(username);
    console.log(`Registered as ${username}`);
  }

  async call(username: string) {
    if (!this.videoCallHandle) throw new Error('Service handle not initialized');

    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

    // Bind local video stream
    if (this.localVideoElement.value) {
      this.localVideoElement.value.srcObject = mediaStream;
    }

    mediaStream.getTracks().forEach((track) => {
      this.videoCallHandle.addTrack(track);
    });

    const offer = await this.videoCallHandle.createOffer();
    await this.videoCallHandle.setLocalDescription(offer);
    await this.videoCallHandle.call(username, offer);

    this.videoCallHandle.onTrack = (track:any) => {
      if (track.kind === 'video' && this.remoteVideoElement.value) {
        this.remoteVideoElement.value.srcObject = track.streams[0];
      }
      if (track.kind === 'audio' && this.remoteAudioElement.value) {
        this.remoteAudioElement.value.srcObject = track.streams[0];
      }
    };
  }
}
