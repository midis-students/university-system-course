import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Api from "@/lib/api";
import { Cathedra } from "@/lib/api/entities";
import { useShowToast } from "@/store/toast";
import { useForm } from "@/hooks/useForm";
import { textEditor } from "@/lib/editors";
import { useFindAll } from "@/hooks/query/getAll";
import { extractModuleEntity } from "@/lib/api/module";

const module = Api.instance.discipline;
type ModuleEntity = extractModuleEntity<typeof module>;

export default function DisciplinePage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const [visible, setVisible] = useState(false);

  const form = useForm<Omit<ModuleEntity, "id">>({
    name: "",
  });
  const create = async () => {
    const { data } = form;
    if (data.name) {
      await module.create(data);
      await refetch();
      setVisible(false);
    }
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
          header="Добавить дисциплину"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-column gap-2">
            <label className="flex flex-column gap-2">
              Название
              <InputText placeholder="Дисциплина - " {...form.handle("name")} />
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
        <Column field="name" header="Название" editor={textEditor} />
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </main>
  );
}
