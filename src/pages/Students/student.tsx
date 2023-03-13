import BlockInfo from '@/components/BlockInfo';
import { useQueryExt } from '@/hooks/query/QueryExt';
import { getLessonsByGroup, getSessionByStudent, getStudent } from '@/lib/api';
import { Student } from '@/lib/api/types';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { TabPanel, TabView } from 'primereact/tabview';
import { Link, useParams } from 'react-router-dom';

export default function StudentPage() {
  const { studentId } = useParams();
  const { data, isLoading, isSuccess } = useQueryExt<Student[]>({
    queryFn: () => getStudent(Number(studentId)),
    queryKey: ['student', studentId],
  });

  if (isLoading) return <>Loading...</>;
  if (!isSuccess) return <>Oops error</>;

  const [student] = data;

  return (
    <Card title={`${student.last_name} ${student.first_name} ${student.second_name}`}>
      <p className="m-0">
        <BlockInfo title="Кафедра">
          <Link to={`/cathedras/${student.cathedra}`}>{student.cathedra_name}</Link>
        </BlockInfo>
        <BlockInfo title="Группа">
          <Link to={`/groups/${student.group}`}>{student.group_name}</Link>
        </BlockInfo>
        <BlockInfo title="Курс">{student.course}</BlockInfo>
        <BlockInfo title="Пол">{student.sex ? 'Женский' : 'Мужской'}</BlockInfo>
        <BlockInfo title="День рождения">
          {new Date(student.birth_date).toLocaleDateString()}
        </BlockInfo>
      </p>
      <p>
        <TabView>
          <TabPanel header="Успеваемость">
            <StudentSession studentId={Number(studentId)} />
          </TabPanel>
        </TabView>
      </p>
    </Card>
  );
}

function StudentSession({ studentId }: { studentId: number }) {
  const { data, isLoading } = useQueryExt({
    queryFn: () => getSessionByStudent(studentId),
    queryKey: ['student', 'session', studentId],
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
      <Column field="name" header="Дисциплина" />
      <Column field="semester" header="Семестр" />
      <Column field="mark" header="Оценка" />
    </DataTable>
  );
}
