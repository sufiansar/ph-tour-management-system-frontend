import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useOtpSendMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state);
  const [otpsend] = useOtpSendMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(120);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Otp Confirm");
    try {
      const res = await verifyOtp({ email: email, otp: data.pin }).unwrap();
      if (res.success) {
        toast.success("Confirm Otp", { id: toastId });
        setConfirmed(true);
      }
      navigate("/");
    } catch (error) {
      toast.error("Invalid Otp", { id: toastId });
    }
  };

  const handaleSendOtp = async () => {
    const toastId = toast.loading("Sending Otp");

    console.log("value");
    try {
      const res = await otpsend({ email: email }).unwrap();
      if (res.success) {
        setConfirmed(true);
        setTimer(120);
        toast.success("Otp Sent", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to send Otp", { id: toastId });
    }
  };

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }
    const timerID = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerID);
  }, [email, confirmed]);

  return (
    <div className="grid place-items-center h-screen">
      {confirmed ? (
        <Card className="">
          <CardHeader>
            <CardTitle>Verify Your Email Address</CardTitle>
            <CardDescription>Enter the OTP sent to your email</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot className="mx-2" />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          onClick={handaleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0}
                          className={cn("p-0", "m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Resend Otp:
                        </Button>
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button form="otp-form">Submit</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Verify Your Email Address</CardTitle>
            <CardDescription>Enter the OTP sent to your email</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button className="w-full" onClick={handaleSendOtp} form="otp-form">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default verify;
