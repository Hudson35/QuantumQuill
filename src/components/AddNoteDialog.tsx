import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";

interface AddNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddNoteDialog({open, setOpen}: AddNoteDialogProps) {

  const router = useRouter();

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { 
      title: "",
      content: "",
    }
  });

  async function onSubmit(input: CreateNoteSchema) {
    // alert(JSON.stringify(input, null, 2));

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      // if the response is not ok, throw an error
      if(!response.ok) {
        throw new Error("Status code: " + response.status);
      }

      // if response was ok (successful), reset the form
      form.reset();

      // This will refresh the page, and the new note will be displayed
      router.refresh();

      // Close the dialog
      setOpen(false);
    }
    catch (error) { 
      console.error(error);
      alert('An error occurred while trying to add the note. Please try again.');
    }
  }

  return (
    <Dialog  
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Note
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField 
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Note Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Note title" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="content"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Note content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Note content" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton 
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}