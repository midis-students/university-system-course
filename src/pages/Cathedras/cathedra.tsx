import { TabView, TabPanel } from 'primereact/tabview';
import { useQueryExt } from '@/hooks/query/QueryExt';
import {
  getCathedraById,
  getGroupByCathedra,
  getStudentsByCathedra,
  getTeachersByCathedra,
} from '@/lib/api';
import { Cathedra, Student, Teacher } from '@/lib/api/types';
import { useNavigate, useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function CathedraPage() {
  const { cathedraId } = useParams();
  const { data, isLoading, isSuccess } = useQueryExt<Cathedra[]>({
    queryFn: () => getCathedraById(Number(cathedraId), 1, 0),
    queryKey: ['cathedra', cathedraId],
  });

  if (isLoading) return <>Loading...</>;
  if (!isSuccess) return <>Oops error</>;

  const [cathedra] = data;

  return (
    <div className="card">
      <h1>{cathedra.name}</h1>
      <TabView>
        <TabPanel header="Группы">
          <TabGroup cathedra={Number(cathedraId)} count={cathedra.groups_count} />
        </TabPanel>
        <TabPanel header="Преподаватели">
          <TabTeachers cathedra={Number(cathedraId)} count={cathedra.teachers_count} />
          count={0}
        </TabPanel>
        <TabPanel header="Студенты">
          <TabStudents cathedra={Number(cathedraId)} count={cathedra.students_count} />
        </TabPanel>
      </TabView>
    </div>
  );
}

type TabPageType = {
  cathedra: number;
  count: number;
};

function TabGroup({ cathedra, count }: TabPageType) {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt({
    queryFn: () => getGroupByCathedra(cathedra, count, 0),
    queryKey: ['teachers', 'cathedra', cathedra],
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
      <Column header="Название" field="name" />
      <Column field="student_count" header="Кол-во студентов" />
      <Column
        headerStyle={{ width: '10%' }}
        body={(value) => (
          <Button
            icon="pi pi-fw pi-external-link"
            label="Открыть"
            size="small"
            text
            style={{ width: '100%' }}
            onClick={() => navigate('/groups/' + value.id)}
          />
        )}
      />
    </DataTable>
  );
}

function TabTeachers({ cathedra, count }: TabPageType) {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt({
    queryFn: () => getTeachersByCathedra(cathedra, count, 0),
    queryKey: ['teachers', 'cathedra', cathedra],
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
      <Column
        header="ФИО"
        body={(value: Teacher) => `${value.last_name} ${value.first_name} ${value.second_name}`}
      />
      <Column field="degree" header="Должность" />
      <Column
        headerStyle={{ width: '10%' }}
        body={(value) => (
          <Button
            icon="pi pi-fw pi-external-link"
            label="Открыть"
            size="small"
            text
            style={{ width: '100%' }}
            onClick={() => navigate('/teachers/' + value.id)}
          />
        )}
      />
    </DataTable>
  );
}

function TabStudents({ cathedra, count }: TabPageType) {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt<Student[]>({
    queryFn: () => getStudentsByCathedra(cathedra, count, 0),
    queryKey: ['student', 'cathedra', cathedra],
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
      <Column
        header="ФИО"
        body={(value: Student) => `${value.last_name} ${value.first_name} ${value.second_name}`}
      />
      <Column
        headerStyle={{ width: '10%' }}
        body={(value) => (
          <Button
            icon="pi pi-fw pi-external-link"
            label="Открыть"
            size="small"
            text
            style={{ width: '100%' }}
            onClick={() => navigate('/student/' + value.id)}
          />
        )}
      />
    </DataTable>
  );
}
