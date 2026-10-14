/* eslint-disable react-hooks/refs */
import Icon from '@/components/ui/Icon';
import { cn, EYEBROW, PRIMARY_BUTTON } from '../../theme';
import SearchPreview from './SearchPreview';

export default function BookingForm({
  form,
  eyebrow,
  title,
  submitLabel,
  note,
  children,
}) {
  return (
    <form
      ref={form.formRef}
      onSubmit={form.submit}
      noValidate
      className="space-y-5"
    >
      <div>
        <p className={EYEBROW}>{eyebrow}</p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
      </div>

      <fieldset disabled={!form.ready} className="min-w-0 space-y-5">
        <legend className="sr-only">{title}</legend>

        {children}

        <div className="flex flex-col justify-between gap-4 border-t border-line/70 pt-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-xs leading-5 text-muted">
            {note}
            <span className="mt-1 block">
              Demo only. Search shows a preview of your selections.
            </span>
          </p>

          <button
            type="submit"
            disabled={!form.ready}
            className={cn(PRIMARY_BUTTON, 'w-full shrink-0 sm:w-auto')}
          >
            {form.ready ? submitLabel : 'Preparing dates…'}
            <Icon name="arrow-right" className="size-4" />
          </button>
        </div>
      </fieldset>

      <SearchPreview
        preview={form.preview}
        previewRef={form.previewRef}
        onClose={form.dismissPreview}
      />
    </form>
  );
}
