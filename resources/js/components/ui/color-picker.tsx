import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { hexToRgb, isValidHex } from "@/lib/color-utils";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalColor, setInternalColor] = React.useState(value || "#3b82f6");

  React.useEffect(() => {
    if (value && isValidHex(value)) {
      setInternalColor(value);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-between pl-3 pr-2",
            "bg-transparent hover:bg-gray-800 border-gray-950",
            "text-gray-200 hover:text-white",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full border border-gray-600"
              style={{ backgroundColor: internalColor }}
            />
            <span className="font-mono text-sm">{internalColor.toUpperCase()}</span>
          </div>
          <Paintbrush className="h-4 w-4 opacity-70 paintbrush-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-lg"
        align="start"
      >
        <div className="space-y-4">
          <input
            type="color"
            value={internalColor}
            onChange={(e) => {
              setInternalColor(e.target.value);
              onChange(e.target.value);
            }}
            className={cn(
              "w-full h-10 cursor-pointer bg-transparent border-0",
              "rounded-lg overflow-hidden",
              "[&::-webkit-color-swatch]:border-0",
              "[&::-webkit-color-swatch-wrapper]:p-0",
              "[&::-webkit-color-swatch]:rounded-lg"
            )}
          />

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">HEX</label>
              <input
                type="text"
                value={internalColor}
                onChange={(e) => {
                  const val = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
                  if (isValidHex(val)) {
                    setInternalColor(val);
                    onChange(val);
                  }
                }}
                className={cn(
                  "w-full px-2 py-1 text-sm rounded-md",
                  "bg-gray-800 border border-gray-700",
                  "text-gray-200 font-mono",
                  "focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                )}
                maxLength={7}
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">RGB</label>
              <div className="px-2 py-1 text-sm rounded-md bg-gray-800 text-gray-300 font-mono">
                {hexToRgb(internalColor) || "Invalid"}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}