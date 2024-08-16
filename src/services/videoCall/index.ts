import { VideoCallServiceHandle } from "./handle";

export class VideoCallService {

    async createServiceHandle(): Promise<VideoCallServiceHandle> {
        return new VideoCallServiceHandle()
    }

}