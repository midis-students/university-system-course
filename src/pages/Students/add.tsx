import { useForm } from "@/hooks/useForm";
import { getCathedras, getGroups, request } from "@/lib/api";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { normaliseDate } from "@/lib/tools";
import { useNavigate } from "react-router-dom";

export default function StudentAddPage() {
  const navigate = useNavigate();
  const [cathedraList, setCathedraList] = useState<any[]>([]);
  const [groupList, setGroupList] = useState<any[]>([]);
  const [course, setCourse] = useState(1);
  const [cathedra, setCathedra] = useState(-1);

  const form = useForm({
    first_name: "",
    last_name: "",
    second_name: "",
    birth_date: new Date(),
    group: 0,
    sex: false,
  });

  useEffect(() => {
    getCathedras(100, 0).then((data) =>
      setCathedraList(
        data.map((cathedra) => ({ label: cathedra.name, value: cathedra.id }))
      )
    );
  }, []);

  useEffect(() => {
    getGroups(100, 0).then((data) => {
      setGroupList(
        data
          .filter(
            (value) => value.course == course && value.cathedra_id == cathedra
          )
          .map((data) => ({ label: data.name, value: data.id }))
      );
    });
  }, [course, cathedra]);

  const add = async () => {
    const { data } = form;
    const [last] = await request(
      "addStudent",
      data.first_name,
      data.last_name,
      data.second_name,
      data.sex,
      normaliseDate(data.birth_date),
      data.group
    );
    if ("id" in last) {
      navigate("/students/" + last.id);
    }
  };

  return (
    <Card title="Добавить студента">
      <form action="#" className="flex gap-8">
        <div className="w-2 flex flex-column gap-3">
          <label className="flex flex-column gap-2">
            Фамилия
            <InputText {...form.handle("last_name")} />
          </label>
          <label className="flex flex-column gap-2">
            Имя
            <InputText {...form.handle("first_name")} />
          </label>
          <label className="flex flex-column gap-2">
            Отчество
            <InputText {...form.handle("second_name")} />
          </label>
          <label className="flex flex-column gap-2">
            Дата рождения
            <Calendar {...form.handle("birth_date")} />
          </label>
          <label className="flex flex-column gap-2">
            Пол
            <div className="flex gap-3">
              <label className="flex gap-1 align-items-center">
                <RadioButton
                  name="sex"
                  value="0"
                  onChange={(e) => form.setValue("sex", e.value)}
                  checked={form.getValue("sex") == false}
                />
                Муж.
              </label>
              <label className="flex gap-1 align-items-center">
                <RadioButton
                  name="sex"
                  value="1"
                  onChange={(e) => form.setValue("sex", e.value)}
                  checked={form.getValue("sex") == true}
                />
                Жен.
              </label>
            </div>
          </label>
        </div>
        <div className="w-2 flex flex-column gap-3">
          <label className="flex flex-column gap-2">
            Кафедра
            <Dropdown
              value={cathedra}
              onChange={(e) => setCathedra(Number(e.target.value))}
              options={cathedraList}
            />
          </label>
          <label className="flex flex-column gap-2">
            Курс
            <InputText
              value={course.toString()}
              onChange={(e) => setCourse(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-column gap-2">
            Группа
            <Dropdown {...form.handle("group")} options={groupList} />
          </label>
        </div>
      </form>
      <div className="flex justify-content-end">
        <Button label="Добавить" onClick={add} />
      </div>
    </Card>
  );
}
