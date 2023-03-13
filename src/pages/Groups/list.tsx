import { useQueryExt } from '@/hooks/query/QueryExt';
import { getGroups, getGroupsCount } from '@/lib/api';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Count, Group } from '@/lib/api/types';
import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function GroupListPage() {
  const { data, isSuccess } = useQueryExt<Count[]>({
    queryFn: () => getGroupsCount(1, 0),
    queryKey: ['group', 'count'],
  });

  const count = isSuccess ? data[0].count : -1;

  return (
    <div className="card">
      <h1>Список всех групп</h1>
      <Panel header={'Количество: ' + count} className="mt-4">
        <GroupList count={count} />
      </Panel>
    </div>
  );
}

function GroupList({ count }: { count: number }) {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt<Group[]>({
    queryFn: () => getGroups(count, 0),
    queryKey: ['group', 'list'],
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
      <Column field="name" header="Название" />
      <Column field="course" header="Курс" />
      <Column field="cathedra" header="Кафедра" />
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
