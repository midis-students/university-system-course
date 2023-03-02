import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import Api from "@/lib/api";
import { useShowToast } from "@/store/toast";
import { useForm } from "@/hooks/useForm";
import { Dropdown } from "primereact/dropdown";
import { numberEditor, optionEditor, textEditor } from "@/lib/editors";
import { useFindAll } from "@/hooks/query/getAll";
import { extractModuleEntity } from "@/lib/api/module";
import { setIdIfObject } from "@/lib/tools";
import { useFindOne } from "@/hooks/query/findOne";
import { Discipline, FormOfControl, Student } from "@/lib/api/entities";
import { SessionResult } from "@/lib/api/entities/sessionresult";
import { Session } from "@/lib/api/entities/session";

const module = Api.instance.sessionResult;
type ModuleEntity = extractModuleEntity<typeof module>;

type SessionResultExt = {
  student: Student;
  discipline: Discipline;
  session: Session;
  formOfControl: FormOfControl;
};

export default function SessionResultPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const { data: students } = useFindAll(Api.instance.student);
  const { data: sessions } = useFindAll(Api.instance.session);
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState<SessionResultExt[]>([]);

  useEffect(() => {
    const update = async () => {
      if (!data) return;

      const list: typeof result = [];

      const promises = data.map(async (form) => {
        const session = await Api.instance.session.get({
          id: form.session,
        });

        const formOfControl = await Api.instance.formOfControl.get({
          id: session.form_of_control,
        });
        const discipline = await Api.instance.discipline.get({
          id: formOfControl.discipline,
        });
        const student = await Api.instance.student.get({ id: form.student });

        list.push({
          student,
          discipline,
          session,
          formOfControl,
        });
      });

      await Promise.all(promises);

      setResult(list);
    };
    update();
  }, [data?.length]);

  const form = useForm<Omit<ModuleEntity, "id">>({
    mark: 0,
    session: -1,
    student: -1,
  });

  const normaliseData = (data: ModuleEntity) => {
    setIdIfObject(data, "session", "student");
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
          header="Добавить результат сессии"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-column gap-2">
            <label className="flex flex-column gap-2">
              Сессия
              <Dropdown
                options={result.map((value) => ({
                  value: value.session.id,
                  label: `${value.discipline.name} - ${value.formOfControl.type}`,
                }))}
                {...form.handle("session")}
              />
            </label>
            <label className="flex flex-column gap-2">
              Студент
              <Dropdown
                {...form.handle("student")}
                options={students?.map((form) => ({
                  value: form.id,
                  label: `${form.last_name} ${form.first_name}.${form.second_name}.`,
                }))}
              />
            </label>
            <label className="flex flex-column gap-2">
              Оценка
              <InputNumber
                value={form.getValue("mark")}
                onValueChange={(e) => form.setValue("mark", e.value!)}
              />
            </label>
            <Button onClick={create}>Создать</Button>
          </div>
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
          field="formofcontrol"
          header="Сессия"
          body={(entity: ModuleEntity) => {
            const session = result?.find(
              (value) => value.session.id === entity.session
            );
            if (session)
              return `${session.discipline.name} - ${session.formOfControl.type}`;
          }}
        />
        <Column
          header="Студент"
          field="student"
          body={(entity: ModuleEntity) => {
            const student = students?.find(
              (value) => value.id === entity.student
            );
            if (student) {
              return `${student.last_name} ${student.first_name[0]}.${student.second_name[0]}.`;
            }
          }}
        />
        <Column header="Оценка" field="mark" editor={numberEditor} />
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </main>
  );
}
