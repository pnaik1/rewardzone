import {
  Card,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  Label,
  LabelGroup,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  NumberInput,
  Popper,
  SearchInput,
  TextInput,
} from "@patternfly/react-core";
import React from "react";
import CerificatePage from "./CerificatePage";
import { words } from "../home/words";
import { competencyData } from "../home/competencyData";

const CreateNominationPage = () => {
  const [isChecked, setIsChecked] = React.useState("0");
  const [selection, setSelection] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [textValue, setTextValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState<number | "">(0);
  const [name, setName] = React.useState<string[]>([]);

  const onNumberChange = (
    event: React.FormEvent<HTMLInputElement>,
    updateFunction: React.Dispatch<React.SetStateAction<number | "">>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    updateFunction(value === "" ? value : +value);
  };

  const onMinus = (
    value: number | "",
    updateFunction: React.Dispatch<React.SetStateAction<number | "">>
  ) => {
    updateFunction((value || 0) - 1);
  };

  const onPlus = (
    value: number | "",
    updateFunction: React.Dispatch<React.SetStateAction<number | "">>
  ) => {
    updateFunction((value || 0) + 1);
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.id);
  };

  const [labels, setLabels] = React.useState<any>([]);

  // ---------------------------
  const [isAutocompleteOpen, setIsAutocompleteOpen] = React.useState(false);
  const [hint, setHint] = React.useState("");
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<
    [] | JSX.Element[]
  >([]);

  const searchInputRef = React.useRef<any>(null);
  const autocompleteRef = React.useRef<any>(null);

  const onNameChange = (_event: any, newValue: string) => {
    if (
      newValue !== "" &&
      searchInputRef &&
      searchInputRef.current &&
      searchInputRef.current.contains(document.activeElement)
    ) {
      setIsAutocompleteOpen(true);

      let options = words
        .filter((option) => option.startsWith(newValue.toLowerCase()))
        .map((option) => (
          <MenuItem
            itemId={option}
            key={option}
            style={{ position: "relative" }}
          >
            {option}
          </MenuItem>
        ));
      if (options.length > 10) {
        options = options.slice(0, 10);
      } else {
        options = [
          ...options,
          ...words
            .filter(
              (option) =>
                !option.startsWith(newValue.toLowerCase()) &&
                option.includes(newValue.toLowerCase())
            )
            .map((option) => (
              <MenuItem
                itemId={option}
                key={option}
                style={{ position: "relative" }}
              >
                {option}
              </MenuItem>
            )),
        ].slice(0, 10);
      }

      // The hint is set whenever there is only one autocomplete option left.
      setHint(options.length === 1 ? options[0].props.itemId : "");
      // The menu is hidden if there are no options
      setIsAutocompleteOpen(options.length > 0);
      setAutocompleteOptions(options);
    } else {
      setIsAutocompleteOpen(false);
    }
    setValue(newValue);
  };

  const handleClickOutside = (event: any) => {
    if (
      isAutocompleteOpen &&
      autocompleteRef &&
      autocompleteRef.current &&
      !autocompleteRef.current.contains(event.target)
    ) {
      setIsAutocompleteOpen(false);
    }
  };

  const handleMenuKeys = (event: any) => {
    // If there is a hint while the browser focus is on the search input, tab or right arrow will 'accept' the hint value
    // and set it as the search input value
    if (
      hint &&
      (event.key === "Tab" || event.key === "ArrowRight") &&
      searchInputRef.current === event.target
    ) {
      setValue(hint);
      setHint("");
      setIsAutocompleteOpen(false);
      if (event.key === "ArrowRight") {
        event.preventDefault();
      }
      // if the autocomplete is open and the browser focus is on the search input,
    } else if (
      isAutocompleteOpen &&
      searchInputRef.current &&
      searchInputRef.current === event.target
    ) {
      // the escape key closes the autocomplete menu and keeps the focus on the search input.
      if (event.key === "Escape") {
        setIsAutocompleteOpen(false);
        searchInputRef.current.focus();
        // the up and down arrow keys move browser focus into the autocomplete menu
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const firstElement = autocompleteRef.current.querySelector(
          "li > button:not(:disabled)"
        );
        firstElement && firstElement.focus();
        event.preventDefault(); // by default, the up and down arrow keys scroll the window
        // the tab, enter, and space keys will close the menu, and the tab key will move browser
        // focus forward one element (by default)
      } else if (
        event.key === "Tab" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        setIsAutocompleteOpen(false);
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
        }
      }
      // If the autocomplete is open and the browser focus is in the autocomplete menu
      // hitting tab will close the autocomplete and but browser focus back on the search input.
    } else if (
      isAutocompleteOpen &&
      autocompleteRef.current.contains(event.target) &&
      event.key === "Tab"
    ) {
      event.preventDefault();
      setIsAutocompleteOpen(false);
      searchInputRef.current.focus();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleMenuKeys);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleMenuKeys);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isAutocompleteOpen, hint, searchInputRef.current]);

  const onSelect = (e: any, itemId: any) => {
    e.stopPropagation();
    setValue(itemId);
    setIsAutocompleteOpen(false);
    searchInputRef.current?.focus();
  };

  const autocomplete = (
    <Menu ref={autocompleteRef} onSelect={onSelect} isScrollable>
      <MenuContent style={{ position: "relative" }}>
        <MenuList> {autocompleteOptions}</MenuList>
      </MenuContent>
    </Menu>
  );

  const searchInput = (
    <SearchInput
      style={{ width: "250px", height: "30px" }}
      placeholder="Find by name"
      value={value}
      onChange={onNameChange}
      onSearch={(_event, value) => {
        if (value === "") {
          setValue("");
        } else {
          setLabels([...labels, value]);
          setName([...name, value]);
          setValue("");
        }
      }}
      onClear={() => setValue("")}
      ref={searchInputRef}
      hint={hint}
      id="autocomplete-search"
    />
  );

  const onLabelClose = (label: string) => {
    setName(name.filter((l: any) => l !== label));
  };

  return (
    <>
      <Flex justifyContent={{ default: "justifyContentCenter" }}>
        <FlexItem spacer={{ default: "spacer3xl" }}>
          <Card
            style={{
              padding: "20px",
              marginBottom: "10px",
              width: "950px",
              marginTop: "40px",
            }}
          >
            <Flex
              spaceItems={{ default: "spaceItems2xl" }}
              style={{ padding: "20px" }}
            >
              <FlexItem>
                <Popper
                  trigger={searchInput}
                  triggerRef={searchInputRef}
                  popper={autocomplete}
                  popperRef={autocompleteRef}
                  isVisible={isAutocompleteOpen}
                  enableFlip={false}
                  // append the autocomplete menu to the search input in the DOM for the sake of the keyboard navigation experience
                  appendTo={() =>
                    document.querySelector("#autocomplete-search")!
                  }
                />
              </FlexItem>
              <FlexItem>
                <LabelGroup
                  style={{ width: "250px", height: "27px" }}
                  categoryName="Names: "
                  numLabels={5}
                  isEditable
                >
                  {name.map((label, index) => (
                    <Label
                      style={{ height: "30px" }}
                      key={label}
                      id={label}
                      color="red"
                      onClose={() => onLabelClose(label)}
                    >
                      {label}
                    </Label>
                  ))}
                </LabelGroup>
                {!name[0] && (
                  <TextInput
                    style={{ width: "350px", height: "40px" }}
                    value={name[0]}
                    type="text"
                    onChange={(_event, value) => setTextValue(value)}
                    aria-label="text input example"
                  />
                )}
              </FlexItem>
              <FlexItem align={{ default: "alignRight" }}>
                <NumberInput
                  placeholder="Enter points"
                  value={inputValue}
                  onMinus={() => onMinus(inputValue, setInputValue)}
                  onChange={(event) => onNumberChange(event, setInputValue)}
                  onPlus={() => onPlus(inputValue, setInputValue)}
                  inputName="input1"
                  inputAriaLabel="number input 1"
                  minusBtnAriaLabel="input 2 minus"
                  plusBtnAriaLabel="input 2 plus"
                  widthChars={1}
                />
              </FlexItem>
            </Flex>

            <Flex>
              <FlexItem>
                <Card
                  style={{
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    width: "100%",
                    marginTop: "30px",
                  }}
                >
                  <Flex
                    spaceItems={{ default: "spaceItemsSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    {competencyData.map((data, index) => {
                      return (
                        <FlexItem>
                          <Label
                            style={{
                              textAlign: "center",
                              justifyContent: "center",
                              width: "100px",
                              height: "30px",
                              backgroundColor: "red !important",
                            }}
                            color="orangered"
                            onClick={() => {
                              setSelection(competencyData.indexOf(data));
                              setIsChecked("0");
                            }}
                          >
                            {data.name}
                          </Label>
                        </FlexItem>
                      );
                    })}
                  </Flex>
                  <Card
                    style={{ margin: "20px", width: "875px", padding: "20px" }}
                  >
                    <Gallery>
                      {competencyData[selection].subCompetencies.map(
                        (data, index) => (
                          <GalleryItem style={{ padding: "10px" }}>
                            <Label
                              onClick={(e) => setIsChecked(index.toString())}
                              color="red"
                              style={{
                                width: "200px",
                                height: "65px",
                                justifyContent: "center",
                              }}
                            >
                              {data.name}
                            </Label>
                            {/* <Card
                              isSelectable
                              isSelected={isChecked === index.toString()}
                              style={{
                                textAlign: "center",
                                justifyContent: "center",

                              }}
                            >
                              <CardHeader
                                selectableActions={{
                                  selectableActionId: index.toString(),
                                  selectableActionAriaLabelledby:
                                    "tile-example-2",
                                  name: index.toString(),
                                  variant: "single",
                                  onChange,
                                  isHidden: true,
                                }}
                              >
                                {data.name}
                              </CardHeader>
                            </Card> */}
                          </GalleryItem>
                        )
                      )}
                    </Gallery>
                  </Card>
                </Card>
              </FlexItem>
            </Flex>
          </Card>
        </FlexItem>
        <CerificatePage
          nomineeName={name}
          data={competencyData}
          selection={selection}
          isChecked={isChecked}
          inputValue={inputValue}
        />
      </Flex>
    </>
  );
};

export default CreateNominationPage;
