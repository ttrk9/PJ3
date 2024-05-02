import * as T from "/libs/CS559-Three/build/three.module.js";
import { GrObject } from "/libs/CS559-Framework/GrObject.js";
import { OBJLoader } from '/libs/CS559-Three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from "/libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import * as CANNON from "cannon-es";

/**
 * Defines a simple track for the car and adds it to the specified world.
 */
export class EasyTrack extends GrObject {
    constructor(world, physicsWorld) {
        super("TrackMesh");

        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();

        let baseTrack;
        mtlLoader.load(
            '../assets/track/default.mtl', // path to your MTL file
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/default.obj', // path to your OBJ file
                    function (object) {
                        // Manipulate the loaded object if needed (e.g., position, scale)
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(0, -.14, 0);
                        object.position.set(position.x, position.y, position.z);
                        baseTrack = object;
                        world.scene.add(baseTrack);
    
                        for (let i = 0; i < 5; i++) {
                            let track = baseTrack.clone();
                            track.position.z = position.z - i * 4;
                            world.scene.add(track);
                        }

                        let position2 = new T.Vector3(12, -.14, 8);
                        let track2 = baseTrack.clone();
                        track2.position.set(position2.x, position2.y, position2.z);
                        world.scene.add(track2);
                        for (let i = 0; i < 5; i++) {
                            let track = track2.clone();
                            track.position.z = position2.z + i * 4;
                            world.scene.add(track);
                        }

                        let position3 = new T.Vector3(4, -.14, 12);
                        let track3 = baseTrack.clone();
                        track3.position.set(position3.x, position3.y, position3.z);
                        world.scene.add(track3);

                        let position4 = new T.Vector3(0, -.14, 4);
                        let track4 = baseTrack.clone();
                        track4.position.set(position4.x, position4.y, position4.z);
                        world.scene.add(track4);
                    },
                    undefined,
                    function (error) {
                        console.error(error);
                    }
                );
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );

        let curve1;
        mtlLoader.load(
            '../assets/track/curve1.mtl', // path to your MTL file
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve1.obj', // path to your OBJ file
                    function (object) {
                        // Manipulate the loaded object if needed (e.g., position, scale)
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(4, -.14, 8);
                        object.position.set(position.x, position.y, position.z);
                        curve1 = object;
                        curve1.rotation.y = -Math.PI / 2;
                        world.scene.add(curve1);

                        let track = curve1.clone();
                        track.position.set(0, -.14, 8);
                        track.rotation.y = Math.PI/2;
                        world.scene.add(track);
                    },
                    undefined,
                    function (error) {
                        console.error(error);
                    }
                );
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );
        let curve2;
        mtlLoader.load(
            '../assets/track/curve2.mtl', // path to your MTL file
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve2.obj', // path to your OBJ file
                    function (object) {
                        // Manipulate the loaded object if needed (e.g., position, scale)
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(-4, -.14, 24);
                        object.position.set(position.x, position.y, position.z);
                        curve2 = object;
                        world.scene.add(curve2);

                        let track = curve2.clone();
                        track.position.set(0, -.14, 16);
                        track.rotation.y = Math.PI;
                        world.scene.add(track);
                    },
                    undefined,
                    function (error) {
                        console.error(error);
                    }
                );
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );

        let curve3;
        mtlLoader.load(
            '../assets/track/curve3.mtl', // path to your MTL file
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve3.obj', // path to your OBJ file
                    function (object) {
                        // Manipulate the loaded object if needed (e.g., position, scale)
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(8, -.14, -20);
                        object.position.set(position.x, position.y, position.z);
                        curve3 = object;
                        world.scene.add(curve3);

                        let track = curve3.clone();
                        track.position.set(24, -.14, -16);
                        track.rotation.y = -Math.PI / 2;
                        world.scene.add(track);

                        track = curve3.clone();
                        track.position.set(24, -.14, -12);
                        track.rotation.y = Math.PI;
                        world.scene.add(track);

                        track = curve3.clone();
                        track.position.set(20, -.14, 4);
                        world.scene.add(track);

                        track = curve3.clone();
                        track.position.set(4, -.14, 28);
                        track.rotation.y = Math.PI;
                        world.scene.add(track);

                        track = curve3.clone();
                        track.position.set(0, -.14, 28);
                        track.rotation.y = Math.PI / 2;
                        world.scene.add(track);
                    },
                    undefined,
                    function (error) {
                        console.error(error);
                    }
                );
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );

        let curve4;
        mtlLoader.load(
            '../assets/track/curve4.mtl', // path to your MTL file
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve4.obj', // path to your OBJ file
                    function (object) {
                        // Manipulate the loaded object if needed (e.g., position, scale)
                        object.scale.set(4, 4, 6);
                        object.rotation.y = Math.PI / 2;
                        let position = new T.Vector3(19, -.14, -24);
                        object.position.set(position.x, position.y, position.z);
                        curve4 = object;
                        world.scene.add(curve4);

                        let track = curve4.clone();
                        track.position.set(0, .15, 5);
                        track.rotation.y = -Math.PI;
                        //track.rotation.z = Math.PI; // Flip over the z-axis
                        //world.scene.add(track);
                    },
                    undefined,
                    function (error) {
                        console.error(error);
                    }
                );
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );



        //invisible walls
        let wallMaterial = new CANNON.Material("wallMaterial");
        let wallBodies = [
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(40, 1, 1)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(40, 1, 1)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 40)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 40)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 25)), material: wallMaterial }),
        ];

        wallBodies[0].position.set(0, 0, 40);
        wallBodies[1].position.set(0, 0, -35);
        wallBodies[2].position.set(40, 0, 0);
        wallBodies[3].position.set(-15, 0, 0);
        wallBodies[4].position.set(8, 0, 2);

        wallBodies.forEach(wall => physicsWorld.addBody(wall));

        //walls inside track
        let wallBodies2 = [
            new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(5, 5, 30, 32), material: wallMaterial }),
            //new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(5, 5, 30, 32), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(6, 6, 30, 32), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(5, 5, 30, 32), material: wallMaterial }),
        ];

        wallBodies2[0].position.set(22, 0, -15);
        wallBodies2[1].position.set(10, 0, -17.5);
        wallBodies2[2].position.set(2, 0, 27);

        wallBodies2.forEach(wall => physicsWorld.addBody(wall));
    }


}
