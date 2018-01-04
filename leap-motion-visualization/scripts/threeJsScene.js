var scene, camera, renderer;

var controller, controls;

function init() {
    controller = new Leap.Controller();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 100;

    // controls = new THREE.LeapSpringControls(camera, controller, scene);
    controls = new THREE.LeapPointerControls(camera, controller);

    controls.size = 100;
    controls.speed = .01;
    controls.dampening = .99;
    controls.target = new THREE.Vector3(0, 100, 0);

    var geometry = new THREE.BoxGeometry(20, 20, 20);
    var material = new THREE.MeshNormalMaterial();

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controller.connect();
}

function animate() {
    controls.update();

    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

init();
animate();