
import { Calendar } from "primereact/calendar";
import { ColumnEditorOptions } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export const dateEditor = (options: ColumnEditorOptions) => (
  <Calendar
    value={options.value}
    dateFormat="dd.mm.yy"
    style={{ width: "90%" }}
    onChange={(e) => options.editorCallback?.(e.target.value)}
  />
);

export const textEditor = (options: ColumnEditorOptions) => (
  <InputText
    type="text"
    value={options.value}
    style={{ width: "90%" }}
    onChange={(e) => options.editorCallback?.(e.target.value)}
  />
);

export const numberEditor = (options: ColumnEditorOptions) => (
  <InputNumber
    type="number"
    value={options.value}
    style={{ width: "90%" }}
    onValueChange={(e) => options.editorCallback?.(e.value)}
  />
);

export const optionEditor =
  (list: any[], key = "name") =>
  (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        optionLabel={key}
        style={{ width: "90%" }}
        value={options.value}
        onChange={(e) => options.editorCallback?.(e.value)}
        options={list}
      />
    );
  };
