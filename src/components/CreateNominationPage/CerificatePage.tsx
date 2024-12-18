import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import React from "react";
import logo from "../../images/png-transparent-orange-and-red-ribbon-logo-illustration-trophy-badge-ribbon-label-orange-removebg-preview Background Removed.png";
import { useMessage } from "../../MessageContext";
import { useNavigate } from "react-router-dom";

type CertificateProp = {
  data: {
    name: string;
    subCompetencies: {
      name: string;
    }[];
  }[];
  selection: number;
  nomineeName: string[];
  isChecked: string;
  inputValue: number | "";
};

const CerificatePage: React.FC<CertificateProp> = ({
  data: competencyData,
  selection,
  nomineeName,
  isChecked,
  inputValue,
}) => {
  const { setMessage } = useMessage();
  const navigate = useNavigate();
  React.useEffect(() => {
    setMessage({
      data: competencyData,
      selection: selection,
      isChecked: isChecked,
      nomineeName: nomineeName,
      inputValue: inputValue,
    });
  }, [
    competencyData,
    inputValue,
    isChecked,
    nomineeName,
    selection,
    setMessage,
  ]);
  return (
    <FlexItem>
      <Card
        style={{
          paddingTop: "20px",
          paddingBottom: "100px",
          marginBottom: "10px",

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
          <Button
            variant="danger"
            style={{ margin: "10px", width: "100px" }}
            onClick={() => navigate("/nominations/final")}
          >
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
