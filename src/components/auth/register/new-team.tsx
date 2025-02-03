import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const newTeamSchema = z.object({
  organizationName: z.string().min(1, {
    message: 'チーム名を入力してください',
  }),
});

export default function NewTeamForm({
  organizationName,
  setOrganizationName,
  pageNext,
}: {
  organizationName: string;
  setOrganizationName: (name: string) => void;
  pageNext: () => void;
}) {
  const form = useForm<z.infer<typeof newTeamSchema>>({
    resolver: zodResolver(newTeamSchema),
    defaultValues: {
      organizationName: organizationName,
    },
  });

  const onSubmit = (data: z.infer<typeof newTeamSchema>) => {
    console.log(data);
    setOrganizationName(data.organizationName);
    pageNext();
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>チーム名</FormLabel>
                <FormControl>
                  <Input placeholder="チーム名" type="text" variant="underline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="ml-auto mr-0 w-fit">
            <Button className="rounded-sm px-5" type="submit">
              次へ
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
