document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.createElement('audio');
    audioPlayer.setAttribute('autoplay', 'autoplay');
    audioPlayer.setAttribute('loop', 'loop');
    var source = document.createElement('source');
    source.setAttribute('src', 'music.mp3');
    source.setAttribute('type', 'audio/mp3');
    audioPlayer.appendChild(source);
    document.body.appendChild(audioPlayer);
  });
  