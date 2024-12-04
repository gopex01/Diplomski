import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Hls from 'hls.js';
@Component({
  selector: 'app-camera-raca',
  templateUrl: './camera-raca.component.html',
  styleUrls: ['./camera-raca.component.css']
})
export class CameraRacaComponent implements AfterViewInit{

  @ViewChild('video1', { static: false }) video1!: ElementRef<HTMLVideoElement>;
  @ViewChild('video2', { static: false }) video2!: ElementRef<HTMLVideoElement>;

  videoUrl1: string = 'http://77.46.142.211:8081/SremskaRaca/sremskaraca1.m3u8';
  videoUrl2: string = 'http://77.46.142.211:8081/SremskaRaca/sremskaraca2.m3u8';

  ngAfterViewInit(): void {
    const videoElement1 = this.video1.nativeElement;
    const videoElement2 = this.video2.nativeElement;

    // Prvi video
    if (videoElement1 && Hls.isSupported()) {
      const hls1 = new Hls();
      hls1.loadSource(this.videoUrl1);
      hls1.attachMedia(videoElement1);
    } else if (videoElement1) {
      videoElement1.src = this.videoUrl1;
    }

    // Drugi video
    if (videoElement2 && Hls.isSupported()) {
      const hls2 = new Hls();
      hls2.loadSource(this.videoUrl2);
      hls2.attachMedia(videoElement2);
    } else if (videoElement2) {
      videoElement2.src = this.videoUrl2;
    }
  }

}
