import React from "react";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  label: string;
  placeholder: string;
  width: string | number;
  value: string;
  onChangeText: (text: string) => void;
  type?: string; // Optional prop
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  width,
  value,
  onChangeText,
  type = "text", // Default to "text"
}) => {
  return (
    <div className="mt-3" style={{ width }}>
      <label className="font-bold text-gray-500 mb-1 block">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-5 text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default TextInput;