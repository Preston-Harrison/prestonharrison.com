import { useFrame, useThree } from "@react-three/fiber";
import { MAX_SCROLL } from "../../../pages";

const slerp = (startValue: number, endValue: number, startIncrement: number, endIncrement: number, currentIncrement: number) => {
  return startValue + (endValue - startValue) * ((currentIncrement - startIncrement) / (endIncrement - startIncrement));
};

const slerp3 = (startValue: number[], endValue: number[], startIncrement: number, endIncrement: number, currentIncrement: number): [number, number, number] => {
  return [slerp(startValue[0], endValue[0], startIncrement, endIncrement, currentIncrement), slerp(startValue[1], endValue[1], startIncrement, endIncrement, currentIncrement), slerp(startValue[2], endValue[2], startIncrement, endIncrement, currentIncrement)];
}

const CameraScrollControls = () => {
  const { camera } = useThree();

  useFrame(() => {
    const scrollPercent = (window.scrollY * 100) / MAX_SCROLL;
    // console.log(scrollPercent)
    if (scrollPercent >= 0 && scrollPercent <= 20) {
      camera.position.set(...slerp3(
        [0.8, 1.5, 1.4],
        [-0.4, 0.1, -0.3],
        0, 20, scrollPercent
      ))
      camera.rotation.set(...slerp3(
        [-1, 0, 0.3],
        [0.5, -0.2, -0.4],
        0, 20, scrollPercent
      ))
    }
    if (scrollPercent >= 20 && scrollPercent <= 30) {
      camera.position.set(...slerp3(
        [-0.4, 0.1, -0.3],
        [-0.4, 0.3, -0.8],
        20, 30, scrollPercent
      ))
      camera.rotation.set(...slerp3(
        [0.5, -0.2, -0.4],
        [0.5, -1.8, -0.1],
        20, 30, scrollPercent
      ))
    }
    if (scrollPercent >= 30 && scrollPercent <= 50) {
      camera.position.set(...slerp3(
        [-0.4, 0.3, -0.8],
        [2.4, -0.4, 0.3],
        30, 50, scrollPercent
      ))
      camera.rotation.set(...slerp3(
        [0.5, -1.8, -0.1],
        [0.5, -4.5, 0],
        30, 50, scrollPercent
      ))
    }
    if (scrollPercent >= 50 && scrollPercent <= 100) {
      camera.position.set(...slerp3(
        [2.4, -0.4, 0.3],
        [-2.4, -0.2, 0.3],
        50, 100, scrollPercent
      ))
      camera.rotation.set(...slerp3(
        [0.5, -4.5, 0],
        [0.5, -5, 0],
        50, 100, scrollPercent
      ))
    }
  });

  return null;
}

export default CameraScrollControls