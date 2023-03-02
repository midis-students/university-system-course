import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import Api from "@/lib/api";
import { useShowToast } from "@/store/toast";
import { normaliseDate, phoneFormat } from "@/lib/tools";
import { useForm } from "@/hooks/useForm";
import { dateEditor, optionEditor, textEditor } from "@/lib/editors";
import { extractModuleEntity } from "@/lib/api/module";
import { useFindAll } from "@/hooks/query/getAll";

const module = Api.instance.student;
type ModuleEntity = extractModuleEntity<typeof module>;

export default function StudentPage() {
  const toast = useShowToast();
  const { data, isLoading, refetch } = useFindAll(module);
  const { data: groups } = useFindAll(Api.instance.group);
  const [visible, setVisible] = useState(false);
  const form = useForm<Omit<ModuleEntity, "id">>({
    first_name: "",
    last_name: "",
    second_name: "",
    sex: false,
    birth_date: "",
    group: 0,
  });

  const normaliseData = (data: ModuleEntity) => {
    if (typeof data.group === "object") {
      data.group = data.group.id;
    }
    data.birth_date = normaliseDate(new Date(data.birth_date));

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
          header="Добавить студента"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-row gap-3 mb-2">
            <div className="flex flex-column gap-2">
              <label className="flex flex-column gap-2">
                Имя
                <InputText {...form.handle("first_name")} />
              </label>
              <label className="flex flex-column gap-2">
                Фамилия
                <InputText {...form.handle("last_name")} />
              </label>
              <label className="flex flex-column gap-2">
                Отчество
                <InputText {...form.handle("second_name")} />
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
              <label className="flex flex-column gap-2">
                Дата рождения
                <Calendar
                  {...form.handle("birth_date")}
                  dateFormat="dd.mm.yy"
                />
              </label>
            </div>
            <div className="flex flex-column gap-2">
              <label className="flex flex-column gap-2">
                Группа
                <Dropdown
                  optionLabel="name"
                  {...form.handle("group")}
                  options={groups}
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
        <Column header="Имя" field="first_name" editor={textEditor} />
        <Column header="Фамилия" field="last_name" editor={textEditor} />
        <Column header="Отчество" field="second_name" editor={textEditor} />
        <Column
          header="Пол"
          field="sex"
          editor={textEditor}
          body={(value: ModuleEntity) => (value.sex ? "Ж" : "M")}
        />
        <Column
          header="День рождения"
          field="birth_date"
          editor={dateEditor}
          body={(value: ModuleEntity) =>
            new Date(value.birth_date).toLocaleDateString()
          }
        />

        <Column
          header="Группа"
          field="group"
          body={(value: ModuleEntity) =>
            groups?.find((group) => group.id === value.group)?.name
          }
          editor={optionEditor(groups!)}
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
