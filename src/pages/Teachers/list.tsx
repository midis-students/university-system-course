import { useQueryExt } from '@/hooks/query/QueryExt';
import { getTeachers, getTeachersCount } from '@/lib/api';
import { Teacher } from '@/lib/api/types';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Panel } from 'primereact/panel';
import { useNavigate } from 'react-router-dom';

export default function TeacherListPage() {
  const { data, isSuccess } = useQueryExt({
    queryFn: () => getTeachersCount(),
    queryKey: ['teacher', 'count'],
  });

  if (!isSuccess) return <>loading...</>;

  const count: number = data[0].count;

  return (
    <div className="card">
      <h1>Список преподавателей</h1>
      <Panel header={'Количество: ' + count} className="mt-4">
        <TeacherList count={count} />
      </Panel>
    </div>
  );
}

function TeacherList({ count }: { count: number }) {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt({
    queryFn: () => getTeachers(count, 0),
    queryKey: ['teachers', 'list'],
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
