import css from './ErrorMessage.module.css';

export default function ErrorMessage () {
  return (
    <>
      <p className={css.errorMessage}>
        Щось пішло не так!
        <br />А ну-ка перезавантаж сторінку ще разок!
      </p>
    </>
  );
};


