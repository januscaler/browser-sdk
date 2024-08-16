import { VideoCallService,VideoRoomService, StreamingService} from './services/index'
export class JanuScaler {

    private videoCallService:VideoCallService
    private videoRoomService:VideoRoomService
    private streamingService:StreamingService

    public get videoCall(){
        return this.videoCallService;
    }

    public get videoRoom(){
        return this.videoRoomService;
    }
    public get streaming(){
        return this.streamingService;
    }

    async init(options: any): Promise<void> { 
        this.videoCallService=new VideoCallService();
    }

}