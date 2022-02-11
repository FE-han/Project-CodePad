import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { useLocation } from 'react-router-dom';

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

const toggleDefaultValue:toggleDefaultValueTypes = {
  defaultpresets: 0,
  mypresets: 1,
}

type toggleDefaultValueTypes = {
  [index: string]: number,
  defaultpresets: number,
  mypresets: number
}

export default function PresetToggleButton() {
  const location = useLocation();
  const currPath = location.pathname.split("/")[1];

  return (
          <TabsUnstyledWrap defaultValue={toggleDefaultValue[currPath]}>
            <TabsList>
              <Tab>Default Presets</Tab>
              <Tab>My Presets</Tab>
            </TabsList>
          </TabsUnstyledWrap>
  );
}