import { JanuScalerVideoCallPlugin } from "@januscaler/core-januscaler-js";
import { EventEmitter } from "../../utils/eventEmitter";
import _ from "lodash";

export class VideoCallServiceHandle {
   protected pc: RTCPeerConnection = new RTCPeerConnection()
   constructor(private handle: JanuScalerVideoCallPlugin) {
      this.events.once('init', async () => {
         await this.init()
      })
   }

   protected async init() {
      this.handle.onAccepted.subscribe(async (data) => {
         await this.pc.setRemoteDescription(data.jsep)
         this.events.emit('accepted', _.omit(data, 'event'))
      })
      this.handle.onCalling.subscribe((data) => {
         this.events.emit('calling', undefined)
      })
      this.handle.onRegistered.subscribe((data) => {
         this.events.emit('registered', _.omit(data, 'event'))
      })
      this.handle.onIncomingCall.subscribe((data) => {
         this.events.emit('incomingcall', _.omit(data, 'event'))
      })
      this.handle.onHangup.subscribe((data) => {
         this.events.emit('hangup', _.omit(data, 'event'))
      })
      this.events.emit('initialized', {})
   }


   events: EventEmitter<{
      init: any
      calling: undefined
      initialized: any,
      hangup: { username: string, reason: string },
      accepted: { jsep: RTCSessionDescriptionInit, username: string }
      registered: { username: string },
      incomingcall: { username: string }
   }> = new EventEmitter();

   async register(userName: string): Promise<any> {
      return this.handle.register(userName)
   }

   async call(userName: string): Promise<any> {
      const offer = await this.pc.createOffer()
      await this.pc.setLocalDescription(offer);
      return this.handle.call(userName, offer)
   }
}