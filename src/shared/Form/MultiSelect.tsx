import { useEffect, useRef, useState } from "react";
import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";

function MultiSelect({
  id,
  value,
  onChange,
  onBlur,
  disabled,
  options,
  className,
}: MultiSelect) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    onChange({ label: "clear", value: "all" });
  }

  function selectOption(option: Option) {
    onChange(option);
  }

  function isOptionSelected(option: Option) {
    if (value) {
      return value.includes(option.value);
    }
  }

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  // for selecting input using keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div className={`${className} flex flex-col w-full`}>
      <div
        ref={containerRef}
        onBlur={() => {
          onBlur();
          setIsOpen(false);
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className="relative w-full rounded flex items-center gap-2 px-2 py-[0.2rem] outline-none border border-slate-100 bg-slate-100 text-gray-600
      focus:border-blue-200
      "
      >
        <span className="flex gap-1 flex-wrap w-full">
          {value?.length > 0 ? (
            (value as string[]).map((v) => (
              <button
                key={v + "Id"}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption({ label: "clear", value: v });
                }}
                className="flex items-center gap-1 text-sm border border-gray-500 outline-none px-1 py-[0.1rem] rounded-md cursor-pointer "
              >
                {v}
                <span>
                  <AiOutlineClose />
                </span>
              </button>
            ))
          ) : (
            <p className="text-gray-400">Please Pick Items</p>
          )}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
          <AiOutlineClose />
        </button>
        <div className="bg-gray-400 self-stretch w-[0.02rem]"></div>
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        >
          <AiFillCaretDown />
        </div>
        <ul
          className={`absolute m-0 p-2 list-none max-h-[15em] overflow-y-auto rounded-lg w-full left-0 top-[calc(100%+0.25em)] bg-slate-600 text-white z-50
        ${isOpen ? "block" : "hidden"}
        `}
        >
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`cursor-pointer rounded p-1 transition-colors duration-200 font-semibold ${
                isOptionSelected(option) ? "bg-gray-200 text-gray-600" : ""
              } ${
                index === highlightedIndex ? "bg-gray-200 text-gray-600" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MultiSelect;
