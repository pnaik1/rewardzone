import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import React from "react";
import logo from "../../images/png-transparent-orange-and-red-ribbon-logo-illustration-trophy-badge-ribbon-label-orange-removebg-preview Background Removed.png";

type CertificateProp = {
  data: {
    name: string;
    subCompetencies: {
      name: string;
    }[];
  }[];
  selection: number;
  isChecked: string;
  inputValue: number | "";
};

const CerificatePage: React.FC<CertificateProp> = ({
  data: competencyData,
  selection,
  isChecked,
  inputValue,
}) => {
  return (
    <FlexItem>
      <Card
        style={{
          paddingTop: "20px",
          paddingBottom: "100px",
          marginBottom: "10px",
          background: "#c3c7ca",
          width: "350px",
          height: "410px",
        }}
      >
        <CardTitle
          style={{
            fontSize: "20px",
            fontWeight: "normal",
            color: "red",
            textAlign: "center",
          }}
        >
          {" "}
          <b>REWARD ZONE</b>
        </CardTitle>
        <CardHeader style={{ textAlign: "center" } as React.CSSProperties}>
          <b>{competencyData[selection].name}</b>
        </CardHeader>
        <CardBody style={{ textAlign: "center" } as React.CSSProperties}>
          <div>
            <b>
              {competencyData[selection].subCompetencies[parseInt(isChecked)]
                .name ||
                competencyData[selection].subCompetencies[0].name ||
                ""}
            </b>
          </div>
          <div style={{ padding: "25px" }}>
            <Avatar size="xl" src={logo} alt={""} />
          </div>
          <div>
            <b>{`Points: ${inputValue}`}</b>
          </div>
        </CardBody>
      </Card>
      <Flex
        justifyContent={{ default: "justifyContentCenter" }}
        spaceItems={{ default: "spaceItemsNone" }}
      >
        <FlexItem>
          <Button variant="danger" style={{ margin: "10px", width: "100px" }}>
            Next
          </Button>
        </FlexItem>
        <FlexItem>
          <Button variant="secondary" isDanger>
            Cancel
          </Button>
        </FlexItem>
      </Flex>
    </FlexItem>
  );
};

export default CerificatePage;
