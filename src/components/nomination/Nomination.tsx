import React from "react";
import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuToggle,
  Pagination,
  Popper,
  SearchInput,
  Stack,
  StackItem,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { nominationData, columnNames } from "./data";
import { Repository } from "./type";
import { FilterIcon } from "@patternfly/react-icons";
import "./Nomination.css";

export const Nomination: React.FunctionComponent = () => {
  const [principalsPagination, setPrincipalsPagination] = React.useState({
    page: 1,
    perPage: 5,
  });

  const [searchValue, setSearchValue] = React.useState("");
  const [statusSelection, setStatusSelection] = React.useState("");
  const [filteredRepo, setFilteredRepo] = React.useState<Repository[]>([]);
  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const [principalsRows, setPrincipalsRows] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    if (searchValue || statusSelection) {
      setFilteredRepo(
        nominationData.filter((repo: Repository) => {
          let searchValueInput: RegExp;
          try {
            searchValueInput = new RegExp(searchValue, "i");
          } catch (err) {
            searchValueInput = new RegExp(
              searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              "i"
            );
          }
          const matchesSearchValue = repo.to.search(searchValueInput) >= 0;

          const matchesStatusValue =
            repo.status.toLowerCase() === statusSelection.toLowerCase();

          return (
            (searchValue === "" || matchesSearchValue) &&
            (statusSelection === "" || matchesStatusValue)
          );
        })
      );
    } else {
      setFilteredRepo(nominationData);
    }
    setPrincipalsPagination({
      ...principalsPagination,
      page: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, statusSelection]);

  React.useEffect(() => {
    const initSlice =
      (principalsPagination.page - 1) * principalsPagination.perPage;
    setPrincipalsRows(
      filteredRepo.slice(initSlice, initSlice + principalsPagination.perPage)
    );
  }, [filteredRepo, principalsPagination.page, principalsPagination.perPage]);

  const searchInput = (
    <SearchInput
      placeholder="Filter by nominated to"
      value={searchValue}
      onChange={(_event, value) => onSearchChange(value)}
      onClear={() => onSearchChange("")}
    />
  );

  const [isStatusMenuOpen, setIsStatusMenuOpen] =
    React.useState<boolean>(false);
  const statusToggleRef = React.useRef<HTMLButtonElement>(null);
  const statusMenuRef = React.useRef<HTMLDivElement>(null);
  const statusContainerRef = React.useRef<HTMLDivElement>(null);

  const handleStatusMenuKeys = (event: KeyboardEvent) => {
    if (
      isStatusMenuOpen &&
      statusMenuRef.current?.contains(event.target as Node)
    ) {
      if (event.key === "Escape" || event.key === "Tab") {
        setIsStatusMenuOpen(!isStatusMenuOpen);
        statusToggleRef.current?.focus();
      }
    }
  };

  const handleStatusClickOutside = (event: MouseEvent) => {
    if (
      isStatusMenuOpen &&
      !statusMenuRef.current?.contains(event.target as Node)
    ) {
      setIsStatusMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleStatusMenuKeys);
    window.addEventListener("click", handleStatusClickOutside);
    return () => {
      window.removeEventListener("keydown", handleStatusMenuKeys);
      window.removeEventListener("click", handleStatusClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatusMenuOpen, statusMenuRef]);

  const onStatusToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setTimeout(() => {
      if (statusMenuRef.current) {
        const firstElement = statusMenuRef.current.querySelector(
          "li > button:not(:disabled)"
        );
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsStatusMenuOpen(!isStatusMenuOpen);
  };

  function onStatusSelect(
    event: React.MouseEvent | undefined,
    itemId: string | number | undefined
  ) {
    if (typeof itemId === "undefined") {
      return;
    }

    setStatusSelection(itemId.toString());
    setIsStatusMenuOpen(!isStatusMenuOpen);
  }

  const statusToggle = (
    <MenuToggle
      ref={statusToggleRef}
      onClick={onStatusToggleClick}
      isExpanded={isStatusMenuOpen}
      style={
        {
          width: "200px",
        } as React.CSSProperties
      }
    >
      Filter by status
    </MenuToggle>
  );

  const statusMenu = (
    <Menu
      ref={statusMenuRef}
      id="attribute-search-status-menu"
      onSelect={onStatusSelect}
      selected={statusSelection}
    >
      <MenuContent>
        <MenuList>
          <MenuItem itemId="Approved">Approved</MenuItem>
          <MenuItem itemId="Pending">Pending</MenuItem>
          <MenuItem itemId="Rejected">Rejected</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const statusSelect = (
    <div ref={statusContainerRef}>
      <Popper
        trigger={statusToggle}
        triggerRef={statusToggleRef}
        popper={statusMenu}
        popperRef={statusMenuRef}
        appendTo={statusContainerRef.current || undefined}
        isVisible={isStatusMenuOpen}
      />
    </div>
  );

  const [activeAttributeMenu, setActiveAttributeMenu] = React.useState<
    "Nominated To" | "Status"
  >("Nominated To");
  const [isAttributeMenuOpen, setIsAttributeMenuOpen] = React.useState(false);
  const attributeToggleRef = React.useRef<HTMLButtonElement>(null);
  const attributeMenuRef = React.useRef<HTMLDivElement>(null);
  const attributeContainerRef = React.useRef<HTMLDivElement>(null);

  const handleAttribueMenuKeys = (event: KeyboardEvent) => {
    if (!isAttributeMenuOpen) {
      return;
    }
    if (
      attributeMenuRef.current?.contains(event.target as Node) ||
      attributeToggleRef.current?.contains(event.target as Node)
    ) {
      if (event.key === "Escape" || event.key === "Tab") {
        setIsAttributeMenuOpen(!isAttributeMenuOpen);
        attributeToggleRef.current?.focus();
      }
    }
  };

  const handleAttributeClickOutside = (event: MouseEvent) => {
    if (
      isAttributeMenuOpen &&
      !attributeMenuRef.current?.contains(event.target as Node)
    ) {
      setIsAttributeMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleAttribueMenuKeys);
    window.addEventListener("click", handleAttributeClickOutside);
    return () => {
      window.removeEventListener("keydown", handleAttribueMenuKeys);
      window.removeEventListener("click", handleAttributeClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttributeMenuOpen, attributeMenuRef]);

  const onAttributeToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (attributeMenuRef.current) {
        const firstElement = attributeMenuRef.current.querySelector(
          "li > button:not(:disabled)"
        );
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsAttributeMenuOpen(!isAttributeMenuOpen);
  };

  const attributeToggle = (
    <MenuToggle
      ref={attributeToggleRef}
      onClick={onAttributeToggleClick}
      isExpanded={isAttributeMenuOpen}
      icon={<FilterIcon />}
    >
      {activeAttributeMenu}
    </MenuToggle>
  );
  const attributeMenu = (
    <Menu
      ref={attributeMenuRef}
      onSelect={(_ev, itemId) => {
        setActiveAttributeMenu(itemId?.toString() as "Nominated To" | "Status");
        setIsAttributeMenuOpen(!isAttributeMenuOpen);
      }}
    >
      <MenuContent>
        <MenuList>
          <MenuItem itemId="Nominated To">Nominated to</MenuItem>
          <MenuItem itemId="Status">Status</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const attributeDropdown = (
    <div ref={attributeContainerRef}>
      <Popper
        trigger={attributeToggle}
        triggerRef={attributeToggleRef}
        popper={attributeMenu}
        popperRef={attributeMenuRef}
        appendTo={attributeContainerRef.current || undefined}
        isVisible={isAttributeMenuOpen}
      />
    </div>
  );

  const onSetPage = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    pageNumber: number
  ) => {
    setPrincipalsPagination({
      ...principalsPagination,
      page: pageNumber,
    });
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    perPage: number
  ) => {
    setPrincipalsPagination({
      page: 1,
      perPage: perPage,
    });
  };

  const pagination = (variant: "top" | "bottom") => (
    <Pagination
      isCompact
      itemCount={filteredRepo.length}
      perPage={principalsPagination.perPage}
      page={principalsPagination.page}
      onSetPage={onSetPage}
      variant={variant}
      onPerPageSelect={onPerPageSelect}
      menuAppendTo="inline"
      titles={{
        paginationAriaLabel: `${variant} pagination`,
      }}
    />
  );

  return (
    <Stack hasGutter className="nomination-main">
      <StackItem>
        <Toolbar
          id="attribute-search-filter-toolbar"
          clearAllFilters={() => {
            setSearchValue("");
            setStatusSelection("");
          }}
          inset={{ default: "insetNone" }}
          className="nomination-toolbar"
        >
          <ToolbarContent>
            <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
              <ToolbarGroup
                variant="filter-group"
                style={{ backgroundColor: "transparent" }}
              >
                <ToolbarItem>{attributeDropdown}</ToolbarItem>
                <ToolbarFilter
                  labels={searchValue !== "" ? [searchValue] : ([] as string[])}
                  deleteLabel={() => setSearchValue("")}
                  deleteLabelGroup={() => setSearchValue("")}
                  categoryName="Name"
                  showToolbarItem={activeAttributeMenu === "Nominated To"}
                >
                  {searchInput}
                </ToolbarFilter>
                <ToolbarFilter
                  labels={
                    statusSelection !== ""
                      ? [statusSelection]
                      : ([] as string[])
                  }
                  deleteLabel={() => setStatusSelection("")}
                  deleteLabelGroup={() => setStatusSelection("")}
                  categoryName="Status"
                  showToolbarItem={activeAttributeMenu === "Status"}
                >
                  {statusSelect}
                </ToolbarFilter>
              </ToolbarGroup>
            </ToolbarToggleGroup>
            <ToolbarItem variant="pagination" align={{ default: "alignEnd" }}>
              {pagination("top")}
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </StackItem>
      <StackItem className="nomination-table">
        <Table borders aria-label="Simple table">
          <Thead style={{ backgroundColor: "grey" }}>
            <Tr>
              <Th hasRightBorder>{columnNames.reward}</Th>
              <Th hasRightBorder>{columnNames.rewardFamily}</Th>
              <Th hasRightBorder width={15}>
                {columnNames.NominatedTo}
              </Th>
              <Th hasRightBorder>{columnNames.nominatedOn}</Th>
              <Th hasRightBorder>{columnNames.status}</Th>
              <Th>{columnNames.Actions}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {principalsRows.map((repo, i) => (
              <Tr key={i}>
                <Td dataLabel={columnNames.reward}>{repo.reward}</Td>
                <Td dataLabel={columnNames.rewardFamily}>
                  {repo.rewardFamily}
                </Td>
                <Td dataLabel={columnNames.NominatedTo}>{repo.to}</Td>
                <Td dataLabel={columnNames.nominatedOn}>{repo.nominatedOn}</Td>
                <Td dataLabel={columnNames.status}>{repo.status}</Td>
                <Td dataLabel={columnNames.Actions}>
                  <Button size="sm" style={{ backgroundColor: "red" }}>
                    View Certificate
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </StackItem>
    </Stack>
  );
};
