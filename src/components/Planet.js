import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default class Planet {
  constructor(scene_) {
    this.bind()
    this.loader = new GLTFLoader()
    this.planet
    this.scene = scene_

    this.load()
  }

  load() {
    this.loader.load('./src/assets/planet.glb', this.onLoad)
  }

  onLoad(gltf) {

    let s = 1.5
    gltf.scene.scale.set(s, s, s)
    this.planet = gltf.scene

    this.planet.traverse(child => {
      if (child.name = "water" && child instanceof THREE.Mesh) {
        console.log(child)
        child.material.transparent = true
      }
    })

    this.scene.add(this.planet)
  }

  update() {
    if (this.planet) {
      this.planet.rotateY(0.01)
      this.planet.position.y = Math.sin(Date.now() * 0.001) * 0.1

    }
  }

  bind() {
    this.load = this.load.bind(this)
    this.update = this.update.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

}