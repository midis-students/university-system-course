import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dialog } from "primereact/dialog";
import Api from "@/lib/api";
import { useShowToast } from "@/store/toast";
import { phoneFormat, phoneNormalise } from "@/lib/tools";
import { useForm } from "@/hooks/useForm";
import { textEditor } from "@/lib/editors";
import { useFindAll } from "@/hooks/query/getAll";
import { extractModuleEntity } from "@/lib/api/module";

const module = Api.instance.cathedra;
type ModuleEntity = extractModuleEntity<typeof module>;

export default function CathedraPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const [visible, setVisible] = useState(false);

  const form = useForm<Omit<ModuleEntity, "id">>({
    name: "",
    phone: "",
  });

  const create = async () => {
    const { data } = form;

    data.phone = phoneNormalise(data.phone);

    if (data.name && data.phone.length == 12) {
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
          header="Добавить кафедру"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-column gap-2">
            <label className="flex flex-column gap-2">
              Название
              <InputText placeholder="Кафедра - " {...form.handle("name")} />
            </label>
            <label className="flex flex-column gap-2">
              Номер телефона
              <InputMask
                mask="+7 (999) 999-9999"
                placeholder="+7 (999) 999-9999"
                {...form.handle("phone")}
              />
            </label>
            <Button onClick={create}>Создать</Button>
          </div>
        </Dialog>
      </div>
    );
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const newData = e.newData as ModuleEntity;
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
          field="phone"
          header="Телефон"
          body={(value) => phoneFormat(value.phone)}
          editor={textEditor}
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
