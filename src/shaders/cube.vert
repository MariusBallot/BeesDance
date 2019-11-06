#pragma glslify: cnoise2 = require(./noise)

uniform float t;
varying vec2 vUv; 

void main() {
  vUv = uv; 
  float n =  cnoise2(vec3(vUv, t*0.02));

  vec3 pos = vec3(position.x*(n+1.), position.y, position.z*(n+1.));

  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}