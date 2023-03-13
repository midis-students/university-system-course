import { useQueryExt } from '@/hooks/query/QueryExt';
import { getCathedras } from '@/lib/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';

export default function CathedraListPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt({
    queryFn: () => getCathedras(25, 0),
  });

  return (
    <div className="card">
      <h1>Список кафедр</h1>
      <DataTable value={data} loading={isLoading} showGridlines stripedRows size="small">
        <Column field="id" header="№" />
        <Column field="name" header="Название" />
        <Column field="groups_count" header="Кол-во групп" />
        <Column field="students_count" header="Кол-во студентов" />
        <Column
          headerStyle={{ width: '10%' }}
          body={(value) => (
            <Button
              icon="pi pi-fw pi-external-link"
              label="Открыть"
              size="small"
              text
              style={{ width: '100%' }}
              onClick={() => navigate('/cathedras/' + value.id)}
            />
          )}
        />
      </DataTable>
    </div>
  );
}
