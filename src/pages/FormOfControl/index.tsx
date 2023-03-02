import { useState } from "react";
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

const module = Api.instance.formOfControl;
type ModuleEntity = extractModuleEntity<typeof module>;

const formOfControl = ["Зачет", "Экзамен", "Курсовая"];

export default function FormOfControlPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const { data: discipline } = useFindAll(Api.instance.discipline);
  const [visible, setVisible] = useState(false);

  const form = useForm<Omit<ModuleEntity, "id">>({
    type: "",
    discipline: -1,
  });

  const normaliseData = (data: ModuleEntity) => {
    setIdIfObject(data, "discipline");
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
              Вид
              <Dropdown options={formOfControl} {...form.handle("type")} />
            </label>
            <label className="flex flex-column gap-2">
              Дисциплина
              <Dropdown
                optionLabel="name"
                {...form.handle("discipline")}
                options={discipline}
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
          field="type"
          header="Вид контроля"
          editor={optionEditor(formOfControl, "")}
        />
        <Column
          header="Дисциплина"
          field="discipline"
          body={(entity: ModuleEntity) =>
            discipline?.find((value) => value.id === entity.discipline)?.name
          }
          editor={optionEditor(discipline!)}
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
