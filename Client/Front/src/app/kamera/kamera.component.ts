import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Hls from 'hls.js';
@Component({
  selector: 'app-kamera',
  templateUrl: './kamera.component.html',
  styleUrls: ['./kamera.component.css']
})
export class KameraComponent implements AfterViewInit{
  
  videoUrl: string = 'http://77.46.142.211:8081/Djala/djala1.m3u8';

  ngAfterViewInit() {
    const video = document.querySelector('video');
    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.videoUrl);
      hls.attachMedia(video);
    } else if (video) {
      video.src = this.videoUrl; 
    }
  }

  
}
