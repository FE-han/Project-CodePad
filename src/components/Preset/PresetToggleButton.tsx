import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Fonts, ToggleBtnColors } from "../../utils/CommonStyle";

import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";

import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const Tab = styled(TabUnstyled)`
  width: 100%;
  font-family: ${Fonts.TITLE};
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${ToggleBtnColors.BACKGROUND};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 1px solid ${ToggleBtnColors.BORDER};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${ToggleBtnColors.BACKGROUND};
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${ToggleBtnColors.HOVER};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function PresetToggleButton(props: { type: number }) {
  const navigate = useNavigate();

  return (
    <TabsUnstyled defaultValue={props.type}>
      <TabsList>
        <Tab
          onClick={() => {
            navigate("/defaultpresets/enter");
          }}
        >
          Default Presets
        </Tab>
        <Tab
          onClick={() => {
            navigate("/mypresets/enter");
          }}
        >
          My Presets
        </Tab>
      </TabsList>
    </TabsUnstyled>
  );
}
