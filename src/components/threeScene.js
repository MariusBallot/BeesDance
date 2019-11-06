import * as THREE from "three";

import Crystal from './Crystal'
import Bees from './Bees'

import OrbitControls from "orbit-controls-es6";
import vertSource from "../shaders/cube.vert";
import fragSource from "../shaders/cube.frag";

class ThreeScene {
  constructor() {
    this.camera;
    this.scene;
    this.renderer;
    this.cube;
    this.controls;
    this.uniforms;

    this.torus;
    this.Crystal
    this.clock = new THREE.Clock();
    this.bees
    this.bind();
    this.init();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.debug.checkShaderErrors = true

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.maxDistance = 1500;
    this.controls.minDistance = 0;

    let texLoader = new THREE.TextureLoader()
    let img = document.createElement('img')
    img.src = './src/assets/textures/Dots.png'
    console.log(img)


    this.uniforms = {
      t: {
        type: "f",
        value: 0.0
      },
      tex: {
        type: 't',
        // value: 0,
        value: texLoader.load('./src/assets/textures/Dots.png')
      }
    };



    let light = new THREE.AmbientLight();
    let pointLight = new THREE.PointLight();
    pointLight.position.set(0, 0, 5200);
    let pointLight2 = new THREE.PointLight();
    pointLight2.position.set(-10, -10, 0);
    this.scene.add(light, pointLight, pointLight2);

    this.Crystal = new Crystal(this.scene)
    this.bees = new Bees(this.scene)

    this.torus = new THREE.Mesh(new THREE.TorusGeometry(2, 0.1, 10, 100), new THREE.MeshNormalMaterial())
    this.torus.rotateX(1.7)
    this.scene.add(this.torus)

    let sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 3), new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertSource,
      fragmentShader: fragSource,
      side: THREE.DoubleSide,
      transparent: true
    }))



  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.Crystal.update()
    this.bees.update(this.clock.getDelta())
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.resizeCanvas);
  }
}

export {
  ThreeScene as
    default
};
