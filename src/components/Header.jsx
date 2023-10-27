import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)`
  background-color: #2196f3;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 0 10px;
`;

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Кассы", link: "/" },
    { text: "Приход", link: "/income" },
    { text: "Создать заявку на выдачу", link: "/createexpense" },
    { text: "Все заявки", link: "/expense" },
    { text: "Заявки на согласовании", link: "/waitingexpense" },
    { text: "Согласованные заявки", link: "/successexpense" },
    { text: "Отклоненные заявки", link: "/cancelexpense" },
  ];

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <i className="material-icons">Меню</i>
          </IconButton>
          <StyledLink to="auth/login">Выход</StyledLink>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.link}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
