import { useState, useEffect } from 'react';
import styles from './index.less';
import createWidget from '@/modules/createDefaultWidget';
import ArcGIS_World_Imagery from '@/modules/ArcGIS_World_Imagery';
import Sky_Atmosphere from '@/modules/Sandcastle_Sky_Atmosphere';
import { Drawer, Button } from 'antd';
let scene;
let camera;
const className = styles.container;
/**
 * 基于CesiumJS默认的简化界面所配置的界面
 */
export default function IndexPage() {
  useEffect(function () {
    const container = document.querySelector('.' + className);
    // Argument of type 'Element | null' is not assignable to parameter of type 'Element'.
    if (container === null) {
      // Argument of type '() => (() => void) | null' is not assignable to parameter of type 'EffectCallback'.
      return;
    }
    const widget = createWidget(container);
    scene = widget.scene;
    camera = widget.camera;
    scene.imageryLayers.addImageryProvider(ArcGIS_World_Imagery);
    scene.skyAtmosphere = Sky_Atmosphere;
    return function () {
      widget.destroy();
    };
  }, []);
  const [visible, setVisible] = useState(false);
  function onClick(event) {
    console.log('onClick', event, event.target.innerText);
    setVisible(true);
  }
  function onClose(event) {
    setVisible(false);
  }
  function onClickOne(event) {
    setVisible(false);
    camera.flyHome();
  }
  return (
    <div className={className}>
      <Button type="primary" style={{ position: 'absolute' }} onClick={onClick}>
        选择查看的区域
      </Button>
      <Drawer title="选择查看的区域" visible={visible} onClose={onClose}>
        <Button type="primary" onClick={onClickOne}>
          全球
        </Button>
      </Drawer>
    </div>
  );
}
