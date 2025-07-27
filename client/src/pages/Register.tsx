import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Leaf, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { WalletConnectButton } from "@/components/WalletConnectButton";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["individual", "organization", "collector"], {
    required_error: "Please select a role",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Registration data:", data);

    toast({
      title: "Registration Successful!",
      description:
        "Welcome to PlasticTrace. You can now start tracking plastic waste.",
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255)_1px,transparent_0)] [background-size:50px_50px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto flex flex-row-reverse items-center justify-between">
            <WalletConnectButton />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">PlasticTrace</h1>
                <p className="text-xs text-white/60">Sustainable Future</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">
                  Join PlasticTrace
                </CardTitle>
                <CardDescription className="text-white/70">
                  Create your account and start making a difference in plastic
                  waste management
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    {/* Role Field */}
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Select Your Role
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <RadioGroupItem
                                  value="individual"
                                  id="individual"
                                  className="border-white/40 text-white"
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="Manufacturer"
                                    className="text-white font-medium cursor-pointer"
                                  >
                                    Manufacturer
                                  </Label>
                                  <p className="text-xs text-white/60 mt-1">
                                    {" "}
                                    Track products from creation to disposal
                                    lifecycle
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <RadioGroupItem
                                  value="RagPicker"
                                  id="RagPicker"
                                  className="border-white/40 text-white"
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="RagPicker"
                                    className="text-white font-medium cursor-pointer"
                                  >
                                    RagPicker
                                  </Label>
                                  <p className="text-xs text-white/60 mt-1">
                                    Scan waste items and earn instant blockchain
                                    rewards
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <RadioGroupItem
                                  value="Recycler"
                                  id="Recycler"
                                  className="border-white/40 text-white"
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor="Recycler"
                                    className="text-white font-medium cursor-pointer"
                                  >
                                    Recycler
                                  </Label>
                                  <p className="text-xs text-white/60 mt-1">
                                    Verify and process collected waste materials
                                  </p>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 font-medium"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-white/60 text-sm">
                    Back to{" "}
                    <Link
                      to="/"
                      className="text-white hover:text-white/80 font-medium underline underline-offset-4"
                    >
                      Home
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center">
          <p className="text-white/50 text-xs">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
