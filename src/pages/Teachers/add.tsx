import { useForm } from '@/hooks/useForm';
import { getCathedras, request } from '@/lib/api';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from 'primereact/radiobutton';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { normaliseDate, phoneNormalise } from '@/lib/tools';

const degrees = ['Ассистент', 'Преподователь', 'Старшие преподователи', 'Доценты', 'Профессора'];

export default function TeacherAddPage() {
  const [cathedraList, setCathedraList] = useState<any[]>([]);

  const form = useForm({
    first_name: '',
    last_name: '',
    second_name: '',
    birth_date: new Date(),
    cathedra: -1,
    degree: '',
    sex: false,
    phone: '',
    salary: 0,
  });

  useEffect(() => {
    getCathedras(100, 0).then((data) => {
      setCathedraList(data.map((cathedra) => ({ label: cathedra.name, value: cathedra.id })));
    });
  }, []);

  const add = async () => {
    const { data } = form;
    const result = await request(
      'addTeacher',
      data.first_name,
      data.last_name,
      data.second_name,
      data.sex,
      normaliseDate(data.birth_date),
      phoneNormalise(data.phone),
      data.degree,
      Number(data.salary),
      data.cathedra,
    );
    console.log(result);
  };

  return (
    <Card title="Добавить преподавателя">
      <form action="#" className="flex gap-8">
        <div className="w-2 flex flex-column gap-3">
          <label className="flex flex-column gap-2">
            Фамилия
            <InputText {...form.handle('last_name')} />
          </label>
          <label className="flex flex-column gap-2">
            Имя
            <InputText {...form.handle('first_name')} />
          </label>
          <label className="flex flex-column gap-2">
            Отчество
            <InputText {...form.handle('second_name')} />
          </label>
          <label className="flex flex-column gap-2">
            Дата рождения
            <Calendar {...form.handle('birth_date')} />
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
        </div>
        <div className="w-2 flex flex-column gap-3">
          <label className="flex flex-column gap-2">
            Кафедра
            <Dropdown {...form.handle('cathedra')} options={cathedraList} />
          </label>
          <label className="flex flex-column gap-2">
            Должность
            <Dropdown {...form.handle('degree')} options={degrees} />
          </label>
          <label className="flex flex-column gap-2">
            Номер телефона
            <InputMask {...form.handle('degree')} mask="+7 (999) 999-9999" />
          </label>
          <label className="flex flex-column gap-2">
            Зарплата
            <InputText {...form.handle('salary')} />
          </label>
        </div>
      </form>
      <div className="flex justify-content-end">
        <Button label="Добавить" onClick={add} />
      </div>
    </Card>
  );
}
