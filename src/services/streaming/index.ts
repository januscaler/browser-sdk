import { StreamingServiceHandle } from "./handle";

export class StreamingService {

    async createServiceHandle(): Promise<StreamingServiceHandle> {
        return new StreamingServiceHandle()
    }

}