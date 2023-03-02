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

const module = Api.instance.group;
type ModuleEntity = extractModuleEntity<typeof module>;

export default function GroupPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const { data: cathedras } = useFindAll(Api.instance.cathedra);
  const [visible, setVisible] = useState(false);

  const form = useForm<Omit<ModuleEntity, "id">>({
    name: "",
    cathedra: -1,
    course: 1,
  });

  const normaliseData = (data: ModuleEntity) => {
    if (typeof data.cathedra === "object") {
      data.cathedra = data.cathedra.id;
    }
    console.log(data);
    return data;
  };

  const create = async () => {
    const data = normaliseData(form.data as ModuleEntity);

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
          header="Добавить группу"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-column gap-2">
            <label className="flex flex-column gap-2">
              Название
              <InputText placeholder="Группа - " {...form.handle("name")} />
            </label>
            <label className="flex flex-column gap-2">
              Кафедра
              <Dropdown
                optionLabel="name"
                {...form.handle("cathedra")}
                options={cathedras}
              />
            </label>
            <label className="flex flex-column gap-2">
              Курс
              <InputNumber placeholder="курс - " {...form.handle("course")} />
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
        <Column field="name" header="Название" editor={textEditor} />
        <Column field="course" header="Курс" editor={numberEditor} />
        <Column
          header="Кафедра"
          field="cathedra"
          body={(value: ModuleEntity) => cathedras![+value.cathedra].name}
          editor={optionEditor(cathedras!)}
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
