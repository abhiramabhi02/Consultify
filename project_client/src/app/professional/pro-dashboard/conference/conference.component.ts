import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AgoraServicesService } from 'src/app/agora/agora-services.service';
import AgoraRTC, { IAgoraRTCRemoteUser, CameraVideoTrackInitConfig } from "agora-rtc-sdk-ng"
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../professional-service/services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent  {

  // @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;

  // constructor(private agoraService: AgoraServicesService) {}

  // async joinChannel() {
  //   const channelName = 'Consultify_Appointment';
  //   const uid = '9ds3ffdsrg45';

  //   try {

  //     console.log('join channel');
      
  //     const agoraToken = await this.agoraService.getAgoraToken(channelName, uid);
  //     // console.log(agoraToken, 'token in agora conference ln 21', channelName, uid, this.videoContainer, 'req,res');
      
  //     this.agoraService.initializeAgora(agoraToken, channelName, uid, this.videoContainer);
  //   } catch (error) {
  //     console.log('error joining channel', error);
  //   }
  // }

  // leaveChannel() {
  //   this.agoraService.leaveChannel();
  //   this.clearVideoContainer();
  // }

  // private clearVideoContainer() {
  //   const videoContainer = this.videoContainer.nativeElement;
  //   while (videoContainer.firstChild) {
  //     videoContainer.removeChild(videoContainer.firstChild);
  //   }
  // }

  agoraEngine: any;
  localAudioTrack: any;
  localVideoTrack: any;
  remoteAudioTrack: any;
  remoteVideoTrack: any;
  remoteUid: any;
  inCall: boolean = false;
  appointmentId: any 
  appointmentData:any
  agoraToken: any

  // @ViewChild('localVideoContainer') localVideoContainer: ElementRef | undefined;
  // @ViewChild('remoteVideoContainer') remoteVideoContainer: ElementRef | undefined;

  constructor(private routes:ActivatedRoute,
     private service:ServicesService,
     private httpclient:HttpClient){}

  ngOnInit() {
    this.getId()
    this.getAppointmentData()
    this.initailise()
  }

  getId(){
     this.routes.params.subscribe((param)=>{
     this.appointmentId = param['id']
     console.log(this.appointmentId, 'id');
     
    })
  }

  getAppointmentData(){
    let data = {
      id:this.appointmentId
    }
    this.service.conferenceAppointment(data).subscribe((response:any)=>{
      console.log(response);
      if(response.success){
        this.appointmentData = response.appointment
      }
      
    })
  }  

  initailise(){
    this.agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    this.agoraEngine.on("user-published", async (user: IAgoraRTCRemoteUser, mediaType: string) => {
      await this.agoraEngine.subscribe(user, mediaType);
      if (mediaType === "video") {
        this.remoteVideoTrack = user.videoTrack;
        this.remoteAudioTrack = user.audioTrack;
        this.remoteUid = user.uid;
        this.remoteVideoTrack.play(document.getElementById('remoteVideoContainer'));
      }
      if (mediaType === "audio") {
        this.remoteAudioTrack = user.audioTrack;
        this.remoteAudioTrack.play();
      }
    });
    this.agoraEngine.on("user-unpublished", (user: IAgoraRTCRemoteUser) => {
      console.log(user.uid + " has left the channel");
      if (user.uid === this.remoteUid) {
        this.remoteVideoTrack?.stop();
        this.remoteAudioTrack?.stop();
      }
    });
  }

  async getAgoraToken(channelName: string, uid: string) {
    try {
      const url = `http://localhost:3000/users/get_agora_token?channelName=${channelName}&uid=${uid}`;
      const response = await this.httpclient.get<any>(url).toPromise();
      console.log(response.token, 'token gen');
      this.agoraToken = response.token
      // return response.token;
    } catch (error) {
      console.log('error getting agora token', error);
      throw error;
    }
  }

  async joinChannel() {

    // Replace with your Agora App ID
    const appId = '585a9e0e414341208837f86cbc2b2e3a';
    // Replace with the channel name
    const channel = `Consultify_${this.appointmentData._id}`;
    // Replace with your temporary token
    
    // Replace with the user ID
    const uid = '0';

    await this.getAgoraToken(channel, uid)

    const token = this.agoraToken;

    await this.agoraEngine.join(appId, channel, token, uid);
    this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    // Set the desired constraints for the local video track (1280x720 resolution)
    const videoConstraints: CameraVideoTrackInitConfig = {
      encoderConfig: '480p_4',
      facingMode: 'user',
    };

    this.localVideoTrack = await AgoraRTC.createCameraVideoTrack(videoConstraints);

    this.localVideoTrack.play(document.getElementById('localVideoContainer'));
    await this.agoraEngine.publish([this.localAudioTrack, this.localVideoTrack]);
    console.log("Publish success!");
    this.inCall = true;
  }

  async leaveChannel() {
    if (this.localAudioTrack) {
      this.localAudioTrack.close();
      this.localAudioTrack = null;
    }
    if (this.localVideoTrack) {
      this.localVideoTrack.close();
      this.localVideoTrack = null;
    }
    if (this.remoteVideoTrack) {
      this.remoteVideoTrack.stop();
      this.remoteVideoTrack = null;
    }
    if (this.remoteAudioTrack) {
      this.remoteAudioTrack.stop();
      this.remoteAudioTrack = null;
    }
    await this.agoraEngine.leave();
    console.log("You left the channel");
    this.inCall = false;
  }
  
}