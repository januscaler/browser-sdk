import { JanuScalerJsSession, JanuScalerVideoCallPlugin } from "@januscaler/core-januscaler-js";
import { VideoCallServiceHandle } from "./handle";

export class VideoCallService {
    private handle: JanuScalerVideoCallPlugin
    constructor(protected session: JanuScalerJsSession) { }

    async createServiceHandle(): Promise<VideoCallServiceHandle> {
        this.handle = await this.session.attach(JanuScalerVideoCallPlugin)
        const serviceHandle = new VideoCallServiceHandle(this.handle)
        return new Promise((resolve, reject) => {
            serviceHandle.events.emit('init', {})
            serviceHandle.events.once('initialized',()=>{
                resolve(serviceHandle)
            })
        })
    }

}