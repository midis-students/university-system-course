import { Link, useNavigate, useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useQueryExt } from '@/hooks/query/QueryExt';
import { getGroup, getLessonsByGroup, getStudentsByGroup } from '@/lib/api';
import { Group, Student } from '@/lib/api/types';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { TabPanel, TabView } from 'primereact/tabview';

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
    <Card title={group.name} subTitle={group.cathedra}>
      <TabView>
        <TabPanel header="Студенты">
          <StudentList group={group.id} />
        </TabPanel>
        <TabPanel header="Занятия">
          <GroupLesson groupId={group.id} />
        </TabPanel>
      </TabView>
    </Card>
  );
}

function StudentList({ group }: { group: number }) {
  const navigate = useNavigate();
  const { data, isLoading } = useQueryExt<Student[]>({
    queryFn: () => getStudentsByGroup(group, 25, 0),
    queryKey: ['student'],
  });

  return (
    <DataTable value={data} loading={isLoading} showGridlines stripedRows size="small">
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
            onClick={() => navigate('/students/' + value.id)}
          />
        )}
      />
    </DataTable>
  );
}

function GroupLesson({ groupId }: { groupId: number }) {
  const { data, isLoading } = useQueryExt({
    queryFn: () => getLessonsByGroup(groupId),
    queryKey: ['student', 'lesson', groupId],
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
      <Column field="discipline_name" header="Дисциплина" />
      <Column field="lesson_type" header="Вид" />
      <Column
        field="teacher"
        header="Преподаватель"
        body={(value) => <Link to={`/teachers/${value.teacher_id}`}>{value.teacher}</Link>}
      />
    </DataTable>
  );
}
