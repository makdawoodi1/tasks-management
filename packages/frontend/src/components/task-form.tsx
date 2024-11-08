import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { useCreateTaskMutation } from "@/store/services/api";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateTaskForm() {
  const [createTask] = useCreateTaskMutation();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createTask(data).unwrap();
      form.reset();
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Create New Task
      </h2>
      <p className="text-center text-gray-200 mb-4">
        Create or update tasks by filling in the name and description!
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-200">
                  Task Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter task name"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-200">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter task description"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <PlusCircle className="h-4 w-4" />
              Create Task
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
