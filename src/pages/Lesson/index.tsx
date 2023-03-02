import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import Api from "@/lib/api";
import { useShowToast } from "@/store/toast";
import { setIdIfObject } from "@/lib/tools";
import { useForm } from "@/hooks/useForm";
import { numberEditor } from "@/lib/editors";
import { extractModuleEntity } from "@/lib/api/module";
import { useFindAll } from "@/hooks/query/getAll";
import { InputNumber } from "primereact/inputnumber";

const module = Api.instance.lesson;
type ModuleEntity = extractModuleEntity<typeof module>;

const lessonType = [
  "Лекции",
  "Семинары",
  "Лабораторные работы",
  "Консультации",
  "Курсовые работы",
];

export default function LessonPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const { data: discpline } = useFindAll(Api.instance.discipline);
  const { data: group } = useFindAll(Api.instance.group);
  const { data: semester } = useFindAll(Api.instance.semester);
  const { data: teacher } = useFindAll(Api.instance.teacher);
  const [visible, setVisible] = useState(false);
  const form = useForm<Omit<ModuleEntity, "id">>({
    discipline: -1,
    group: -1,
    teacher: -1,
    semester: -1,
    type: "",
    hours: 0,
  });

  const normaliseData = (data: ModuleEntity) => {
    setIdIfObject(data, "discipline", "group", "semester", "teacher");
    return data;
  };

  const create = async () => {
    const data = normaliseData(form.data as ModuleEntity);
    await module.create(data);
    await refetch();
    setVisible(false);
  };

  const header = () => {
    return (
      <div>
        <Button
          label="Добавить"
          icon="pi pi-plus"
          size="small"
          onClick={() => setVisible(true)}
        />
        <Dialog
          header="Добавить занятие"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-row gap-3 mb-2">
            <div className="flex flex-column gap-2">
              <label className="flex flex-column gap-2">
                Дисциплина
                <Dropdown
                  optionLabel="name"
                  options={discpline}
                  {...form.handle("discipline")}
                />
              </label>
              <label className="flex flex-column gap-2">
                Группа
                <Dropdown
                  optionLabel="name"
                  options={group}
                  {...form.handle("group")}
                />
              </label>
              <label className="flex flex-column gap-2">
                Преподаватель
                <Dropdown
                  options={teacher?.map((teacher) => ({
                    value: teacher.id,
                    label: `${teacher.last_name} ${teacher.first_name[0]}.${teacher.second_name[0]}.`,
                  }))}
                  {...form.handle("teacher")}
                />
              </label>
              <label className="flex flex-column gap-2">
                Семстер
                <Dropdown
                  optionLabel="year"
                  {...form.handle("semester")}
                  options={semester}
                />
              </label>
            </div>
            <div className="flex flex-column gap-2">
              <label className="flex flex-column gap-2">
                Вид занятия
                <Dropdown {...form.handle("type")} options={lessonType} />
              </label>
              <label className="flex flex-column gap-2">
                Количество часов
                <InputNumber
                  value={form.getValue("hours")}
                  onValueChange={(e) => form.setValue("hours", e.value!)}
                />
              </label>
            </div>
          </div>
          <Button onClick={create}>Создать</Button>
        </Dialog>
      </div>
    );
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const newData = normaliseData(e.newData as ModuleEntity);
    try {
      await module.update(newData.id, newData);
      await refetch();
    } catch (e) {
      if (e instanceof Error)
        toast({
          severity: "error",
          summary: "Error",
          detail: e.message,
        });
    }
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
        <Column field="id" header="№" style={{ maxWidth: "2em" }} />
        <Column
          header="Дисциплина"
          field="discipline"
          body={(entity: ModuleEntity) =>
            discpline?.find((value) => value.id === entity.discipline)?.name
          }
        />
        <Column
          header="Группа"
          field="group"
          body={(entity: ModuleEntity) =>
            group?.find((value) => value.id === entity.group)?.name
          }
        />
        <Column
          header="Преподователь"
          field="teacher"
          body={(entity: ModuleEntity) => {
            const t = teacher?.find((value) => value.id === entity.teacher)!;
            if (t)
              return `${t.last_name} ${t.first_name[0]}.${t.second_name[0]}.`;
          }}
        />
        <Column
          header="Семестр"
          field="semester"
          body={(entity: ModuleEntity) =>
            semester?.find((value) => value.id === entity.semester)?.year
          }
        />
        <Column header="Вид" field="type" />
        <Column header="Часы" field="hours" editor={numberEditor} />
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </main>
  );
}
