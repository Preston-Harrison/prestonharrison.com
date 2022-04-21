import React, { CSSProperties } from 'react';
import { Canvas } from '@react-three/fiber';
import OrbitControls from './OrbitControls';
import PointField from './PointField';
import CameraScrollControls from './CameraScrollControls';

type Props = {
    onLoad: () => void;
}

const ThreeJSCanvas = ({ onLoad }: Props) => {
    // Stops serverside rendering of animations (next js specific)
    const [domLoaded, setDomLoaded] = React.useState(false);

    React.useEffect(() => {
        setDomLoaded(true);
    }, [])

    if (!domLoaded) return null;

    const canvasConfig: CSSProperties = {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 0,
    }

    return (
        <Canvas style={canvasConfig}>
            <OrbitControls/>
            <PointField onLoad={onLoad} />
            <CameraScrollControls />
        </Canvas>
    )
}

export default ThreeJSCanvas