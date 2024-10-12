import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,

    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Control } from "react-hook-form";
  import Image from "next/image";
  import 'react-phone-number-input/style.css'
  import PhoneInput from 'react-phone-number-input';


import "react-datepicker/dist/react-datepicker.css"
import ReactDatePicker from "react-datepicker";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

  export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
  }
  
  interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: { value: string | number | boolean | undefined }) => React.ReactNode;

    fieldType: FormFieldType;
  }
  
  // Define E164Number manually if needed
 
  
  const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconAlt, iconSrc, placeholder, } = props;
    switch (fieldType) {
      case FormFieldType.INPUT:
        return (
          <div className="flex rounded-md border-dark-500 bg-dark-400">
            {iconSrc && (
              <Image
                className="ml-2"
                src={iconSrc}
                alt={iconAlt || "icon"}
                height={24}
                width={24}
              />
            )}
            <FormControl>
              <Input className="shad-input border-0" placeholder={placeholder} {...field} />
            </FormControl>
          </div>
        );
      
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput
              defaultCountry="IN"
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value as string | undefined}  // Use string instead of E164Number
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        );
      
        case FormFieldType.DATE_PICKER:
        return(
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | any) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
        )
        case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
      case FormFieldType.TEXTAREA:
        return (
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              {...field}
              className="shad-textArea"
              disabled={props.disabled}
            />
          </FormControl>
        );
        case FormFieldType.CHECKBOX:
          return (
            <FormControl>
              <div className="flex items-center gap-4">
                <Checkbox
                  id={props.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label htmlFor={props.name} className="checkbox-label">
                  {props.label}
                </label>
              </div>
            </FormControl>
          );
        case FormFieldType.SKELETON:
          return props.renderSkeleton ? props.renderSkeleton(field) : null;
      default:
        return null;
    }
  };
  
  const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
            <RenderInput field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    );
  };
  
  export default CustomFormField;
  