import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  className,
}) => {
  //   console.log(formControls);
  // const { parent, child, button } = className;
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(buttonText);
        }}
      >
        <div className="flex flex-col gap-3">
          {formControls.map((controlItem) => {
            return (
              <div
                className={`${
                  className?.parent ? className.parent : "grid w-full gap-1.5"
                }`}
                key={controlItem.name}
              >
                <Label className="mb-1">{controlItem.label}</Label>
                <div className={`${className?.child ? className?.child : ""}`}>
                  {renderInputsByComponentType(controlItem)}
                </div>
              </div>
            );
          })}
        </div>
        <div className={`${className?.button ? className?.button : ""}`}>
          <Button
            type="submit"
            className={`${className?.button ? "w-full" : "mt-2 w-full"}`}
          >
            {buttonText || "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommonForm;
