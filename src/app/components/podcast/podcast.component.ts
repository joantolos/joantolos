import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { podcastEpisodesMax } from '../../../config/config';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as xmljs from 'xml-js';

interface PodcastItem {
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  enclosure: {
    url: string;
    length: string;
    type: string;
  };
  video: string;
  videoId: string;
  videoVisible: string;
}

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PodcastComponent implements OnInit {
  
  podcastFeed: PodcastItem[] | undefined;
  page: number;

  constructor(private sanitizer: DomSanitizer, private router : Router, private route : ActivatedRoute, private http: HttpClient) {
    this.page = 1;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.page = params['page'];
    });

    this.fetchPodcastFeed().subscribe((podcastItems) => {
      this.podcastFeed = podcastItems.filter(item => this.isBeforeCurrentDate(item.pubDate));
      this.navigate();
    });
  }

  fetchPodcastFeed(): Observable<PodcastItem[]> {
    return this.http.get('assets/podcast/feed.rss', { responseType: 'text' })
      .pipe(
        map(response => {
          const parsedData: any = xmljs.xml2js(response, { compact: true });
          const channel = parsedData.rss.channel;
          return channel.item.map((item: any) => {
            const enclosureElement = item.enclosure;
            const enclosureAttributes = enclosureElement ? enclosureElement._attributes : {};

            return {
              title: item.title._text,
              description: (item.descriptionWeb || item.description)._cdata,
              pubDate: item.pubDate._text,
              duration: item['itunes:duration']._text,
              enclosure: {
                url: enclosureAttributes.url || '',
                length: enclosureAttributes.length || '',
                type: enclosureAttributes.type || ''
              },
              video: "https://www.youtube.com/embed/" + (item.videoId || '')._text,
              videoVisible: (item.videoVisible || '')._text
            };
          });
        })
      );
  }

  decrementPage() {
    this.page--;
    this.navigate();
  }

  incrementPage() {
    this.page++;
    this.navigate();
  }

  private navigate() {
    const totalPages = Math.ceil((this.podcastFeed || []).length/podcastEpisodesMax);
    if (this.page < 1) this.page = 1;
    if (this.page > totalPages) this.page = 1;
    this.router.navigate(['/podcast/page/' + this.page], { queryParams: undefined });
  }

  isPreviousDisabled() {
    return this.page == 1;
  }

  isNextDisabled() {
    const totalPages = Math.ceil((this.podcastFeed || []).length/podcastEpisodesMax);
    return this.page == totalPages;
  }

  calculateDurationInMinutes(duration: string): number {
    const durationInSeconds = +duration;
    return Math.floor(durationInSeconds / 60);
  }

  extractDescriptionText(description: string): string {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(description, 'text/html');
    return htmlDoc.body.textContent || '';
  }

  getEpisodes() {
    const start = (this.page * podcastEpisodesMax) - podcastEpisodesMax;
    const end = this.page * podcastEpisodesMax;
    return (this.podcastFeed || []).slice(start, end);
  }

  getVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  showPodcastTitle() {
    return this.page == 1;
  }

  isBeforeCurrentDate(pubDate: string): boolean {
    return new Date(pubDate).getTime() < new Date().getTime();
  }

}
