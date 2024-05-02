import * as T from "/libs/CS559-Three/build/three.module.js";
import { Clock } from "three";
import * as CANNON from "cannon-es";
import { GrWorld } from "/libs/CS559-Framework/GrWorld.js";
import { GrObject } from "/libs/CS559-Framework/GrObject.js";
import { OBJLoader } from '/libs/CS559-Three/examples/jsm/loaders/OBJLoader.js';
import { ArrowHelper } from "/libs/CS559-Three/build/three.module.js";
import { AxesHelper } from "/libs/CS559-Three/build/three.module.js";
import { GLTFLoader } from "/libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";
import { MTLLoader } from "/libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import CannonDebugger from "cannon-es-debugger";
import { OrbitControls } from "/libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { EasyTrack } from "./EasyTrack.js";
import { HardTrack } from "./HardTrack.js";



let objLoader = new OBJLoader();
let mtlLoader = new MTLLoader();
let timer = new Clock();

let background = new T.CubeTextureLoader().setPath("./textures/cubemap/")
    .load([
        'left.jpg',
        'right.jpg',
        'top.jpg',
        'bottom.jpg',
        'front.jpg',
        'back.jpg'
    ]);



//booleans
let go = true;
let timerStarted = false;
let bumper = false;


//initializing world

let camera = new T.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 150);
let offset = new T.Vector3(0, 5, 10);
let lookAt = new T.Vector3(0, 0, -5);
let newOffsetLocal = new T.Vector3(0, 7.5, 10);

let newLookAtLocal = new T.Vector3(0, 0, -2.5);

camera.position.copy(newOffsetLocal);
camera.lookAt(newLookAtLocal);

let newRenderer = new T.WebGLRenderer({ antialias: true});
newRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(newRenderer.domElement);

let world = new GrWorld({renderer:newRenderer, camera: camera, groundplanesize: 50, width: window.innerWidth, height: window.innerHeight })

world.renderer.domElement.style.display = "none";

let controls = new OrbitControls(camera, world.renderer.domElement);
controls.enabled = false;

let axes = new AxesHelper();
//world.scene.add(axes);//x is red, y is green, z is blue

//world.scene.add(new ArrowHelper(lookAt, new T.Vector3(0, 0, 0), 5, 0xff0000));
//world.scene.add(new ArrowHelper(offset, new T.Vector3(0, 0, 0), 10, 0x00ff00));

world.scene.background = background;


//initializing physics world
let physicsWorld = new CANNON.World({ gravity: new CANNON.Vec3(0, -25, 0) });



//HTML elements
let lapTimer = document.getElementById("lapTimer");
let pauseMenu = document.getElementById("pauseMenu");
let trackSelected = document.getElementById("trackSelect");
let track;
let showControlsButton = document.getElementById("showControlsButton");
let controlsMenu = document.getElementById("controlsMenu");

let start = document.getElementById("startButton");
start.addEventListener('click', () => {
    if (trackSelected.value === "easy") {
        track = new EasyTrack(world, physicsWorld);
    } else {
        console.log("hard track");
        track = new HardTrack(world, physicsWorld);
    }
    //wait for track to load
    setTimeout(1000);
    document.getElementById("mainMenu").style.display = "none";
    world.renderer.domElement.style.display = "block";
    document.getElementById("lapTimer").style.display = "block";

    
    showControlsButton.style.display = "none";
    controlsMenu.style.display = "none";
});

let options = document.getElementById("optionsButton");
options.addEventListener('click', () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("optionsMenu").style.display = "block";
});

let back = document.getElementById("backButton");
back.addEventListener('click', () => {
    document.getElementById("optionsMenu").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
});

let resumeButton = document.getElementById("resumeButton");
resumeButton.addEventListener('click', () => {
    pauseMenu.style.display = "none";
    world.renderer.domElement.style.display = "block";
});

let quitButton = document.getElementById("quitButton");
quitButton.addEventListener('click', () => {
    location.reload();
});

showControlsButton.addEventListener('click', () => {
    controlsMenu.style.display = "block";
});

let backButton2 = document.getElementById("backButton2");
backButton2.addEventListener('click', () => {
    controlsMenu.style.display = "none";
});








// intializing physics world and car


const debug = new CannonDebugger(world.scene, physicsWorld);
let ground = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane() });
ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
physicsWorld.addBody(ground);

//making car body
let bodyWidth = .85;
let bodyHeight = 0.5;
let bodyLength = 1.5;

let carBody = new CANNON.Body({
    mass: 15,
    shape: new CANNON.Box(new CANNON.Vec3(bodyWidth, bodyHeight, bodyLength))
});

carBody.position.set(0, 2.5, 0);
let vehicle = new CANNON.RigidVehicle({ chassisBody: carBody });

//making wheels
let mass = 5;
let axisWidth = bodyWidth;
let wheelBase = bodyLength;
let wheelRadius = 0.35;
let yOffset = .5;

let offsets = [
    new CANNON.Vec3(-axisWidth, -yOffset, -wheelBase + .15),
    new CANNON.Vec3(axisWidth, -yOffset, -wheelBase + .15),
    new CANNON.Vec3(-axisWidth, -yOffset, wheelBase + 0.25),
    new CANNON.Vec3(axisWidth, -yOffset, wheelBase + 0.25)
]


let wheelVisuals = [];

let wheelBodies = offsets.map(offset => {
    let wheel = new CANNON.Body({ mass: mass, shape: new CANNON.Sphere(wheelRadius) });
    wheel.position.copy(offset);

    let geometry = new T.CylinderGeometry(wheelRadius, wheelRadius, 0.4, 32);
    let material = new T.MeshBasicMaterial({ color: "black" });
    let cylinder = new T.Mesh(geometry, material);
    cylinder.geometry.rotateZ(Math.PI / 2);
    cylinder.position.copy(offset).add(new T.Vector3(0, 0.85, 0));
    world.scene.add(cylinder);
    wheelVisuals.push(cylinder);
    return wheel;
});

wheelBodies.forEach(wheel => {
    vehicle.addWheel({
        body: wheel,
        position: wheel.position,
        axis: new CANNON.Vec3(-1, 0, 0),
        radius: wheelRadius,
    });
});

vehicle.addToWorld(physicsWorld);



//loading car model

let car;

objLoader.load(
    './assets/BMW.obj', // path to your OBJ file
    function (object) {
        object.scale.set(0.5, 0.5, 0.5);
        //change env map
        let mesh = object.children[0];
        mesh.material = new T.MeshBasicMaterial({
            color: "white",
            envMap: background
        });
        car = object;
        world.scene.add(car);
    },
);


function animate() {
    physicsWorld.fixedStep();
    //debug.update();
    world.animate();
    if (car) {
        car.position.copy(carBody.position);
        car.position.y -= 0.75;
        //car.position.z -= 0.25;
        car.quaternion.copy(carBody.quaternion);
        //console.log(carBody.position)
        //console.log(carBody.quaternion)
        for (let i = 0; i < wheelVisuals.length; i++) {
            wheelVisuals[i].position.copy(wheelBodies[i].position);
            wheelVisuals[i].quaternion.copy(wheelBodies[i].quaternion);
        }


        //third person camera

        let newOffsetWorld = car.localToWorld(newOffsetLocal.clone());
        let newLookAtWorld = car.localToWorld(newLookAtLocal.clone());



        if (!controls.enabled) {
            camera.position.copy(newOffsetWorld);
            camera.lookAt(newLookAtWorld);
        }

        //lap timer
        
        if (carBody.position.z < -1 && !timerStarted) {
            timerStarted = true;
            timer.start();
            console.log("Timer started");
        }
        
        if (timerStarted) {
            // Display the timer continuously while it's running
            console.log("Elapsed time: " + timer.getElapsedTime().toFixed(2) + "s");
            lapTimer.innerHTML = "Time: " + timer.getElapsedTime().toFixed(2) + "s";
        }
        
        if (carBody.position.z > 0 && timerStarted && carBody.position.z < 1 && carBody.position.x < 5) {
            timer.stop();
            console.log("Timer stopped");
            console.log("Elapsed time: " + timer.getElapsedTime().toFixed(2) + "s");
            lapTimer.innerHTML = "Time: " + timer.getElapsedTime().toFixed(2) + "s";
        }
    }


    window.requestAnimationFrame(animate);
}
animate();



//keyboard controls

document.addEventListener('keydown', (event) => {
    const maxSteerVal = Math.PI / 4;
    const maxForce = 17.5;

    switch (event.key) {
        case 'w':
            vehicle.setWheelForce(maxForce, 0);
            vehicle.setWheelForce(maxForce, 1);
            break;

        case 's':
            vehicle.setWheelForce(-maxForce / 2, 0);
            vehicle.setWheelForce(-maxForce / 2, 1);
            break;

        case 'a':
            vehicle.setSteeringValue(maxSteerVal, 0);
            vehicle.setSteeringValue(maxSteerVal / 2, 1);
            break;

        case 'd':
            vehicle.setSteeringValue(-maxSteerVal / 2, 0);
            vehicle.setSteeringValue(-maxSteerVal, 1);
            break;


        case 'b':
            bumper = !bumper;
            if (bumper) {
                //bumper camera
                newOffsetLocal = new T.Vector3(0, 5, -2);
                newLookAtLocal = new T.Vector3(0, 0, -10);
            } else {
                //normal camera
                newOffsetLocal = new T.Vector3(0, 7.5, 10);
                newLookAtLocal = new T.Vector3(0, 0, -5);
            }
            break;


        case 'c':
            controls.enabled = !controls.enabled;
            if (controls.enabled) {
                camera.position.set(0, 15, 20);
                camera.lookAt(car.position);
            }
            break;


        case 'Escape':
            pauseMenu.style.display = "block";
            go = false;
            world.renderer.domElement.style.display = "none";
            break;


        case 'r':
            //TODO: add reset function


            break;

    }
});


document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            vehicle.setWheelForce(0, 0);
            vehicle.setWheelForce(0, 1);
            break;

        case 's':
        case 'ArrowDown':
            vehicle.setWheelForce(0, 0);
            vehicle.setWheelForce(0, 1);
            break;

        case 'a':
        case 'ArrowLeft':
            vehicle.setSteeringValue(0, 0);
            vehicle.setSteeringValue(0, 1);
            break;

        case 'd':
        case 'ArrowRight':
            vehicle.setSteeringValue(0, 0);
            vehicle.setSteeringValue(0, 1);
            break;


    }
});


//start world
if (go) {
    world.go();
}

/*world.renderer.shadowMap.enabled = true;
function recursiveShadows(obj) {
    obj.castShadow = true;
    obj.receiveShadow = true;
    if (obj.children) {
        obj.children.forEach(child => recursiveShadows(child));
    }
}*/ //TODO: fix shadows

//recursiveShadows(world.scene);













