import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import RegistrationDropdown from "../components/RegistrationDropdown";

// fix other - search up
// add school fieddld
// types
// make dropdown update formstate
// validation:
// - email, phone number, types, etc.
// move caption to placeholder and placeholder down on focus

const schema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  email: z.string().min(1, { message: "This field is required" }),
  phoneNumber: z.string().min(1, { message: "This field is required" }),
  age: z.string().min(1),
  diet: z.string().min(1),
  outreach: z.string().min(1),
  conduct: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the MLH code of conduct" }),
  }),
  privacy: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the MLH terms and conditions",
    }),
  }),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = (data) => {
    console.log("hi");
    console.log(data);
    router.push("/dashboard");
  };

  return (
    <div className="bg-black text-white">
      <section className="min-h-screen pt-32">
        <nav className="bg-transparent container absolute top-0 left-0 right-0 z-50 flex h-32 w-full items-center justify-between">
          <Link className="relative z-50 aspect-square h-3/5" href="/">
            <Image src="/logo-colored.png" alt="Hack the Nest Logo" fill />
          </Link>
        </nav>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-12">
            <div className="flex gap-16">
              <div className="w-full">
                <p>First Name</p>
                <input
                  className="bg-transparent w-full border-b-2 border-grey bg-black py-2 shadow duration-200 ease-in-out focus:border-blue-light"
                  type="text"
                  placeholder=" Type your answer here..."
                  {...register("firstName")}
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </div>

              <div className="w-full">
                <p className="relative ">Last Name</p>
                <input
                  className="bg-transparent h-10 w-full border-b-2 border-grey bg-black shadow duration-200 ease-in-out focus:border-blue-light"
                  type="text"
                  placeholder=" Type your answer here..."
                  {...register("lastName")}
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <p>Email</p>
              <input
                className="bg-transparent h-10 w-full border-b-2 border-grey bg-black shadow duration-200 ease-in-out focus:border-blue-light"
                type="text"
                placeholder=" Type your answer here..."
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <p>Phone Number</p>
              <input
                className="bg-transparent h-10 w-full border-b-2 border-grey bg-black shadow duration-200 ease-in-out focus:border-blue-light"
                type="text"
                placeholder=" Type your answer here..."
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>
            {/* TODO: fix placeholder if not in option values list */}
            <RegistrationDropdown
              fieldName="Age"
              name="age"
              options={[
                { value: "13", label: "13" },
                { value: "14", label: "14" },
                { value: "15", label: "15" },
                { value: "16", label: "16" },
                { value: "17", label: "17" },
                { value: "18", label: "18" },
              ]}
              defaultValue={null}
              control={control}
            />
            <RegistrationDropdown
              fieldName="Dietary Restrictions"
              name="diet"
              options={[
                { value: null, label: "None" },
                { value: "vegan", label: "Vegan" },
                { value: "vegetarian", label: "Vegetarian" },
                { value: "kosher", label: "Kosher" },
                { value: "halal", label: "Halal" },
                { value: "glutenFree", label: "Gluten-free" },
                { value: "other", label: "Other" },
              ]}
              defaultValue={null}
              control={control}
            />
            <RegistrationDropdown
              fieldName="Where did you hear about us?"
              name="outreach"
              options={[
                { value: null, label: "None" },
                { value: "friendsFamily", label: "Friends/Family" },
                { value: "socialMedia", label: "Social Media" },
                { value: "teacher", label: "Teacher" },
                { value: "teacher", label: "Teacher" },
              ]}
              defaultValue={null}
              control={control}
            />
            {/* TODO: display referral input if where === friends */}
            <div>
              <p>Referral Code</p>
              <input
                className="bg-transparent h-10 w-full border-b-2 border-grey bg-black shadow duration-200 ease-in-out focus:border-blue-light"
                type="text"
                placeholder=" Type your answer here..."
              />
            </div>
            <div>
              <p>
                I have read and agree to the&nbsp;
                <a
                  href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  MLH Code of Conduct
                </a>
              </p>
              <input
                placeholder="Select an option..."
                className="h-6 w-6 rounded"
                type="checkbox"
                {...register("conduct")}
              />
              {errors.conduct && <p>{errors.conduct.message}</p>}
            </div>
            <div>
              <p>
                I authorize you to share my application/registration information
                with Major League Hacking for event administration, ranking, and
                MLH administration in-line with the&nbsp;
                <a
                  href="https://mlh.io/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  MLH Privacy Policy
                </a>
                . I further agree to the terms of both the&nbsp;
                <a
                  href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  MLH Contest Terms and Conditions
                </a>
                &nbsp;and the MLH Privacy Policy.
              </p>
              <input
                placeholder="Select an option..."
                className="h-6 w-6 rounded"
                type="checkbox"
                {...register("privacy")}
              />
              {errors.accept && <p>{errors.accept.message}</p>}
            </div>
            <button className="rounded-lg border px-12 py-4 hover:bg-gold">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Registration;
