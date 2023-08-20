import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IRemoteVideoTrack,
} from 'agora-rtc-sdk-ng';;

@Injectable({
  providedIn: 'root',
})
export class AgoraServicesService {
  AgoraAppId: string = '585a9e0e414341208837f86cbc2b2e3a';
  private client: IAgoraRTCClient | null = null;
  localAudioTrack: IMicrophoneAudioTrack | null = null;
  localVideoTrack: ICameraVideoTrack | null = null;

  constructor(private httpclient: HttpClient) {
    AgoraRTC.setLogLevel(2);
  }

  // async joinChannel( channelName: string, uid: any) {
  //   try {
  //     //create agora client
  //     this.client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

  //     //create and join the channel
  //     await this.client.join(this.AgoraAppId, channelName, null, uid);

  //     //create local tracks
  //     this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  //     this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

  //     //publish local tracks to the channel
  //     await this.client.publish([this.localAudioTrack, this.localVideoTrack]);

  //     return {
  //       localAudioTrack: this.localAudioTrack,
  //       localVideoTrack: this.localVideoTrack,
  //     };
  //   } catch (error) {
  //     console.log('error joining the channel');
  //     throw error;
  //   }
  // }

  async getAgoraToken(channelName: string, uid: string) {
    try {
      const url = `http://localhost:3000/users/get_agora_token?channelName=${channelName}&uid=${uid}`;
      const response = await this.httpclient.get<any>(url).toPromise();
      console.log(response.token, 'token gen');
      
      return response.token;
    } catch (error) {
      console.log('error getting agora token', error);
      throw error;
    }
  }

  async initializeAgora(
    agoraToken: string,
    channelName: string,
    uid: string,
    videoContainer: ElementRef<HTMLDivElement>
  ) {
    try {
      // Create Agora client
      this.client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
      console.log(this.client, 'client w');
      

      // Set up event listeners for remote tracks
      this.client.on('user-published', async (user, mediaType) => {
        await this.client?.subscribe(user, mediaType);
        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack | undefined;
          if (remoteVideoTrack) {
            this.appendVideoTrack(remoteVideoTrack, videoContainer);
          }
        }
        console.log(this.client, 'client');
        
        // Handle other media types if needed
      });

      // Join the channel with the provided agoraToken and uid
      await this.client.join(this.AgoraAppId, channelName, agoraToken, uid);

      // Create and publish local tracks
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      await this.client.publish([this.localAudioTrack, this.localVideoTrack]);

      // Display the local video track in the specified container
      this.appendVideoTrack(this.localVideoTrack, videoContainer);
    } catch (error) {
      console.error('Error initializing Agora:', error);
      throw error;
    }
  }

  private appendVideoTrack(videoTrack: ICameraVideoTrack | IRemoteVideoTrack, videoContainer: ElementRef<HTMLDivElement>) {
    const videoElement = videoTrack.play(videoContainer.nativeElement);
  }

  
  async leaveChannel() {
    if (this.client) {
      // Unpublish and close the local tracks
      if (this.localAudioTrack) {
        this.localAudioTrack.close();
      }

      if (this.localVideoTrack) {
        this.localVideoTrack.close();
      }

      await this.client.leave();
    }
  }
}
