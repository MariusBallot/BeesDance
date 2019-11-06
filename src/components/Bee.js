import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Bee {

  constructor(scene_, loadCallback) {
    this.bind()
    this.scene = scene_
    this.loader = new GLTFLoader()
    this.loadCallback = loadCallback


    this.load()
  }

  load() {
    this.loader.load('./src/assets/bee.glb', this.onLoad)
  }

  onLoad(glb) {
    this.loadCallback(glb)
  }



  bind() {
    this.load = this.load.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }
}