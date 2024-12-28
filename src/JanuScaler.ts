import { VideoCallService, VideoRoomService, StreamingService } from './services/index'
import { JanuScalerJs, JanuScalerJsSession, WebSocketClient } from '@januscaler/core-januscaler-js'
export interface JanuScalerOptions {
    token: string
}

export class JanuScaler {

    constructor(private configuration: JanuScalerOptions) {
    }

    private januScaler: JanuScalerJs
    private session: JanuScalerJsSession

    private videoCallService: VideoCallService
    private videoRoomService: VideoRoomService
    private streamingService: StreamingService



    public get videoCall() {
        return this.videoCallService;
    }

    public get videoRoom() {
        return this.videoRoomService;
    }
    public get streaming() {
        return this.streamingService;
    }

    async init(): Promise<void> {
        this.januScaler = new JanuScalerJs(new WebSocketClient('ws://127.0.0.1:8188', {
            protocols: 'januscaler-protocol',
            token: this.configuration.token
        }))
        this.session = await this.januScaler.createSession()
        this.videoCallService = new VideoCallService(this.session);
    }

}