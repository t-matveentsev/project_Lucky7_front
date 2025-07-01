import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container.jsx';
import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const headerEl = document.querySelector('header');
    const footerEl = document.querySelector('footer');

    setPageHeight(
      window.innerHeight - (headerEl.clientHeight + footerEl.clientHeight)
    );
  }, []);

  return (
    <Container className={css.backgroundWrapper}>
      <div
        style={{
          minHeight: `${pageHeight}px`,
        }}
        className={css.pageWrapper}
      >
        <Link className={css.btnBack} to="/">Back to Main</Link>
        <h2>This recipe page is not found</h2>
      </div>
    </Container>
  );
};

export default NotFoundPage;
