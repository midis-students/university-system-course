import { useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useQueryExt } from '@/hooks/query/findOne';
import { getGroup, getStudentsByGroup } from '@/lib/api';
import { Group, Student } from '@/lib/api/types';

export default function GroupPage() {
  const { groupId } = useParams();
  const { data, isLoading, isSuccess } = useQueryExt<Group[]>({
    queryFn: () => getGroup(Number(groupId), 25, 0),
    queryKey: ['group', groupId],
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (!isSuccess) return <h2>Opps, error :</h2>;
  const [group] = data;

  return (
    <div>
      <h1>{group.name}</h1>
      <h2>{group.cathedra}</h2>
      <Panel header={'Количество студентов: ' + group.student_count}>
        <StudentList group={group.id} />
      </Panel>
    </div>
  );
}

function StudentList({ group }: { group: number }) {
  const { data, isLoading } = useQueryExt<Student[]>({
    queryFn: () => getStudentsByGroup(group, 25, 0),
    queryKey: ['student'],
  });

  return (
    <DataTable value={data} loading={isLoading}>
      <Column
        header="ФИО"
        body={(value: Student) => `${value.last_name} ${value.first_name} ${value.second_name}`}
      />
      <Column header="Пол" body={(value: Student) => (value.sex ? 'Ж' : 'М')} />
      <Column
        header="День рождения"
        body={(value: Student) => new Date(value.birth_date).toLocaleDateString()}
      />
    </DataTable>
  );
}
