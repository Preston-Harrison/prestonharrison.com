import React from 'react';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import * as THREE from 'three';

const PointField = () => {
  const pointsRef = React.useRef<THREE.Points>();
  const [geometry, setGeometry] = React.useState<THREE.BufferGeometry>();
  const [material, setMaterial] = React.useState<THREE.PointsMaterial>();
  
  React.useEffect(() => {
    const loader = new PLYLoader();
    loader.load('/assets/point_cloud_model.ply', (geometry) => {
        const sprite = new THREE.TextureLoader().load( '/assets/disc.png' );
        const material = new THREE.PointsMaterial({
            size: 0.01,
            map: sprite,
            alphaTest: 0.5,
            transparent: true,
            opacity: 0.7
        })
        material.vertexColors = true;
        setMaterial(material);
        setGeometry(geometry);
    });
  }, []);

  return (
    <points 
        ref={pointsRef}
        geometry={geometry}
        material={material}
    />
  )
}

export default PointField