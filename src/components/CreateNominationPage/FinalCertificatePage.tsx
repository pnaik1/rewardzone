import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  AlertProps,
  AlertVariant,
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownList,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  FormHelperText,
  getUniqueId,
  HelperText,
  HelperTextItem,
  Label,
  LabelGroup,
  MenuToggle,
  MenuToggleElement,
  NotificationBadge,
  NotificationBadgeVariant,
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerHeader,
  NotificationDrawerList,
  NotificationDrawerListItem,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
  TextArea,
  TextInput,
  ToolbarItem,
} from "@patternfly/react-core";
import React, { useEffect } from "react";
import logo from "../../images/png-transparent-orange-and-red-ribbon-logo-illustration-trophy-badge-ribbon-label-orange-removebg-preview Background Removed.png";
import { useMessage } from "../../MessageContext";
import { EllipsisVIcon, SearchIcon } from "@patternfly/react-icons";

interface AlertInfo {
  title: string;
  variant: AlertVariant;
  key: number;
  top: string;
}

const FinalCertificatePage: React.FC = () => {
  const { message } = useMessage();
  console.log(message);
  const [value, setValue] = React.useState("");
  const [descriptionValue, setDescriptionValue] = React.useState("");
  const [validated, setValidated] = React.useState<
    "default" | "error" | "warning" | "success" | undefined
  >("default");
  const [helperText, setHelperText] = React.useState("Share your thoughts.");
  const timerRef = React.useRef<number | null>(null);
  const simulateNetworkCall = (callback: Function) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, 2000);
  };

  const handleDescriptionTextAreaChange = (value: string) => {
    setDescriptionValue(value);
  };

  const handleTextAreaChange = (value: string) => {
    setValue(value);
    setValidated("default");
    setHelperText("Validating...");
    simulateNetworkCall(() => {
      if (value.length > 0) {
        if (value.length > 100) {
          setValidated("error");
          setHelperText(
            "You're being too brief, please enter at least 10 characters."
          );
        } else {
          setValidated("success");
          setHelperText("Thanks for your comments!");
        }
      }
    });
  };
  const [alerts, setAlerts] = React.useState<AlertInfo[]>([]);

  const addAlert = (alertInfo: AlertInfo) => {
    setAlerts((prevAlertInfo) => [...prevAlertInfo, alertInfo]);
    setAlerts((prevAlertInfo) => [
      ...prevAlertInfo,
      {
        title: "Your available balence is 300 points",
        variant: AlertVariant.warning,
        key: getUniqueId(),
        top: "150px",
      },
    ]);
  };

  const getUniqueId: () => number = () => new Date().getTime();

  const addSuccessAlert = () => {
    addAlert({
      title: "Your nomination will require total of 30points",
      variant: AlertVariant.success,
      key: getUniqueId(),
      top: "80px",
    });
  };

  return (
    <>
      <Flex
        justifyContent={{ default: "justifyContentSpaceAround" }}
        style={{ padding: "50px" }}
      >
        <FlexItem>
          <Form>
            <FormGroup label="Nominee">
              <LabelGroup
                style={{ width: "100%", height: "20px" }}
                categoryName=""
                numLabels={5}
                isEditable
              >
                {message.nomineeName.map((label: any, index: any) => (
                  <Label
                    style={{ height: "30px" }}
                    key={label}
                    id={label}
                    color="red"
                  >
                    {label}
                  </Label>
                ))}
              </LabelGroup>
            </FormGroup>
            <FormGroup
              label="Description of achievement"
              type="string"
              fieldId="selection"
            >
              <TextArea
                placeholder="Add text"
                style={{ width: "40rem", height: "80px" }}
                value={value}
                onChange={(_event, value) => handleTextAreaChange(value)}
                isRequired
                validated={validated}
                aria-label="invalid text area example"
              />
              <FormHelperText>
                <HelperText>
                  <HelperTextItem variant={validated}>
                    {helperText}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            </FormGroup>
            <FormGroup
              label="Message for Nominee(s)"
              type="string"
              fieldId="selection"
            >
              <TextArea
                style={{ width: "40rem", height: "80px" }}
                placeholder="Add text"
                value={descriptionValue}
                onChange={(_event, value) =>
                  handleDescriptionTextAreaChange(value)
                }
                isRequired
              />
            </FormGroup>
          </Form>
        </FlexItem>
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
              <b>{message?.data[message.selection].name}</b>
            </CardHeader>
            <CardBody style={{ textAlign: "center" } as React.CSSProperties}>
              <div>
                <b>
                  {message?.data[message?.selection].subCompetencies[
                    parseInt(message.isChecked)
                  ].name ||
                    message?.data[message?.selection].subCompetencies[0].name ||
                    ""}
                </b>
              </div>
              <div style={{ padding: "25px" }}>
                <Avatar size="xl" src={logo} alt={""} />
              </div>
              <div>
                <b>{`Points: ${message?.inputValue}`}</b>
              </div>
            </CardBody>
          </Card>
          <Flex
            style={{ marginTop: "25px" }}
            justifyContent={{ default: "justifyContentCenter" }}
          >
            <FlexItem>
              <Button variant="danger" isDanger onClick={addSuccessAlert}>
                Submit
              </Button>
            </FlexItem>
            <FlexItem>
              <Button variant="secondary" isDanger>
                Cancel
              </Button>
            </FlexItem>
            <AlertGroup
              isLiveRegion
              aria-live="polite"
              aria-relevant="additions text"
              aria-atomic="false"
            >
              {alerts.map(({ title, variant, key, top }) => (
                <Alert
                  variant={variant}
                  title={title}
                  key={key}
                  style={{
                    position: "absolute",
                    top: top,
                    width: "400px",
                    right: "0px",
                    margin: "20px",
                  }}
                />
              ))}
            </AlertGroup>
          </Flex>
        </FlexItem>
      </Flex>
    </>
  );
};

export default FinalCertificatePage;
