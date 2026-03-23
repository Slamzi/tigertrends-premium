/* SCROLL */
function scrollToMusic(){
  document.getElementById("music").scrollIntoView({behavior:"smooth"});
}

/* AUDIO PLAYER */
const audio = document.getElementById("audio");
const seek = document.getElementById("seek");

function togglePlay(){
  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
  }
}

audio.addEventListener("timeupdate", ()=>{
  seek.value = (audio.currentTime / audio.duration) * 100;
});

seek.addEventListener("input", ()=>{
  audio.currentTime = (seek.value / 100) * audio.duration;
});

/* THREE.JS 3D BACKGROUND */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff7b00 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const light = new THREE.PointLight(0xffffff);
light.position.set(20,20,20);
scene.add(light);

camera.position.z = 30;

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

/* RESIZE */
window.addEventListener("resize", ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
