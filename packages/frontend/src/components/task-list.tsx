import { TaskStatus } from '@/types/tasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/store/services/api';

export default function TaskList() {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-between p-4 bg-red-100 border border-red-400 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-red-600">Failed to fetch tasks.</h2>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
    <ScrollArea className="p-4 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg shadow-lg">
      <div className="space-y-4">
        {tasks?.map((task) => (
          <Card key={task.id} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{task.title}</CardTitle>
              <div className="flex items-center gap-4">
                <Badge 
                  variant={task.status === TaskStatus.COMPLETED ? "default" : "secondary"}
                  className="capitalize"
                >
                  {task.status}
                </Badge>
                <Switch
                  checked={task.status === TaskStatus.COMPLETED}
                  onCheckedChange={(checked) => {
                    updateTaskStatus({
                      id: task.id,
                      status: checked ? TaskStatus.COMPLETED : TaskStatus.PENDING
                    });
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{task.description}</p>
              <p className="text-sm text-muted-foreground">
                Created: {format(new Date(task.createdAt), 'PPp')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
    </>
  );
}