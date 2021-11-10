import {Button, TextInput} from "@mantine/core";
import {DateRangePicker} from "@mantine/dates";
import {useForm} from "@mantine/hooks";
import {dateIsBetween} from "../../helper/dates";
import dayjs from "dayjs";
import CartItemsTable from "./CartItemsTable";

function CartForm({items, onAddBooking, onDeleteItem}) {
  const form = useForm({
    initialValues: {
      user: '',
      start: null,
      end: null,
      range: [null, null]
    },
    validationRules: {
      user: (value) => (value),
      start: (value) => (value !== null),
      end: (value) => (value !== null),
      range: (value) => (isRangeFree(value))
    },
  });

  const isRangeFree = ([start, end]) => {
    for (let item of items) {
      for (let period of item.lendPeriods) {
        if (dateIsBetween(period.start, dayjs(start), dayjs(end))) return false
        if (dateIsBetween(period.end, dayjs(start), dayjs(end))) return false
      }
    }

    return true
  }

  const isDateFree = (date) => {
    // Is date in the past?
    if (dayjs(date).isBefore(dayjs().subtract(1, 'day'))) return false;

    // Is date element of an existing lend interval?
    for (let item of items) {
      for (let period of item.lendPeriods) {
        if (dateIsBetween(dayjs(date), period.start, period.end)) return false
      }
    }

    return true
  };

  function dataRangeErrorMsg() {
    if (form.errors.start || form.errors.end) return 'Bitte Zeitraum auswählen'
    if (form.errors.range) return 'Im gewählten Zeitraum liegt schon eine Buchung vor.'
    return false
  }

  return (
    <>
      <TextInput
        required
        label="Wer"
        placeholder="Name"
        error={form.errors.user && 'Ein Name ist erforderlich'}
        value={form.values.user}
        onChange={(event) => form.setFieldValue('user', event.currentTarget.value)}
      />
      <DateRangePicker
        required
        label="Zeitraum"
        placeholder="Wähle Ausleih- und Rückgabetag"
        allowSingleDateInRange={true}
        value={[form.values.start, form.values.end]}
        error={dataRangeErrorMsg()}
        excludeDate={(date) => (!isDateFree(date))}
        onChange={val => {
          form.setFieldValue('start', val[0]);
          form.setFieldValue('end', val[1]);
          form.setFieldValue('range', val)
        }}
      />
      <h2>Inventar</h2>
      <CartItemsTable items={items} onDelete={onDeleteItem}/>
      <Button
        onClick={form.onSubmit(values => {
          delete values.range
          onAddBooking(values)
        })}
        className="btn-form"
        type="submit">
        Buchen
      </Button>
    </>
  )
}

export default CartForm
