import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import ThreeJSCanvas from '../components/Canvas/ThreeJSCanvas';
import ContactMe from '../components/ContactMe';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import Modal, { ModalType } from '../components/Modal';
import { Projects, ProjectsMobile } from '../components/Projects';
import TitleCard from '../components/Title';
import WhoAmI from '../components/WhoAmI';
import styles from '../styles/Home.module.scss';

export const MAX_SCROLL = 10_000;

const Home: NextPage = () => {
  const [stage, setStage] = React.useState<number>(1);
  const [loadedPointCloud, setLoadedPointCloud] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      let stage = -1;
      if (scroll < 1000) stage = 1;
      else if (scroll > 2000 && scroll <= 3000) stage = 2;
      else if (scroll > 4000 && scroll <= 5000) stage = 3;
      else if (scroll > 5000 && scroll <= 6000) stage = 4;
      else if (scroll > 6000 && scroll <= 8000) stage = 5;
      else if (scroll > 9000 && scroll <= 10_000) stage = 6;
      setStage(stage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const [modalType, setModalType] = React.useState<ModalType>(null);

  React.useEffect(() => {
    if (!!modalType) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
  }, [modalType]);

  return (
      <div>
        <Head>
          <title>Preston Harrison</title>
          <meta name="description" content="Preston Harrison's website and portfolio" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThreeJSCanvas onLoad={() => setLoadedPointCloud(true)}/>
        <Modal type={modalType} closeModal={() => setModalType(null)}/>
        {!loadedPointCloud && <LoadingScreen />}
        <div style={{ opacity: loadedPointCloud ? 1 : 0 }}>
            <header>
              <Header openMenu={() => setModalType("menu")}/>
            </header>
            <main>
              <div className={styles.container} style={{ 
                height: MAX_SCROLL, 
              }}>
                <TitleCard show={stage === 1} />
                <WhoAmI show={stage === 2}/>
                <Projects 
                  showTop={stage >= 3 && stage <= 5} 
                  showMiddle={stage === 4 || stage === 5}
                  showBottom={stage === 5}
                />
                <ProjectsMobile
                  showTop={stage === 3} 
                  showMiddle={stage === 4}
                  showBottom={stage === 5}
                />
                <ContactMe show={stage === 6} openContact={() => setModalType("contact")}/>
              </div>
               <div id={styles["scroll-down"]} className={stage <= 1 ? 'fade-in' : 'fade-out'}>
                 Scroll Down
                </div>
            </main>
          </div>
      </div>
  )
}

export default Home;
