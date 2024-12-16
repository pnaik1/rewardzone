import "./Header.css";
import {
  Brand,
  Button,
  ButtonVariant,
  Card,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Dropdown,
  DropdownItem,
  DropdownList,
  Label,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  MenuToggle,
  MenuToggleElement,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  AnsibleTowerIcon,
  BarsIcon,
  CaretDownIcon,
  InfoCircleIcon,
  QuestionCircleIcon,
} from "@patternfly/react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import logo from "../../images/hat.png";
import { FaStar } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import React from "react";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const onDropdownSelect = () => {
    setIsDropdownOpen(false);
  };

  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userDropdownItems = (
    <>
      <DropdownItem key="logout">
        <FaUser /> Profile
      </DropdownItem>
      <DropdownItem key="cart">
        <FaShoppingCart /> Cart
      </DropdownItem>
      <DropdownItem key="profile">
        <FaShoppingBag /> Shop
      </DropdownItem>
      <DropdownItem key="favorites">
        <FaStar /> Favorites
      </DropdownItem>
      <DropdownItem key="logout">
        <FaUnlock /> Logout
      </DropdownItem>
    </>
  );

  const headerToolbar = (
    <Toolbar id="toolbar" isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="action-group-plain"
          align={{ default: "alignEnd" }}
        >
          <ToolbarGroup
            columnGap={{ default: "columnGapNone" }}
            gap={{ default: "gapNone", md: "gapNone" }}
          >
            <ToolbarItem>
              <DescriptionList
                isCompact
                isHorizontal
                className="description-List"
              >
                <Card isCompact className="header-card">
                  <DescriptionListGroup>
                    <DescriptionListTerm>Nomination Points</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Label variant="overflow">300</Label>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </Card>
              </DescriptionList>

              <DescriptionList
                isCompact
                isHorizontal
                className="description-List"
              >
                <Card isCompact className="header-card">
                  <DescriptionListGroup>
                    <DescriptionListTerm>Redeem Points</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Label variant="overflow">3000</Label>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </Card>
              </DescriptionList>
            </ToolbarItem>
            <ToolbarItem>
              <Button
                aria-label="Notifications"
                variant={ButtonVariant.plain}
                icon={<AnsibleTowerIcon color="white" />}
              />
            </ToolbarItem>
            <ToolbarGroup
              gap={{ default: "gapNone", md: "gapNone" }}
              variant="action-group-plain"
              visibility={{ default: "hidden", lg: "visible" }}
            >
              <ToolbarItem>
                <Button
                  aria-label="Settings"
                  variant={ButtonVariant.plain}
                  icon={<InfoCircleIcon color="white" />}
                />
              </ToolbarItem>
              <ToolbarItem>
                <Dropdown
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      variant="plain"
                      icon={<QuestionCircleIcon color="white" />}
                    />
                  )}
                ></Dropdown>
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarGroup>
          <ToolbarGroup
            variant="filter-group"
            columnGap={{ default: "columnGapNone" }}
            gap={{ default: "gapNone", md: "gapNone" }}
          >
            <ToolbarItem>
              <Dropdown
                isOpen={isDropdownOpen}
                onSelect={onDropdownSelect}
                onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
                popperProps={{ position: "right" }}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    className="pf-v6-c-menu-toggle__toggle-icon"
                    style={{ color: "white" }}
                    variant="plain"
                    ref={toggleRef}
                    onClick={onDropdownToggle}
                    isExpanded={isDropdownOpen}
                  >
                    {"User"} <CaretDownIcon />
                  </MenuToggle>
                )}
              >
                <DropdownList>{userDropdownItems}</DropdownList>
              </Dropdown>
            </ToolbarItem>
          </ToolbarGroup>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );

  return (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton variant="plain" aria-label="Global navigation">
            <BarsIcon color="white" />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo>
            <Brand src={logo} alt="PatternFly" heights={{ default: "36px" }} />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );
};
