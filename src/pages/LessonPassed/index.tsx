import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import Api from "@/lib/api";
import { useShowToast } from "@/store/toast";
import { normaliseDate, setIdIfObject } from "@/lib/tools";
import { useForm } from "@/hooks/useForm";
import { numberEditor } from "@/lib/editors";
import { extractModuleEntity } from "@/lib/api/module";
import { useFindAll } from "@/hooks/query/getAll";
import { InputNumber } from "primereact/inputnumber";
import { Discipline, Lesson } from "@/lib/api/entities";
import { LessonPassed } from "@/lib/api/entities/lessonpassed";
import { Calendar } from "primereact/calendar";

const module = Api.instance.lessonPassed;
type ModuleEntity = extractModuleEntity<typeof module>;

export default function LessonPassedPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const { data: discipline } = useFindAll(Api.instance.discipline);
  const { data: lessons } = useFindAll(Api.instance.lesson);
  const [visible, setVisible] = useState(false);
  const [lessonsNormalise, setLessonsNormalise] = useState<LessonPassed[]>([]);

  useEffect(() => {
    const update = async () => {
      if (data) {
        const list: typeof lessonsNormalise = [];
        const promises = data.map(async (lessonpassed) => {
          const lesson = await Api.instance.lesson.get({
            id: lessonpassed.lesson,
          });

          lesson.discipline = await Api.instance.discipline.get({
            id: lesson.discipline,
          });

          list.push({ ...lessonpassed, lesson });
        });

        await Promise.all(promises);

        setLessonsNormalise(list);
      }
    };
    update();
  }, [data?.length]);

  const form = useForm<Omit<ModuleEntity, "id">>({
    lesson: -1,
    date: "",
  });

  const normaliseData = (data: ModuleEntity) => {
    setIdIfObject(data, "lesson");
    data.date = normaliseDate(new Date(data.date));
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
          header="Добавить проведенное занятие"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-row gap-3 mb-2">
            <div className="flex flex-column gap-2">
              <label className="flex flex-column gap-2">
                Занятие
                <Dropdown
                  options={lessons!.map((lesson) => {
                    const value = lesson.id;
                    const label = discipline?.find(
                      (dis) => dis.id == lesson.discipline
                    )?.name;
                    return { value, label };
                  })}
                  {...form.handle("lesson")}
                />
              </label>
              <label className="flex flex-column gap-2">
                Дата
                <Calendar {...form.handle("date")} dateFormat="dd.mm.yy" />
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
          header="Занятие"
          field="lesson"
          body={(entity: ModuleEntity) => {
            const lesson = lessonsNormalise?.find(
              (value) => value.id === entity.id
            )?.lesson as Lesson;
            if (lesson) {
              return (lesson.discipline as Discipline).name;
            }
          }}
        />
        <Column
          header="Дата"
          field="group"
          body={(entity: ModuleEntity) =>
            new Date(entity.date).toLocaleDateString()
          }
        />

        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </main>
  );
}
