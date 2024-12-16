import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.min.css";
import "@patternfly/patternfly/patternfly-addons.css";
import { Header } from "./components/header/Header";

import {
  Button,
  Flex,
  FlexItem,
  Page,
  PageSection,
  Title,
} from "@patternfly/react-core";
import AppRoutes from "./AppRoutes";
import "./App.css";

const App = () => {
  return (
    <>
      <Page
        className="reward-dashboard"
        masthead={<Header />}
        isHorizontalSubnavWidthLimited
        isBreadcrumbWidthLimited
        isBreadcrumbGrouped
      >
        <PageSection className="background-image">
          <Flex justifyContent={{ default: "justifyContentCenter" }}>
            <FlexItem>
              <Title className="title-text" headingLevel="h1" size="4xl">
                Reward Zone
              </Title>
            </FlexItem>
          </Flex>
        </PageSection>
        <PageSection>
          <AppRoutes />
        </PageSection>
        <PageSection isFilled className="page-section">
          <Flex
            columnGap={{ default: "columnGapMd" }}
            justifyContent={{ default: "justifyContentCenter" }}
            style={{ marginBottom: "15px" }}
          >
            <Button variant="link" isDanger size="sm" isInline>
              Home
            </Button>
            <Button variant="link" isDanger isInline>
              Contact Us
            </Button>
            <Button variant="link" isDanger isInline>
              Site Map
            </Button>
            <Button variant="link" isDanger isInline>
              Sign Out
            </Button>
          </Flex>
        </PageSection>
      </Page>
    </>
  );
};

export default App;
