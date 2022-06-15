/** @jsxImportSource @emotion/react */
import styled, { CSSObject } from "@emotion/styled";
import { ReactElement, useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiCheck, mdiChevronDown, mdiSquareOutline } from "@mdi/js";

declare const BIcon: any;
declare const BInput: any;

type value = {
  value: string | number;
  label: string;
};

type groupValue = {
  option_group_label: string;
  options: value[];
};

const MainContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  color: #4a4a4a;
  display: block;
  border-style: solid;
  border-width: 1px;
  border-color: #d6d6d6;
  padding: 2px 5px 5px 5px;
`;

type CollectedItemsContainerProp = {
  height?: number;
};

const CollectedItemsContainer = styled("div")<CollectedItemsContainerProp>(
  {
    backgroundColor: "white",
    color: "#4a4a4a",
    display: "flex",
    flexWrap: "wrap",
    borderColor: "#d6d6d6",
    overflowY: "auto",
  },
  (props: CollectedItemsContainerProp): CSSObject => {
    return {
      height: (props.height || 5) + "rem",
    };
  }
);

const CollectedItemTag = styled.div`
  background-color: #dfeeff;
  color: #272727;
  font-size: 15px;
  height: fit-content;
  padding: 2px 6px;
  border-radius: 2px;
  margin: 5px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background-color: #c0d1e6;
  }
`;

const CollectedItemTagDeleteButton = styled.span`
  transform: rotate(45deg) scale(1.5) translate(-0.5px, -0.5px);
  display: inline-block;
  margin-right: 5px;
  font-weight: 400;
  &:hover {
    font-weight: 650;
  }
`;

type SelectContainerProp = {
  focussed: boolean;
  onClick?: any;
};

const SelectContainer = styled("div")<SelectContainerProp>(
  {
    backgroundColor: "white",
    borderRadius: "6px",
    borderStyle: "solid",
    borderWidth: "1px",
    color: "#4a4a4a",
    padding: "0.1rem 0.8rem",
    cursor: "pointer",
    minHeight: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  (props: SelectContainerProp): CSSObject => {
    return {
      borderColor: props.focussed ? "#5a65ff" : "#d6d6d6",
      "&:hover": {
        borderColor: props.focussed ? "#5a65ff" : "#aeaeae",
        ".iconContainer": {
          opacity: 1,
        },
      },
    };
  }
);

const IconContainer = styled.div`
  opacity: 0.7;
`;

type listDropdownProp = {
  shown: boolean;
  dropdownMaxHeight?: number;
  selectContainerHeight?: number;
  showCollectedTags?: boolean;
};

const ListDropdown = styled("div")<listDropdownProp>(
  {
    position: "absolute",
    padding: "0.3rem 0rem",
    left: "-3px",
    right: "-3px",
    zIndex: 1,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    borderRadius: "3px",
    transition: "all 0.5s",
    transitionProperty: "opacity, max-height",
  },
  (props: listDropdownProp): CSSObject => {
    return {
      top: props.showCollectedTags
        ? "-3px"
        : `${props.selectContainerHeight}px`,
      maxHeight: props.shown
        ? props.dropdownMaxHeight
          ? `${props.dropdownMaxHeight + 4}rem`
          : "20rem"
        : "0rem",
      opacity: props.shown ? 1 : 0,
    };
  }
);

type ListDropdownScrolledWrapperProp = {
  shown: boolean;
  dropdownMaxHeight?: number;
};

const ListDropdownScrolledWrapper = styled(
  "div"
)<ListDropdownScrolledWrapperProp>(
  {
    overflowY: "scroll",
    transition: "max-height 0.5s",
  },
  (props: ListDropdownScrolledWrapperProp): CSSObject => {
    return {
      maxHeight: props.shown
        ? props.dropdownMaxHeight
          ? `${props.dropdownMaxHeight}rem`
          : "16rem"
        : "0rem",
    };
  }
);

type ListItemProps = {
  selected?: boolean;
  displayed: boolean;
  grouped?: boolean;
  isGroupTitle?: boolean;
};

const ListItem = styled("div")<ListItemProps>(
  {
    position: "relative",
    padding: "0.25rem 0.3rem",
  },
  (props: ListItemProps): CSSObject => {
    return {
      display: props.displayed ? "" : "none",
      cursor: props.isGroupTitle ? "default" : undefined,
      paddingLeft: props.grouped
        ? !props.isGroupTitle
          ? "0.25rem"
          : "1rem"
        : undefined,
      color: props.isGroupTitle ? "black" : "#5a65ff",
      fontWeight: props.isGroupTitle ? "bold" : undefined,
      background: props.selected
        ? "linear-gradient(180deg, rgba(238,238,238,1) 0%, rgba(238,238,238,1) 60%, rgba(230,230,230,1) 100%)"
        : "white",
      "&:hover": {
        background: props.isGroupTitle
          ? undefined
          : `
            linear-gradient(
              180deg,
              rgba(238, 238, 238, 1) 0%,
              rgba(238, 238, 238, 1) 60%,
              rgba(230, 230, 230, 1) 100%
            )
          `,
      },
    };
  }
);

const ListItemIconContainer = styled.span`
  color: #929292;
  padding: 0 0.65rem;
  position: relative;
`;

type propsType = {
  values: value[] | groupValue[];
  placeHolder: string;
  onInput: any;
  value: (string | number)[];
  showSearchBar?: boolean;
  showCollectedTags?: boolean;
  collectedTagsContainerHeight?: number;
  dropdownMaxHeight?: number;
};

const CustomMultipleSelect = (props: propsType): ReactElement => {
  const [showLists, setShowLists] = useState(false);

  const [selectOnfocus, setSelectOnFocus] = useState(false);

  const [originalIndexedValues, setOriginalIndexedValues] = useState(
    [] as (any | undefined)[]
  );

  const [selectContainerHeight, setSelectContainerHeight] = useState(0);

  const [valueObjects, setValueObjects] = useState([] as value[]);

  const [isGrouped, setIsGrouped] = useState(false);

  const [searchListInputValue, setSearchListInputValue] = useState("");

  const SelectContainerRef = useRef(null as any);

  useEffect(() => {
    const SelectContainerComponentHeight =
      SelectContainerRef.current.offsetHeight;
    console.log({ SelectContainerComponentHeight, selectContainerHeight });
    if (SelectContainerComponentHeight !== selectContainerHeight) {
      setSelectContainerHeight(SelectContainerComponentHeight);
    }
  });

  useEffect(() => {
    const values = props.values.flatMap((objValue: value | groupValue) => {
      if ("option_group_label" in objValue) {
        const groupValues = objValue.options.map(
          (objOption: value) => objOption
        );
        groupValues.unshift({
          value: "",
          label: objValue.option_group_label,
        });
        return groupValues;
      } else {
        return objValue;
      }
    });

    const valuesForOriginalIndexing = props.values.flatMap(
      (objValue: value | groupValue) => {
        if ("option_group_label" in objValue) {
          const groupValues = objValue.options.map(
            (objOption: value) => objOption.value
          );
          groupValues.unshift("");
          return groupValues;
        } else {
          return objValue.value;
        }
      }
    );

    const tempIndexedValues = valuesForOriginalIndexing.map((item) => {
      if (props.value.includes(item)) return item;
      return undefined;
    });

    setValueObjects(values);
    setIsGrouped("option_group_label" in props.values[0]);
    setOriginalIndexedValues(tempIndexedValues);
  }, [props.values]);

  const handleOnInput = (event: any) => {
    setSearchListInputValue(event.target.value);
  };

  const allElements = document.querySelectorAll(
    "body * :not(.select-multiple)"
  );
  allElements.forEach((element) => {
    element.addEventListener("click", () => {
      setShowLists(false);
      setSelectOnFocus(false);
    });
  });

  const displaySelectedItems = (): string | ReactElement[] => {
    if (
      originalIndexedValues.every((item) => !item) ||
      props.showCollectedTags
    ) {
      return props.placeHolder;
    }

    const collectedItems = originalIndexedValues.flatMap((item, index) => {
      if (item) {
        return renderCollectedItemTag(item, index);
      } else {
        return [];
      }
    });

    return collectedItems;
  };

  const showListItems = (event: any) => {
    event.stopPropagation();
    setShowLists(true);
    setSelectOnFocus(true);
  };

  const selectItem = (item: string | number, index: number): void => {
    let tempItems = [...originalIndexedValues];
    if (tempItems.includes(item)) {
      tempItems[index] = undefined;
    } else {
      tempItems[index] = item;
    }
    tempItems = tempItems.filter((item) => item);
    props.onInput(tempItems);
  };

  const renderLists = (): ReactElement => {
    return (
      <div>
        <ListDropdown
          shown={showLists}
          dropdownMaxHeight={props.dropdownMaxHeight}
          showCollectedTags={props.showCollectedTags}
          selectContainerHeight={selectContainerHeight}
        >
          {props.showSearchBar && (
            <ListItem displayed>
              <input
                type="text"
                value={searchListInputValue}
                onInput={handleOnInput}
                css={{ width: "100%" }}
              />
            </ListItem>
          )}
          <ListDropdownScrolledWrapper
            shown={showLists}
            dropdownMaxHeight={props.dropdownMaxHeight}
          >
            {valueObjects.map((item, index) => {
              return (
                <ListItem
                  key={item.label}
                  grouped={isGrouped}
                  isGroupTitle={!item.value}
                  displayed={valueObjects[index].label
                    .toLowerCase()
                    .includes(searchListInputValue)}
                  selected={originalIndexedValues.includes(item.value)}
                  onClick={(): void => {
                    selectItem(item.value, index);
                  }}
                >
                  {item.value && (
                    <ListItemIconContainer>
                      <Icon
                        size={1}
                        style={{
                          transform:
                            "translateY(3px) " +
                            (originalIndexedValues.includes(item.value)
                              ? "translateX(-3px) rotate(35deg)"
                              : ""),
                          opacity: originalIndexedValues.includes(item.value)
                            ? 0
                            : 1,
                          transition: "all 0.2s",
                        }}
                        path={mdiSquareOutline}
                      />
                      <Icon
                        size={1}
                        style={{
                          color: "#5a65ff",
                          position: "absolute",
                          left: "25%",
                          transform:
                            "translateY(3px) " +
                            (originalIndexedValues.includes(item.value)
                              ? ""
                              : "translateX(-3px) rotate(-35deg)"),
                          opacity: originalIndexedValues.includes(item.value)
                            ? 1
                            : 0,
                          transition: "all 0.2s",
                        }}
                        path={mdiCheck}
                      />
                    </ListItemIconContainer>
                  )}
                  <span>{valueObjects[index].label}</span>
                </ListItem>
              );
            })}
          </ListDropdownScrolledWrapper>
        </ListDropdown>
      </div>
    );
  };

  const renderCollectedItemTag = (
    item: string | number,
    index: number
  ): ReactElement => {
    return (
      <CollectedItemTag key={item}>
        <CollectedItemTagDeleteButton
          onClick={(event: any): void => {
            event.stopPropagation();
            selectItem(item, index);
          }}
        >
          +
        </CollectedItemTagDeleteButton>
        {item}
      </CollectedItemTag>
    );
  };

  const renderSelectSearchContainer = (): ReactElement => {
    return (
      <SelectContainer
        ref={SelectContainerRef}
        focussed={selectOnfocus}
        className="select-multiple"
        onClick={showListItems}
      >
        <span style={{ display: "inherit", flexWrap: "wrap" }}>
          {displaySelectedItems()}
          {renderLists()}
        </span>
        <IconContainer className="icon-container">
          <Icon path={mdiChevronDown} />
        </IconContainer>
      </SelectContainer>
    );
  };

  const renderCollectedItems = (): ReactElement => {
    return (
      <CollectedItemsContainer height={props.collectedTagsContainerHeight}>
        {originalIndexedValues.flatMap((item, index) => {
          if (item) {
            return renderCollectedItemTag(item, index);
          } else {
            return [];
          }
        })}
      </CollectedItemsContainer>
    );
  };

  if (props.showCollectedTags) {
    return (
      <MainContainer>
        {renderCollectedItems()}
        {renderSelectSearchContainer()}
      </MainContainer>
    );
  } else {
    return renderSelectSearchContainer();
  }
};

// class CustomMultipleSelec extends TComponent{

//   public updated() {
//     const SelectContainerComponentHeight =
//       this.SelectContainer.$el.offsetHeight;
//     if (SelectContainerComponentHeight !== this.selectContainerHeight) {
//       this.selectContainerHeight = SelectContainerComponentHeight;
//     }
//   }
// }

export { CustomMultipleSelect };
