"use client";
import SubmitButton from "../SubmitButton";

import { Dispatch, SetStateAction, useState } from "react";
import CustomFormfeild, { FormFieldType } from "../CustomFormfeild";
import { Form, FormControl } from "@/components/ui/form";
import Image from "next/image";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import { getAppointmentSchema } from "@/lib/Validation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type } from "os";
import { z } from "zod";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";



const AppointmentForm = ({
    userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // console.log(patientId,"pat",userId,"userid")
  
    const AppointmentFormValidation = getAppointmentSchema(type);
  
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
        primaryPhysician: appointment ? appointment?.primaryPhysician : "",
        schedule: appointment
          ? new Date(appointment?.schedule!)
          : new Date(Date.now()),
        reason: appointment ? appointment.reason : "",
        note: appointment?.note || "",
        cancellationReason: appointment?.cancellationReason || "",
      },
    });
  
    const onSubmit = async (
      values: z.infer<typeof AppointmentFormValidation>
    ) => {
      setIsLoading(true);
  
      let status;
      switch (type) {
        case "schedule":
          status = "scheduled";
          break;
        case "cancel":
          status = "cancelled";
          break;
        default:
          status = "pending";
      }
  
      try {
        if (type === "create" && patientId) {
          const appointment = {
            userId,
            patient: patientId,
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason!,
            status: status as Status,
            note: values.note,
          };
  
          // @ts-ignore
          const newAppointment = await createAppointment(appointment);
  
          if (newAppointment) {
            form.reset();
            router.push(
              `/patient/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
            );
          }
        } else {
          const appointmentToUpdate = {
            userId,
            appointmentId: appointment?.$id!,
            appointment: {
              primaryPhysician: values.primaryPhysician,
              schedule: new Date(values.schedule),
              status: status as Status,
              cancellationReason: values.cancellationReason,
            },
            type,

          };
  //@ts-ignore
          const updatedAppointment = await updateAppointment(appointmentToUpdate);
  
          if (updatedAppointment) {
            // setOpen && setOpen(false);
            form.reset();
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    let buttonLabel;
    switch (type) {
      case "cancel":
        buttonLabel = "Cancel Appointment";
        break;
      case "schedule":
        buttonLabel = "Schedule Appointment";
        break;
      default:
        buttonLabel = "Submit Apppointment";
    }
  return (
    // {...form}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
      {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormfeild
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormfeild>

            <CustomFormfeild
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
            >
              <CustomFormfeild
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual montly check-up"
                disabled={type === "schedule"}
              />

              <CustomFormfeild
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                // disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormfeild
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isloading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;


