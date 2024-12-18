import React, { useState } from "react";
import { SearchInput } from "@patternfly/react-core";

const SearchBarWithFilter: React.FC = () => {
  const items: string[] = [
    "apple",
    "banana",
    "grape",
    "pineapple",
    "orange",
    "blueberry",
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  // Function to handle input change
  const onInputChange = (e: any, value: string): void => {
    setSearchTerm(value);

    // Filter logic: change .includes to .startsWith for starts-with behavior
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
    setIsOpen(true); // Open the dropdown when typing
  };

  // Handle dropdown toggle
  const onToggle = (isOpen: boolean): void => {
    setIsOpen(isOpen);
  };

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      {/* Text Input for Search */}
      <SearchInput
        style={{ width: "250px" }}
        placeholder="Find by name"
        value={searchTerm}
        // onChange={(_event, value) => setValue(value)}
        onChange={onInputChange}
        onSearch={(_event: any, value: string) => {
          setFilteredItems([...items, value]);
          setSearchTerm(value);
        }}
        onClear={() => setSearchTerm("")}
      />
    </div>
  );
};

export default SearchBarWithFilter;
