import * as T from "/libs/CS559-Three/build/three.module.js";
import { GrObject } from "/libs/CS559-Framework/GrObject.js";
import { OBJLoader } from '/libs/CS559-Three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from "/libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import * as CANNON from "cannon-es";

/**
 * Defines a simple track for the car and adds it to the specified world.
 */
export class HardTrack extends GrObject {
    constructor(world, physicsWorld) {
        super("TrackMesh");

        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();

        let baseTrack;
        mtlLoader.load(
            '../assets/track/default.mtl',
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/default.obj', 
                    function (object) {
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(0, -.14, 0);
                        object.position.set(position.x, position.y, position.z);
                        baseTrack = object;
                        world.scene.add(baseTrack);
                        for (let i = 0; i < 7; i++) {
                            let track = baseTrack.clone();
                            track.position.z = position.z - i * 4;
                            world.scene.add(track);
                        }

                        let position2 = new T.Vector3(24, -.14, -36);
                        let track2 = baseTrack.clone();
                        track2.rotation.y = Math.PI / 2;
                        track2.position.set(position2.x, position2.y, position2.z);
                        world.scene.add(track2);

                        let position3 = new T.Vector3(12, -.14, 8);
                        let track3 = baseTrack.clone();
                        track2.position.set(position2.x, position2.y, position2.z);
                        //world.scene.add(track2);
                        for (let i = 0; i < 5; i++) {
                            let track = baseTrack.clone();
                            track.position.set(20,-.14,-8)
                            track.position.z = track.position.z + i * 4;
                            world.scene.add(track);
                        }

                        for (let i = 0; i < 3; i++) {
                            let track = baseTrack.clone();
                            track.position.z = track.position.z + i * 4;
                            world.scene.add(track);
                        }
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
            '../assets/track/curve1.mtl',
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve1.obj', 
                    function (object) {
                    
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(12, -.14, -40);
                        object.position.set(position.x, position.y, position.z);
                        curve1 = object;
                        world.scene.add(curve1);
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
            '../assets/track/curve2.mtl',
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve2.obj',
                    function (object) {

                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(4, -.14, -28);
                        object.position.set(position.x, position.y, position.z);
                        curve2 = object;
                        world.scene.add(curve2);

                        let track = curve2.clone();
                        track.position.set(8, -.14, -36);
                        track.rotation.y = Math.PI;
                        world.scene.add(track);

                        track = curve2.clone();
                        track.position.set(24, -.14, -12);
                        world.scene.add(track);

                        track = curve2.clone();
                        track.position.set(24, -.14, 12);
                        track.rotation.y = Math.PI / 2;
                        world.scene.add(track);

                        track = curve2.clone();
                        track.position.set(28, -.14, 20);
                        track.rotation.y = -Math.PI/2;
                        world.scene.add(track);

                        track = curve2.clone();
                        track.position.set(8, -.14, 20);
                        track.rotation.y = -Math.PI/2;
                        world.scene.add(track);

                        track = curve2.clone();
                        track.position.set(4, -.14,12);
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

        let curve3;
        mtlLoader.load(
            '../assets/track/curve3.mtl', 
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve3.obj', 
                    function (object) {
    
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(28, -.14, -28);
    
                        object.position.set(position.x, position.y, position.z);
                        object.rotation.y = -Math.PI / 2;
                        curve3 = object;
                        world.scene.add(curve3);

                        let track = curve3.clone();
                        track.position.set(28, -.14, -24);
                        track.rotation.y = Math.PI
                        world.scene.add(track);

                        let track2 = curve3.clone();
                        track2.position.set(24, -.14, 24);
                        track2.rotation.y = Math.PI ;
                        world.scene.add(track2);

                        let track3 = curve3.clone();
                        track3.position.set(20, -.14, 24);
                        track3.rotation.y = Math.PI / 2;
                        world.scene.add(track3);


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
            '../assets/track/curve4.mtl', 
            function (materials) {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../assets/track/curve4.obj',
                    function (object) {
          
                        object.scale.set(4, 4, 4);
                        let position = new T.Vector3(16, -.14, -40);
                        object.position.set(position.x, position.y, position.z);
                        curve4 = object;
                        curve4.rotation.y = -Math.PI / 2;
                        world.scene.add(curve4);
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
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(45, 1, 1)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(45, 1, 1)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 45)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 45)), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 1, 30)), material: wallMaterial }),
        ];

        wallBodies[0].position.set(0, 0, 40);
        wallBodies[1].position.set(0, 0, -45);
        wallBodies[2].position.set(40, 0, 0);
        wallBodies[3].position.set(-10, 0, 0);
        wallBodies[4].position.set(16, 0, -6);

        wallBodies.forEach(wall => physicsWorld.addBody(wall));

        //walls inside track
        let wallBodies2 = [
            new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(5, 5, 30, 32), material: wallMaterial }),
            //new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(5, 5, 30, 32), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(6, 6, 30, 32), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(5, 5, 30, 32), material: wallMaterial }),
            new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(5, 5, 30, 32), material: wallMaterial }),
        ];

        wallBodies2[0].position.set(10, 0, -24);
        wallBodies2[1].position.set(24, 0, -25);
        wallBodies2[2].position.set(22, 0, 24);
        wallBodies2[3].position.set(8, 0, 8);

       wallBodies2.forEach(wall => physicsWorld.addBody(wall));
    }


}
