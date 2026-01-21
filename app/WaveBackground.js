import React from "react";
import { Canvas, Path } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function WaveBackground() {
  return (
    <Canvas style={{ width, height: 260 }}>
      <Path
        path={`
          M0 0
          L0 180
          C 240 240, 480 120, ${width} 160
          L ${width} 0
          Z
        `}
        color="#FF8A80"
      />
    </Canvas>
  );
}
