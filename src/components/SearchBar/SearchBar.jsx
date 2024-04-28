import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import { CiSearch } from 'react-icons/ci';

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === '') {
            toast.error('Please enter your request');
            return;
          }

          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field name="query">
            {({ field }) => (
              <input
                {...field}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                className={css.input}
              />
            )}
          </Field>
          <button type="submit" className={css.button}>
            <CiSearch />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
