import { VideoRoomServiceHandle } from "./handle";

export class VideoRoomService {

    async createServiceHandle(): Promise<VideoRoomServiceHandle> {
        return new VideoRoomServiceHandle()
    }

}