import './sass/index.scss';
import ThreeScene from './components/threeScene'
import SpotifyLoader from './components/SpotifyLoader'
import utils from './utils'

window.onload = () => {

    const threeScene = new ThreeScene();
    const spotLoader = new SpotifyLoader(utils.utils.token)
    document.querySelector

    const valid = document.querySelector('.valid')
    const artist = document.querySelector('input.artist')
    // spotLoader.search('Migos')
    valid.addEventListener('click', () => {
        if (artist.value) {
            spotLoader.search(artist.value.toString())
        }
    })

    function raf() {
        threeScene.update();
        spotLoader.updateAnalyser()
        requestAnimationFrame(raf)
    }

    raf()
}
