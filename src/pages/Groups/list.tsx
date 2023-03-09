import { useQueryExt } from '@/hooks/query/findOne';
import { getGroups } from '@/lib/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Group } from '@/lib/api/types';

export default function GroupList() {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useQueryExt<Group[]>({
    queryFn: () => getGroups(100, 0),
    queryKey: ['group'],
  });

  const GroupCard = ({ group }: { group: Group }) => {
    return (
      <Card
        title={group.name}
        subTitle={group.cathedra}
        className="col-2"
        footer={
          <div className="flex justify-content-end gap-2">
            <Button
              label="Список"
              text
              size="small"
              onClick={() => navigate('/groups/' + group.id)}
            />
          </div>
        }
      >
        <p className="m-0">
          <div>
            Курс: <span>{group.name.split('-')[1][0]}</span>
          </div>
          <div>
            Студентов: <span>{group.student_count}</span>
          </div>
        </p>
      </Card>
    );
  };

  return (
    <div className="grid gap-4 m-auto justify-content-center">
      {isSuccess && data.map((group) => <GroupCard key={group.id} group={group} />)}
    </div>
  );
}
