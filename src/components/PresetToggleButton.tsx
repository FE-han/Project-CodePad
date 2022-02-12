import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Link } from "react-router-dom";

const TabsUnstyledWrap = styled(TabsUnstyled)`
  width: 100%;
  height: 100%;
  display: flex;
  background-Color: gray;
`;

const TabsList = styled(TabsListUnstyled)`
  width: 80%;
  margin-Left: auto;
  margin-Right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const Tab = styled(TabUnstyled)`
  height: 80px;
  color: lightgray;
  cursor: pointer;
  font-weight: bold;
  width: 50%;
  border: 1px solid lightgray;
  background-color: transparent;

  font-size: 1.25rem;

  &.${tabUnstyledClasses.selected} {
    background-color: lightgray;
    color: black;
  }
`;


export default function PresetToggleButton() {
    return (
            <TabsUnstyledWrap defaultValue={0}>
              <TabsList>
                <Tab>Default Presets</Tab>
                <Tab>My Presets</Tab>
              </TabsList>
            </TabsUnstyledWrap>
    );
}

