import {useContext} from "react";
import {useForm} from "@mantine/hooks";
import {Button, TextInput} from "@mantine/core";
import {DataContext} from "../../context/Data";

function NewItemForm({submitCallback}) {
  const {addItemToInventory} = useContext(DataContext);
  const form = useForm({
    initialValues: {
      name: '',
      desc: '',
    },
    validationRules: {
      name: (value) => (value),
    },
  });
  const onSubmit = (item) => {
    addItemToInventory(item);
    submitCallback();
  }

  return(
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        required
        label="Name"
        error={form.errors.name && 'Ein Name ist erforderlich.'}
        value={form.values.name}
        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
      />
      <TextInput
        label="Beschreibung"
        value={form.values.desc}
        onChange={(event) => form.setFieldValue('desc', event.currentTarget.value)}
      />
      <Button className="btn-form" type="submit">Submit</Button>
    </form>
  )
}

export default NewItemForm;
