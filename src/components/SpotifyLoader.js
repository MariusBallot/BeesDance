var Spotify = require('spotify-web-api-js');
export default class SpotifyLoader {
  constructor(token_) {
    this.bind()

    this.audio = new Audio()
    this.audio.crossOrigin = "anonymous";
    this.fdata
    this.analyser
    this.initAnalyser()

    this.spotifyApi = new Spotify();
    this.spotifyApi.setAccessToken(token_);

    this.pause = document.querySelector('.pause')
    this.info = document.querySelector('.trackInfo')

  }

  search(artName_) {
    this.info.innerHTML = ''
    this.spotifyApi.searchTracks(`artist:${artName_}`)
      .then((data) => {
        var validUrls = []
        data.tracks.items.forEach(item => {
          if (item.preview_url)
            validUrls.push(item)
        });
        let rSelector = Math.floor(Math.random() * validUrls.length)
        console.log(validUrls[rSelector])
        if (!validUrls[rSelector].preview_url) {
          document.querySelector('.artError').innerHTML = `No preview found for ${artName_}`
        } else {
          this.renderInfo(validUrls[rSelector])
          document.querySelector('.artError').innerHTML = ""
          console.log(this)
          this.audio.src = validUrls[rSelector].preview_url
          console.log(this.audio)
          this.audio.play()
        }
      }, function (err) {
        console.error(err);
      });

    this.pause.addEventListener('click', () => {
      if (this.audio)
        this.audio.pause()
    })
  }

  initAnalyser() {
    this.audioCtx = new AudioContext()
    this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.8

    this.audioSource.connect(this.analyser);
    this.audioSource.connect(this.audioCtx.destination);
    this.fdata = new Uint8Array(this.analyser.frequencyBinCount);
  }

  updateAnalyser() {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.fdata);

    }
  }

  renderInfo(item) {
    let img = document.createElement('img')
    img.src = item.album.images[1].url
    let p = document.createElement('p')
    p.innerHTML = `${item.artists[0].name} - ${item.name}`


    this.info.appendChild(img)
    this.info.appendChild(p)
  }

  bind() {
    this.search = this.search.bind(this)
    this.renderInfo = this.renderInfo.bind(this)
  }

}