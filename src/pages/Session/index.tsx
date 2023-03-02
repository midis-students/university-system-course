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
import { Discipline, FormOfControl } from "@/lib/api/entities";

const module = Api.instance.session;
type ModuleEntity = extractModuleEntity<typeof module>;

export default function SessionPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const { data: semester } = useFindAll(Api.instance.semester);
  const { data: formOfControl } = useFindAll(Api.instance.formOfControl);
  const [visible, setVisible] = useState(false);
  const [formOfControlNormalise, setFormOfControlNormalise] = useState<
    FormOfControl[]
  >([]);

  useEffect(() => {
    const update = async () => {
      if (!formOfControl) return;

      const list: typeof formOfControlNormalise = [];

      const promises = formOfControl.map(async (form) => {
        const discipline = await Api.instance.discipline.get({
          id: form.discipline,
        });
        list.push({ ...form, discipline });
      });

      await Promise.all(promises);

      setFormOfControlNormalise(list);
    };
    update();
  }, [formOfControl?.length]);

  const form = useForm<Omit<ModuleEntity, "id">>({
    semester: -1,
    form_of_control: -1,
  });

  const normaliseData = (data: ModuleEntity) => {
    setIdIfObject(data, "semester", "form_of_control");
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
          header="Добавить форму контроля"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-column gap-2">
            <label className="flex flex-column gap-2">
              Семестр
              <Dropdown
                optionLabel="year"
                options={semester}
                {...form.handle("semester")}
              />
            </label>
            <label className="flex flex-column gap-2">
              Форма контроля
              <Dropdown
                {...form.handle("form_of_control")}
                options={formOfControlNormalise?.map((form) => ({
                  value: form.id,
                  label: `${(form.discipline as Discipline).name} - ${
                    form.type
                  }`,
                }))}
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
          header="Форма контроля"
          body={(entity: ModuleEntity) => {
            const form = formOfControlNormalise?.find(
              (value) => value.id === entity.form_of_control
            );
            if (form)
              return `${(form.discipline as Discipline).name} - ${form.type}`;
          }}
          editor={optionEditor(formOfControlNormalise!, "")}
        />
        <Column
          header="Семестр"
          field="semester"
          body={(entity: ModuleEntity) =>
            semester?.find((value) => value.id === entity.semester)?.year
          }
          editor={optionEditor(semester!)}
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
