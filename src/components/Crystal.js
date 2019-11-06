import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { runInThisContext } from "vm"

export default class Crystal {
  constructor(scene_) {
    this.bind()
    this.loader = new GLTFLoader()
    this.crystal
    this.scene = scene_

    this.load()
  }

  load() {
    this.loader.load('./src/assets/scene.gltf', this.onLoad)
  }

  onLoad(gltf) {

    let s = 2
    gltf.scene.scale.set(s, s, s)
    this.crystal = gltf.scene

    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log(child.material)
        child.material.emissiveIntensity = 5
        this.crystal = child
      }
    })

    this.scene.add(gltf.scene)
  }

  update() {
    if (this.crystal) {
      this.crystal.rotateY(0.03)
      this.crystal.position.y = Math.sin(Date.now() * 0.001) * 0.1
      this.crystal.material.emissiveIntensity = Math.sin(Date.now() * 0.001) * 10 + 10
      this.crystal.material.needsUpdate = true
    }
  }

  bind() {
    this.load = this.load.bind(this)
    this.update = this.update.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

}