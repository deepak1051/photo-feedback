import React from 'react';
import SearchBar from '../components/youtube-search/SearchBar';
import VideoDetail from '../components/youtube-search/VideoDetail';
import VideoList from '../components/youtube-search/VideoList';

export default function YoutubeSearch() {
  return (
    <div className="ui container">
      <SearchBar />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail />
          </div>
          <div className="five wide column">
            <VideoList />
          </div>
        </div>
      </div>
    </div>
  );
}
