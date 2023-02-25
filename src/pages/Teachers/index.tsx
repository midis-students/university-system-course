import { useState } from 'react';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import Api from '@/lib/api';
import { Teacher } from '@/lib/api/entities';
import { useShowToast } from '@/store/toast';
import { normaliseDate, phoneFormat, phoneNormalise } from '@/lib/tools';
import { useAllTeachers } from '@/hooks/query/teachers';
import { useForm } from '@/hooks/useForm';
import { useAllCathedras } from '@/hooks/query/cathedra';

const degrees = ['Ассистент', 'Преподователь', 'Старшие преподователи', 'Доценты', 'Профессора'];

export default function CathedraPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useAllTeachers();
  const { data: cathedras } = useAllCathedras();
  const [visible, setVisible] = useState(false);
  const form = useForm<Omit<Teacher, 'id'>>({
    first_name: '',
    last_name: '',
    second_name: '',
    sex: false,
    birth_date: '',
    degree: '',
    phone: '',
    cathedra: 0,
  });
  type FormData = typeof form.data;

  const normaliseData = (data: Teacher) => {
    data.phone = phoneNormalise(data.phone);
    if (typeof data.cathedra === 'object') {
      data.cathedra = data.cathedra.id;
    }
    data.birth_date = normaliseDate(new Date(data.birth_date));

    return data;
  };

  const create = async () => {
    const data = normaliseData(form.data as Teacher);
    if (data.phone.length === 12) {
      await Api.instance.teacher.create(data);
      await refetch();
      setVisible(false);
    }
  };

  const header = () => {
    return (
      <div>
        <Button label="Добавить" icon="pi pi-plus" size="small" onClick={() => setVisible(true)} />
        <Dialog header="Добавить преподователя" visible={visible} onHide={() => setVisible(false)}>
          <div className="flex flex-row gap-3 mb-2">
            <div className="flex flex-column gap-2">
              <label className="flex flex-column gap-2">
                Имя
                <InputText {...form.handle('first_name')} />
              </label>
              <label className="flex flex-column gap-2">
                Фамилия
                <InputText {...form.handle('last_name')} />
              </label>
              <label className="flex flex-column gap-2">
                Отчество
                <InputText {...form.handle('second_name')} />
              </label>
              <label className="flex flex-column gap-2">
                Пол
                <div className="flex gap-3">
                  <label className="flex gap-1 align-items-center">
                    <RadioButton
                      name="sex"
                      value="0"
                      onChange={(e) => form.setValue('sex', e.value)}
                      checked={form.getValue('sex') == false}
                    />
                    Муж.
                  </label>
                  <label className="flex gap-1 align-items-center">
                    <RadioButton
                      name="sex"
                      value="1"
                      onChange={(e) => form.setValue('sex', e.value)}
                      checked={form.getValue('sex') == true}
                    />
                    Жен.
                  </label>
                </div>
              </label>
              <label className="flex flex-column gap-2">
                Дата рождения
                <Calendar {...form.handle('birth_date')} dateFormat="dd.mm.yy" />
              </label>
            </div>
            <div className="flex flex-column gap-2">
              <label className="flex flex-column gap-2">
                Номер телефона
                <InputMask
                  mask="+7 (999) 999-9999"
                  placeholder="+7 (999) 999-9999"
                  {...form.handle('phone')}
                />
              </label>
              <label className="flex flex-column gap-2">
                Ученная степень
                <Dropdown {...form.handle('degree')} options={degrees} />
              </label>
              <label className="flex flex-column gap-2">
                Кафедра
                <Dropdown optionLabel="name" {...form.handle('cathedra')} options={cathedras} />
              </label>
            </div>
          </div>
          <Button onClick={create}>Создать</Button>
        </Dialog>
      </div>
    );
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const newData = normaliseData(e.newData as Teacher);
    try {
      await Api.instance.teacher.update(newData.id, newData);
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

  const editor = (options: ColumnEditorOptions) => (
    <InputText
      type="text"
      value={options.value}
      style={{ width: '90%' }}
      onChange={(e) => options.editorCallback?.(e.target.value)}
    />
  );

  const degreeEditor = (options: ColumnEditorOptions) => (
    <Dropdown
      value={options.value}
      options={degrees}
      style={{ width: '90%' }}
      onChange={(e) => options.editorCallback?.(e.target.value)}
    />
  );

  const dateEditor = (options: ColumnEditorOptions) => (
    <Calendar
      value={options.value}
      dateFormat="dd.mm.yy"
      style={{ width: '90%' }}
      onChange={(e) => options.editorCallback?.(e.target.value)}
    />
  );

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
        <Column header="Имя" field="first_name" editor={editor} />
        <Column header="Фамилия" field="last_name" editor={editor} />
        <Column header="Отчество" field="second_name" editor={editor} />
        <Column
          header="Пол"
          field="sex"
          editor={editor}
          body={(value: Teacher) => (value.sex ? 'Ж' : 'M')}
        />
        <Column
          header="День рождения"
          field="birth_date"
          editor={dateEditor}
          body={(value: Teacher) => new Date(value.birth_date).toLocaleDateString()}
        />
        <Column
          header="Телефон"
          field="phone"
          body={(value) => phoneFormat(value.phone)}
          editor={editor}
        />
        <Column
          header="Кафедра"
          body={(value: Teacher) => cathedras![+value.cathedra].name}
          editor={editor}
        />
        <Column header="Ученная степень" field="degree" editor={degreeEditor} />
        <Column
          rowEditor
          headerStyle={{ width: '10%', minWidth: '8rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
      </DataTable>
    </main>
  );
}
