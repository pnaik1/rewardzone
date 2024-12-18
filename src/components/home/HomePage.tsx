import {
  Avatar,
  Card,
  CardBody,
  CardTitle,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  Stack,
  Title,
} from "@patternfly/react-core";
import { homeData } from "./homeData";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export const HomePage = () => {
  const [openDropdown, setOpenDropdown] = React.useState(
    new Array(homeData.length).fill(false)
  );
  const navigate = useNavigate();

  return (
    <Grid hasGutter style={{ margin: "5px 25px" }}>
      {homeData.map((data, index) => {
        return (
          <GridItem span={3} style={{ width: "20vw" }}>
            <Card
              className="home-card"
              id="expandable-card"
              onClick={() =>
                setOpenDropdown((prevState) =>
                  prevState.map((isOpen, id) =>
                    id === index ? !isOpen : isOpen
                  )
                )
              }
            >
              <CardTitle className="card-title">
                <Flex
                  flexWrap={{ default: "nowrap" }}
                  justifyContent={{ default: "justifyContentFlexStart" }}
                >
                  <FlexItem>
                    <Avatar
                      src={process.env.PUBLIC_URL + data.icon}
                      alt="approval"
                      width={20}
                      height={20}
                    />
                  </FlexItem>
                  <FlexItem alignSelf={{ default: "alignSelfCenter" }}>
                    <Title
                      style={{ fontWeight: "bolder", color: "white" }}
                      size="lg"
                      headingLevel="h3"
                    >
                      {data.Title}
                    </Title>
                  </FlexItem>
                </Flex>
              </CardTitle>

              <CardBody className="card-body">
                <Flex
                  gap={{ default: "gapSm" }}
                  justifyContent={{ default: "justifyContentCenter" }}
                >
                  <FlexItem>{data.Description}</FlexItem>
                </Flex>
              </CardBody>
              {data.isDropdown && openDropdown[index] && (
                <Stack
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <Menu
                    style={{
                      background: "inherit",
                    }}
                    isPlain
                  >
                    <MenuContent>
                      <MenuList
                        style={{
                          alignContent: "center",
                          textAlign: "center",
                        }}
                      >
                        {data.DropdownList.map((list, i) => (
                          <>
                            <Divider />
                            <MenuItem
                              isExternalLink
                              isLoadButton
                              itemId="loader"
                              component="span"
                              onClick={() => {
                                navigate(list.value);
                              }}
                            >
                              <p style={{ textAlign: "center", color: "red" }}>
                                {list.name}{" "}
                              </p>
                            </MenuItem>
                          </>
                        ))}
                      </MenuList>
                    </MenuContent>
                  </Menu>
                </Stack>
              )}
            </Card>
          </GridItem>
        );
      })}
    </Grid>
  );
};
