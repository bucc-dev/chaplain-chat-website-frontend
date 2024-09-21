import { useEffect, useState } from "react";

export const useToggle = (defaultValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = () => setValue((currentValue) => !currentValue);

  return [value, toggleValue];
};

export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) =>
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
