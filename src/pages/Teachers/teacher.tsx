import { Card } from "primereact/card";
import { useQueryExt } from "@/hooks/query/QueryExt";
import {
  getGroupByTeacher,
  getTeacher,
  getTeachersLoadByTeacher,
} from "@/lib/api";
import { Teacher } from "@/lib/api/types";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { phoneFormat } from "@/lib/tools";
import BlockInfo from "@/components/BlockInfo";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function TeacherPage() {
  const { teacherId } = useParams();
  const { data, isLoading, isSuccess } = useQueryExt<Teacher[]>({
    queryFn: () => getTeacher(Number(teacherId), 1, 0),
    queryKey: ["teacher", teacherId],
  });

  if (isLoading) return <>Loading...</>;
  if (!isSuccess) return <>Oops error</>;

  const [teacher] = data;

  if (!teacher) return <Navigate to="/teachers" />;

  return (
    <Card
      title={`${teacher.last_name} ${teacher.first_name} ${teacher.second_name}`}
      subTitle={teacher.degree}
    >
      <p className="m-0">
        <BlockInfo title="Кафедра">
          <Link to={`/cathedras/${teacher.cathedra_id}`}>
            {teacher.cathedra}
          </Link>
        </BlockInfo>
        <BlockInfo title="Пол">{teacher.sex ? "Женский" : "Мужской"}</BlockInfo>
        <BlockInfo title="Номер телефона">
          {phoneFormat(teacher.phone)}
        </BlockInfo>
        <BlockInfo title="Зарплата">
          {teacher.salary.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </BlockInfo>
        <BlockInfo title="День рождения">
          {new Date(teacher.birth_date).toLocaleDateString()}
        </BlockInfo>
      </p>
      <p>
        <TabView>
          <TabPanel header="Дисциплины">
            <TeacherDiscipline teacherId={Number(teacherId)} />
          </TabPanel>
          <TabPanel header="Группы">
            <TeacherGroups teacherId={Number(teacherId)} />
          </TabPanel>
        </TabView>
      </p>
    </Card>
  );
}

function TeacherDiscipline({ teacherId }: { teacherId: number }) {
  const { data, isLoading } = useQueryExt({
    queryFn: () => getTeachersLoadByTeacher(teacherId, 100, 0),
    queryKey: ["teacher", "discipline"],
  });

  return (
    <DataTable
      value={data}
      loading={isLoading}
      showGridlines
      stripedRows
      size="small"
      paginator
      rows={10}
    >
      <Column field="discipline" header="Дисциплина" />
      <Column field="hours" header="Кол-во часов" />
    </DataTable>
  );
}

function TeacherGroups({ teacherId }: { teacherId: number }) {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt({
    queryFn: () => getGroupByTeacher(teacherId, 100, 0),
    queryKey: ["teacher", "groups"],
  });

  return (
    <DataTable
      value={data}
      loading={isLoading}
      showGridlines
      stripedRows
      size="small"
      paginator
      rows={10}
    >
      <Column field="name" header="Группа" />
      <Column field="course" header="Курс" />
      <Column
        headerStyle={{ width: "10%" }}
        body={(value) => (
          <Button
            icon="pi pi-fw pi-external-link"
            label="Открыть"
            size="small"
            text
            style={{ width: "100%", height: "40%" }}
            onClick={() => navigate("/groups/" + value.id)}
          />
        )}
      />
    </DataTable>
  );
}
