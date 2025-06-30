import { useEffect, useRef } from 'react';
import Container from '../../components/Container/Container.jsx';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const headerHeightRef = useRef(0);
  const footerHeightRef = useRef(0);

  const pageHeight =
    window.innerHeight - (headerHeightRef.current + footerHeightRef.current);

  useEffect(() => {
    const headerEl = document.querySelector('header');
    const footerEl = document.querySelector('footer');
    headerEl && (headerHeightRef.current = headerEl.clientHeight);
    footerEl && (footerHeightRef.current = footerEl.clientHeight);
  }, []);

  return (
    <Container className={css.backgroundWrapper}>
      <div
        style={{
          minHeight: `${pageHeight}px`,
        }}
        className={css.pageWrapper}
      >
        <h2>This recipe page is not found</h2>
      </div>
    </Container>
  );
};

export default NotFoundPage;
