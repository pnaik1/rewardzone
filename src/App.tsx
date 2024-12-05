import "./App.css";
import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.min.css";
import "@patternfly/patternfly/patternfly-addons.css";
import { Header } from "./components/Header";
import {
  Flex,
  FlexItem,
  Page,
  PageSection,
  Title,
} from "@patternfly/react-core";
import background from "./images/background.jpg";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <>
      <Page
        masthead={<Header />}
        isHorizontalSubnavWidthLimited
        isBreadcrumbWidthLimited
        isBreadcrumbGrouped
      >
        <PageSection>
          <Flex alignItems={{ default: "alignItemsCenter" }}>
            <FlexItem>
              {" "}
              <img src={background} alt="" width="500px" />
            </FlexItem>
            <FlexItem
              spacer={{ default: "spacer4xl" }}
              style={{
                marginRight: "400px",
                backgroundColor:
                  "radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)",
              }}
              align={{ default: "alignRight" }}
            >
              <Title
                size="4xl"
                headingLevel="h1"
                style={{
                  fontSize: "55px",
                  fontWeight: "normal",
                  fontFamily: "fantasy",
                  color: "grey",
                  fontStyle: "oblique",
                }}
              >
                <b>REWARD ZONE</b>
              </Title>
            </FlexItem>
          </Flex>
        </PageSection>
        <PageSection variant="secondary">
          <AppRoutes />
        </PageSection>
      </Page>
    </>
  );
};

export default App;
