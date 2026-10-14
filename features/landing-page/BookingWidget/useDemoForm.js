/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from 'react';
import { getToday } from './dateTime';
import {
  emptyValues,
  formTimeZone,
  initialValues,
  updateValues,
} from './formState';
import validateSearch from './validation';
import createPreview from './createPreview';

export default function useDemoForm(category) {
  const formRef = useRef(null);
  const previewRef = useRef(null);

  const [values, setValues] = useState(() => emptyValues(category));
  const [clock, setClock] = useState(null);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  // Keep server output and the initial browser render identical.
  useEffect(() => {
    const now = new Date();

    setValues(initialValues(category, now));
    setClock(now);
    setErrors({});
    setPreview(null);
  }, [category]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
    }
  }, [errors]);

  useEffect(() => {
    if (!preview) return;

    const element = previewRef.current;

    element?.focus({ preventScroll: true });
    element?.scrollIntoView({
      block: 'nearest',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, [preview]);

  function update(patch) {
    setValues((previous) => updateValues(category, previous, patch));
    setErrors({});
    setPreview(null);
  }

  function field(name) {
    return {
      name,
      value: values[name],
      error: errors[name],
      onChange: (event) => update({ [name]: event.target.value }),
    };
  }

  function submit(event) {
    event.preventDefault();

    if (!clock) return;

    const now = new Date();
    const nextErrors = validateSearch(category, values, now);

    setClock(now);
    setErrors(nextErrors);
    setPreview(
      Object.keys(nextErrors).length ? null : createPreview(category, values),
    );
  }

  function dismissPreview() {
    setPreview(null);
    formRef.current?.querySelector('button[type="submit"]')?.focus();
  }

  return {
    values,
    errors,
    preview,
    formRef,
    previewRef,
    ready: clock !== null,
    minDate: clock ? getToday(formTimeZone(category, values), clock) : '',
    field,
    update,
    submit,
    dismissPreview,
  };
}
