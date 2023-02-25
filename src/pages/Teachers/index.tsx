import { useState } from 'react';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dialog } from 'primereact/dialog';
import Api from '@/lib/api';
import { Cathedra } from '@/lib/api/entities';
import { useShowToast } from '@/store/toast';
import { useInput } from '@/hooks/useInput';
import { phoneFormat, phoneNormalise } from '@/lib/tools';
import { useAllTeachers } from '@/hooks/query/teachers';

export default function CathedraPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useAllTeachers();
  const [visible, setVisible] = useState(false);
  const nameInput = useInput('');
  const phoneInput = useInput('');

  const create = async () => {
    const { value: name } = nameInput;

    const phone = phoneNormalise(phoneInput.value);

    if (name && phone && phone.startsWith('+7')) {
      await Api.instance.cathedra.create({});
      await refetch();
      setVisible(false);
    }
  };

  const header = () => {
    return (
      <div>
        <Button label="Добавить" icon="pi pi-plus" size="small" onClick={() => setVisible(true)} />
        <Dialog header="Добавить кафедру" visible={visible} onHide={() => setVisible(false)}>
          <div className="flex flex-column gap-2">
            <label className="flex flex-column gap-2">
              Название
              <InputText placeholder="Кафедра - " {...nameInput} />
            </label>
            <label className="flex flex-column gap-2">
              Номер телефона
              <InputMask mask="+7 (999) 999-9999" placeholder="+7 (999) 999-9999" {...phoneInput} />
            </label>
            <Button onClick={create}>Создать</Button>
          </div>
        </Dialog>
      </div>
    );
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const newData = e.newData as Cathedra;
    try {
      await Api.instance.cathedra.update(newData.id, newData);
      await refetch();
    } catch (e) {
      if (e instanceof Error)
        toast({
          severity: 'error',
          summary: 'Error',
          detail: e.message,
        });
    }
  };

  const editor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        style={{ width: '90%' }}
        onChange={(e) => options.editorCallback?.(e.target.value)}
      />
    );
  };

  return (
    <main className="card">
      <DataTable
        value={data}
        header={header}
        showGridlines
        stripedRows
        editMode="row"
        loading={isLoading}
        onRowEditComplete={onRowEditComplete}
      >
        <Column field="id" header="№" style={{ maxWidth: '2em' }} />
        <Column field="name" header="Имя" editor={editor} />
        <Column header="Телефон" body={(value) => phoneFormat(value.phone)} editor={editor} />
        <Column
          rowEditor
          headerStyle={{ width: '10%', minWidth: '8rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
      </DataTable>
    </main>
  );
}
