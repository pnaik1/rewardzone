import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Divider,
  ExpandableSection,
  ExpandableSectionToggle,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { homeData } from "../data/homeData";
import React from "react";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [openDropdown, setOpenDropdown] = React.useState(
    new Array(homeData.length).fill(false)
  );
  const navigate = useNavigate();

  return (
    <Grid hasGutter style={{ margin: "5px 50px" }}>
      {homeData.map((data, index) => {
        return !data.isDropdown ? (
          <GridItem span={3} style={{ width: "20vw" }}>
            <Card id="expandable-card" style={{ margin: "5px 20px" }}>
              <CardTitle
                id="expandable-card-title"
                style={{ alignItems: "flex-end" }}
              >
                <Flex>
                  <FlexItem>
                    <img
                      src={process.env.PUBLIC_URL + data.icon}
                      alt="approval"
                      width={30}
                      height={10}
                    />
                  </FlexItem>
                  <FlexItem alignSelf={{ default: "alignSelfCenter" }}>
                    <Title headingLevel="h3">{data.Title}</Title>
                  </FlexItem>
                </Flex>
              </CardTitle>

              <CardBody>{data.Description}</CardBody>
            </Card>
          </GridItem>
        ) : (
          <GridItem span={3}>
            <Card
              id="expandable-card"
              style={{ margin: "5px 20px" }}
              isExpanded={openDropdown[index]}
            >
              <CardTitle id="expandable-card-title">
                <Flex>
                  <FlexItem>
                    <img
                      src={process.env.PUBLIC_URL + data.icon}
                      alt="approval"
                      width={30}
                      height={10}
                    />
                  </FlexItem>
                  <FlexItem alignSelf={{ default: "alignSelfCenter" }}>
                    {data.Title}
                  </FlexItem>
                  <FlexItem alignSelf={{ default: "alignSelfFlexEnd" }}>
                    <ExpandableSectionToggle
                      isExpanded={openDropdown[index]}
                      onToggle={() =>
                        setOpenDropdown((prevState) =>
                          prevState.map((isOpen, id) =>
                            id === index ? !isOpen : isOpen
                          )
                        )
                      }
                    />
                  </FlexItem>
                </Flex>
              </CardTitle>
              {/* </CardHeader> */}

              <CardBody>{data.Description}</CardBody>
              <ExpandableSection isExpanded={openDropdown[index]} isDetached>
                <Stack style={{ alignItems: "center" }}>
                  {data.isDropdown &&
                    data.DropdownList.map((list) => (
                      <>
                        <Divider />
                        <StackItem>
                          {" "}
                          <Button
                            size="default"
                            variant="link"
                            icon={<ExternalLinkSquareAltIcon />}
                            iconPosition="end"
                            onClick={() => navigate(list.value)}
                          >
                            {list.name}
                          </Button>
                        </StackItem>
                      </>
                    ))}
                </Stack>
              </ExpandableSection>
            </Card>
          </GridItem>
        );
      })}
    </Grid>
  );
};
