import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const localKey = 'videoplayer-current-time';


const durationCallback = ({seconds}) => {
    localStorage.setItem(localKey, seconds);
}

player.on('timeupdate', throttle(durationCallback, 1000));

const currentVideoTime = localStorage.getItem(localKey);

player
  .setCurrentTime(currentVideoTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
