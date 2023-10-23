import HomePage from "./HomePage"
import ResultPage from "./ResultPage"
import { useState } from "react"

function extractVideoId(videoLink) {
  // Regular expression for full YouTube URLs
  const fullUrlRegex = /[?&]v=([^#&]+)/;
  // Regular expression for shortened YouTube URLs
  const shortUrlRegex = /youtu\.be\/([^?&]+)/;
  
  let match = videoLink.match(fullUrlRegex) || videoLink.match(shortUrlRegex);
  
  if (match) {
    return match[1];
  } else {
    return null;
  }
}




function getVideoData(videoId, apiKey, callback) {
  const result = []; // Store data for the specified video and top performers
  let specifiedVideoData
  let channelId;
  let subscriberCount;

  // Request the video's channelId
  fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics&id=${videoId}`)
    .then(response => response.json())
    .then(videoData => {
      const videoInfo = videoData.items[0];
      specifiedVideoData = {
        title: videoInfo.snippet.title,
        thumbnail: videoInfo.snippet.thumbnails.default.url,
        views: parseInt(videoInfo.statistics.viewCount || 0),
        likes: parseInt(videoInfo.statistics.likeCount || 0),
        comments: parseInt(videoInfo.statistics.commentCount || 0),
        uploadedOn: videoInfo.snippet.publishedAt,
      };

      channelId = videoInfo.snippet.channelId;

      return fetch(`https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&part=statistics&id=${channelId}`);
    })
    .then(response => response.json())
    .then(channelData => {
      const statistics = channelData.items[0].statistics;
      subscriberCount = parseInt(statistics.subscriberCount);
      return fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&channelId=${channelId}&maxResults=2&type=video&order=viewCount`);
    })
    .then(response => response.json())
    .then(searchData => {
      const videoIds = searchData.items.map(item => item.id.videoId);

      // Fetch data for the top performers
      return fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics&id=${videoIds.join(',')}`);
    })
    .then(response => response.json())
    .then(videoData => {
      const videos = videoData.items.map(item => {
        const video = item.snippet;
        video.statistics = item.statistics || {};
        return video;
      });

      // Calculate estimated earnings for each video
      videos.forEach(video => {
        const views = parseInt(video.statistics.viewCount || 0);
        const comments = parseInt(video.statistics.commentCount || 0);
        const likes = parseInt(video.statistics.likeCount || 0);

        const earnings = Math.min(subscriberCount, views) + 10 * comments + 5 * likes;

        result.push({
          title: video.title,
          thumbnail: video.thumbnails.default.url,
          views,
          likes,
          comments,
          uploadedOn: video.publishedAt,
          earnings,
        });
      });

      // Calculate estimated earnings for specifiedVideoData
      const specifiedEarnings = Math.min(subscriberCount, specifiedVideoData.views) + 10 * specifiedVideoData.comments + 5 * specifiedVideoData.likes;
      specifiedVideoData.earnings = specifiedEarnings;

      // Add specifiedVideoData to the result array
      result.push(specifiedVideoData);

      // Sort the result array by earnings
      result.sort((a, b) => b.earnings - a.earnings);

      console.log("Inside Function",result);
      callback(result);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


































function App() {
  const [page,setpage] = useState([]);
  const [link, setLink] = useState("");
  const apiKey = "AIzaSyD1PShqvKAiaWXV9W0sRVhl7sRWDrvJ4wE";

  function handleChange(value){
    setLink(value);
  }

  function onButtonPress(){
    const videoId = extractVideoId(link);
    getVideoData(videoId, apiKey, setpage);
  }
  

  if(page.length == 0){
  return (
      <HomePage link={link} func={handleChange} buttonHandler={onButtonPress}/> 
  )
  }else{
    return(
      <ResultPage p={page}/>
    )
  }
}

export default App
