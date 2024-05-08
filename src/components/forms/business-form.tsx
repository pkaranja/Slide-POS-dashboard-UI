"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
//import FileUpload from "../file-upload";
import { useToast } from "../ui/use-toast";
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  imgUrl: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
    .min(1, { message: "At least one image must be added." }),
  description: z
    .string()
    .min(3, { message: "Product description must be at least 3 characters" }),
  price: z.coerce.number(),
  category: z.string().min(1, { message: "Please select a category" }),
});

type BusinessFormValues = z.infer<typeof formSchema>;

interface BusinessFormProps {
  initialData: any | null;
  categories: any;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit business" : "Create business";
  const description = initialData ? "Edit your business details." : "Add a new business";
  const toastMessage = initialData ? "Business details updated." : "Business created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        businessName: "",
        logo: "",
        slug: "",
        description: "",
        emailAddress: "",
        mobileNumber: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        timeZone: "",
        currencies: [],
        businessCategories: [],
      };

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: BusinessFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };



  const triggerImgUrlValidation = () => form.trigger("imgUrl");

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
