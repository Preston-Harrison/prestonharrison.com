import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as THREEOrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Props = {
  lock?: boolean;
}

const OrbitControls = ({ lock = false }: Props) => {
  const { camera, gl } = useThree();
  const controls = React.useMemo(() => {
    const _controls = new THREEOrbitControls(camera, gl.domElement);
    if (lock) {
      _controls.enableZoom = false;
      _controls.enablePan = false;
    }
    return _controls;
  }, [camera, gl.domElement, lock]);

  useFrame(controls.update);

  return null;
}

export default OrbitControls