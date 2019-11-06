import * as THREE from 'three'
import Bee from './Bee'

export default class Bees {
  constructor(scene_) {
    this.bind()
    this.bee = new Bee(scene_, this.onLoad)
    this.beesPos = []
    this.beesRotator = []
    this.bees = []
    this.beeSpeed = []
    this.mixerWing1 = []
    this.mixerWing2 = []
    this.scene = scene_
    this.beeCount = 100;
  }

  onLoad(obj) {
    console.log(obj)
    for (let i = 0; i < this.beeCount; i++) {
      let aBee = obj.scene.clone()
      aBee.scale.set(0.05, 0.05, 0.05)

      let beePos = {
        x: Math.random() + 1,
        y: Math.random() - 0.5,
        z: 0,
      }

      aBee.position.set(beePos.x, beePos.y, beePos.z)
      let rotator = new THREE.Group()
      rotator.add(aBee)
      rotator.rotateZ(Math.random() - 0.5)
      rotator.rotateY(Math.random() - 0.5)
      this.beeSpeed.push(Math.random() * 0.05 + 0.005)
      this.beesRotator.push(rotator)


      var body, wing1, wing2
      aBee.traverse((obj) => {
        if (obj.name == 'body')
          body = obj
        if (obj.name == "wing1")
          wing1 = obj
        if (obj.name == "wing2")
          wing2 = obj
      })

      var mix1 = new THREE.AnimationMixer(wing1)
      var mix2 = new THREE.AnimationMixer(wing2)

      this.mixerWing1.push(mix1)
      this.mixerWing2.push(mix2)


      var wAction0 = mix1.clipAction(obj.animations[0])
      wAction0.play()
      var wAction1 = mix2.clipAction(obj.animations[1])
      wAction1.play()

      this.bees.push(aBee)
      this.scene.add(rotator)
    }
    console.log(this.bees)
  }

  update(delta) {
    this.bees.forEach((bee, i) => {
      this.mixerWing1[i].update(delta);
      this.mixerWing2[i].update(delta);
      this.beesRotator[i].rotateY(this.beeSpeed[i])

    });
  }

  bind() {
    this.onLoad = this.onLoad.bind(this)
    this.update = this.update.bind(this)
  }
}