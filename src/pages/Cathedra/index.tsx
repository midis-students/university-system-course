import { useAllCathedras } from "@/hooks/query/cathedra";
import { Cathedra } from "@/lib/api/type";
import { Column, ColumnEditorOptions } from "primereact/column";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Api from "@/lib/api";
import { useShowToast } from "@/store/toast";
import { TOAST_LIFE } from "@/config/toast";

export default function CathedraPage() {
  const toast = useShowToast();
  const { data, isLoading } = useAllCathedras();
  const client = useQueryClient();

  const header = () => {
    return (
      <div>
        <Button label="Добавить" icon="pi pi-plus" size="small" />
      </div>
    );
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const newData = e.newData as Cathedra;
    try {
      const result = await Api.instance.cathedra.update(newData.id, newData);
      await client.invalidateQueries({ queryKey: ["cathedra"] });
    } catch (e) {
      if (e instanceof Error)
        toast({
          severity: "error",
          summary: "Error",
          detail: e.message,
          life: TOAST_LIFE,
        });
    }
  };

  const editor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        style={{ width: "90%" }}
        onChange={(e) => options.editorCallback?.(e.target.value)}
      />
    );
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
        <Column field="name" header="Название" editor={editor} />
        <Column field="phone" header="Телефон" editor={editor} />
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </main>
  );
}
