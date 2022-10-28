// index.tsx
import styles from './index.module.scss';
// 1. 导入图片
import logoSrc from '@assets/imgs/vite.png';
import { ReactComponent as ReactLogo } from '@assets/icons/logo.svg';
import { useEffect } from 'react';

import Worker from './worker.js?worker';
// 1. 初始化 Worker 实例
const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (e) => {
  console.log(e);
});
export function Header() {
  useEffect(() => {
    const img = document.getElementById('logo') as HTMLImageElement;
    img.src = logoSrc;
  }, []);
  return (
    <div className={styles.header + ' p-20px text-center'}>
      <h1 className="font-bold text-2xl mb-2">header</h1>
      {/* 方式一 */}
      <img className="m-auto mb-4" src={logoSrc} alt="" />
      {/* 方式二 */}
      <img id="logo" className="m-auto mb-4" alt="" />

      <img src={new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href} />

      <ReactLogo />
    </div>
  );
}
