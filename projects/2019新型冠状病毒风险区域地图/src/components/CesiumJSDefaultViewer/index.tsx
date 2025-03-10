import { useEffect } from 'react';
import styles from './index.less';
import { Viewer } from 'cesium';
import '@/../node_modules/cesium/Build/Cesium/Widgets/widgets.css';
/**
 * CesiumJS默认的界面
 */
export default function IndexPage() {
  const className = styles.container;
  useEffect(function () {
    const container = document.querySelector('.' + className);
    const viewer = new Viewer(container);
    console.log('viewer', viewer);
    return function () {
      viewer.destroy();
    };
  }, []);
  return <div className={className}></div>;
}
