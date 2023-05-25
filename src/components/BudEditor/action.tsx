import classes from './popup.module.css';

function Action({ top, left }) {
  return (
    <div className={classes.popup} style={{ position: 'absolute', top, left }}>
      {' '}
      test
    </div>
  );
}

export default Action;
