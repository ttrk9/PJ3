let car;
let done = false;

objLoader.load(
    './assets/BMW.obj', // path to your OBJ file
    function (object) {
        object.scale.set(0.5, 0.5, 0.5);
        //change env map
        let mesh = object.children[0];
        mesh.material = new T.MeshBasicMaterial({ color: "white", envMap: texture });
        car = object;
        world.scene.add(car);
        done = true;
    },
);