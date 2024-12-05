import {
  Avatar,
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
  InfoCircleIcon,
  QuestionCircleIcon,
} from "@patternfly/react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

import logo from "../images/logo.png";
import user from "../images/userLogin.png";
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
          columnGap={{ default: "columnGapNone" }}
          variant="action-group-plain"
          align={{ default: "alignEnd" }}
          gap={{ default: "gapNone", md: "gapNone" }}
        >
          <ToolbarItem>
            <DescriptionList isCompact isHorizontal>
              <Card isCompact style={{ width: "12vw", padding: "12px" }}>
                <DescriptionListGroup>
                  <DescriptionListTerm>Nomination Points</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label variant="overflow" color="blue">
                      300
                    </Label>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              </Card>
            </DescriptionList>

            <DescriptionList isCompact isHorizontal>
              <Card isCompact style={{ width: "12vw", padding: "12px" }}>
                <DescriptionListGroup>
                  <DescriptionListTerm>Redeem Points</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label variant="overflow" color="blue">
                      300
                    </Label>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              </Card>
            </DescriptionList>
          </ToolbarItem>
          <ToolbarItem>
            <Button
              aria-label="Notifications"
              variant={ButtonVariant.plain}
              icon={<AnsibleTowerIcon />}
            />
          </ToolbarItem>
          <ToolbarGroup
            variant="action-group-plain"
            visibility={{ default: "hidden", lg: "visible" }}
          >
            <ToolbarItem>
              <Button
                aria-label="Settings"
                variant={ButtonVariant.plain}
                icon={<InfoCircleIcon />}
              />
            </ToolbarItem>
            <ToolbarItem>
              <Dropdown
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    variant="plain"
                    icon={<QuestionCircleIcon />}
                  />
                )}
              ></Dropdown>
            </ToolbarItem>
            <ToolbarGroup>
              <ToolbarItem>
                <Dropdown
                  isOpen={isDropdownOpen}
                  onSelect={onDropdownSelect}
                  onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
                  popperProps={{ position: "right" }}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={onDropdownToggle}
                      isExpanded={isDropdownOpen}
                      icon={<Avatar src={user} alt="" size="sm" isBordered />}
                    />
                  )}
                >
                  <DropdownList>{userDropdownItems}</DropdownList>
                </Dropdown>
              </ToolbarItem>
            </ToolbarGroup>
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
            <BarsIcon />
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
