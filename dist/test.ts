declare var netflix: any
const videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
const player = videoPlayer.getVideoPlayerBySessionId(videoPlayer.getAllPlayerSessionIds()[0]);
const currentTime = player.getCurrentTime();
console.log(currentTime);