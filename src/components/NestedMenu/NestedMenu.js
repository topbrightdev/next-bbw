import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ListGroup, Collapse, Carousel } from "react-bootstrap";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import GlobalContext from "../../context/GlobalContext";
import { useRouter } from "next/router";
import BusinessNotAuthenticated from "../../sections/landing3/BusinessNotAuthenticated";
import PartnerNotAuthenticated from "../../sections/landing3/PartnerNotAuthenticated";
const NestedMenuContainer = styled.div`
  a,
  .label {
    color: ${({ dark, theme }) => (dark ? theme.colors.light : theme.colors.heading)}!important;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease-out;
    &:hover,
    &:active {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }
  }

  .list-group-item {
    & + .collapse:not(.show) {
      .list-group-item {
        border: none !important;
        border-width: 0 !important;
      }
    }
    & + .collapse.show {
      .list-group-item {
        &:first-child {
          border-top: none !important;
        }
      }
    }
  }
  .collapse + .list-group-item {
    border-top-width: 0;
  }
  /* .list-group-flush:last-child .list-group-item:last-child {
    border-bottom-width: 1px;
  } */
`;

const defaultMenuItems = [
  { name: "businesses", label: "Businesses" },
  {
    name: "billing",
    label: "Billing",
    items: [
      { name: "statements", label: "Statements" },
      { name: "reports", label: "Reports" },
    ],
  },
  {
    name: "settings",
    label: "Settings",
    items: [
      { name: "profile", label: "Profile" },
      { name: "insurance", label: "Insurance" },
      {
        name: "notifications",
        label: "Notifications",
        items: [
          { name: "email", label: "Email" },
          {
            name: "desktop",
            label: "Desktop",
            items: [
              { name: "schedule", label: "Schedule" },
              { name: "frequency", label: "Frequency" },
            ],
          },
          { name: "sms", label: "SMS" },
        ],
      },
    ],
  },
];

const MenuItem = ({ label, isExternal = false, name, items, depthStep = 20, depth = 0, handleLinkClick, currentUser, ...rest }) => {
  const [open, setOpen] = useState(false);
  const hasSubItems = Array.isArray(items);
  const gContext = useContext(GlobalContext);
  const router = useRouter();
  const handleScheduleCall = () => {
    if (gContext.visibleOffCanvas) {
      gContext.toggleOffCanvas();
    }
    gContext.toggleScheduleCall();
  };
  const handleLearnMore = (route) => {
    if (gContext.visibleOffCanvas) {
      gContext.toggleOffCanvas();
    }
    router.push(route);
  };

  return (
    <>
      {hasSubItems ? (
        <ListGroup.Item
          {...rest}
          css={`
            padding-left: ${depth * depthStep}px !important;
            cursor: pointer;
          `}
          onClick={() => setOpen(!open)}
          className="d-flex align-items-center justify-content-between"
        >
          <span className="label">{label}</span>
          <span>{open ? <FaAngleDown /> : <FaAngleRight />}</span>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item
          {...rest}
          css={`
            padding-left: ${depth * depthStep}px !important;
          `}
        >
          {isExternal ? (
            <a
              href={`${name}`}
              onClick={() => {
                if (gContext.visibleOffCanvas) {
                  gContext.toggleOffCanvas();
                }
              }}
            >
              {label}
            </a>
          ) : currentUser ? (
            <a className={`${name === "schedule-a-call" ? "d-none" : "nav-link"}`} onClick={() => handleLinkClick(name)}>
              {label}
            </a>
          ) : name === "our-businesses" ? (
            <Carousel controls={false}>
              <Carousel.Item>
                <BusinessNotAuthenticated
                  handleScheduleCall={handleScheduleCall}
                  handleLearnMore={() => handleLearnMore("/our-businesses")}
                />
              </Carousel.Item>

              <Carousel.Item>
                <PartnerNotAuthenticated
                  handleScheduleCall={handleScheduleCall}
                  handleLearnMore={() => handleLearnMore("/our-partners")}
                />
              </Carousel.Item>
            </Carousel>
          ) : name === "login" ? (
            <a className="nav-link" onClick={() => handleLinkClick(name)}>
              {label}
            </a>
          ) : null}
        </ListGroup.Item>
      )}

      {hasSubItems ? (
        <Collapse in={open}>
          <ListGroup>
            {items.map((subItem) => (
              <MenuItem key={subItem.name} depth={depth + 1} depthStep={depthStep} {...subItem} />
            ))}
          </ListGroup>
        </Collapse>
      ) : null}
    </>
  );
};

const NestedMenu = ({ menuItems = defaultMenuItems }) => {
  const gContext = useContext(GlobalContext);
  const user = gContext.currentUser;
  const router = useRouter();
  const handleLinkClick = (name) => {
    if (gContext.visibleOffCanvas) {
      gContext.toggleOffCanvas();
    }

    if (user) {
      router.push("/" + name);
    }
  };
  return (
    <NestedMenuContainer>
      <ListGroup variant="flush">
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={`${menuItem.name}${index}`}
            depthStep={20}
            depth={0}
            {...menuItem}
            handleLinkClick={handleLinkClick}
            currentUser={user}
          />
        ))}
      </ListGroup>
    </NestedMenuContainer>
  );
};

export default NestedMenu;
