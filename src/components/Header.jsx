import React, { useEffect, useState } from "react";
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
import useTokenStore from "../store/store";
import { jwtDecode } from "jwt-decode";

const StyledAppBar = styled(AppBar)`
  background-color: #2196f3;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 0 10px;
`;

const Header = () => {
  const [role, setRole] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { token, clearToken } = useTokenStore();

  useEffect(() => {
    // Получите токен из вашего источника данных, например, из Cookies или Local Storage.

    if (token) {
      try {
        // Декодируйте токен и извлеките полезную нагрузку (payload).
        const decoded = jwtDecode(token);
        const userRole = decoded.role; // Извлекаем 'role' из полезной нагрузки

        // Установите 'role' в состояние компонента.
        setRole(userRole);
      } catch (error) {
        // Обработайте ошибку, если декодирование токена не удалось.
        console.error("Ошибка при декодировании токена:", error);
      }
    }
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const generateMenuItems = (role) => {
    switch (role) {
      case "Admin":
        return [
          { text: "Кассы", link: "/" },
          { text: "Приход", link: "/income" },
          { text: "Создать заявку на выдачу", link: "/createexpense" },
          { text: "Все заявки", link: "/expense" },
          { text: "Заявки на согласовании", link: "/waitingexpense" },
          { text: "Согласованные заявки", link: "/successexpense" },
          { text: "Отклоненные заявки", link: "/cancelexpense" },
          { text: "Сотрудники", link: "/employee" },
        ];

      case "Director":
        return [
          { text: "Кассы", link: "/" },
          { text: "Все заявки", link: "/expense" },
          { text: "Заявки на согласовании", link: "/waitingexpense" },
          { text: "Согласованные заявки", link: "/successexpense" },
          { text: "Отклоненные заявки", link: "/cancelexpense" },
        ];
      case "cashierIncome":
        return [
          { text: "Кассы", link: "/" },
          { text: "Приход", link: "/income" },
          { text: "Сотрудники", link: "/employee" },
        ];
      case "cashierExpense":
        return [
          { text: "Кассы", link: "/" },
          { text: "Создать заявку на выдачу", link: "/createexpense" },
          { text: "Все заявки", link: "/expense" },
          { text: "Заявки на согласовании", link: "/waitingexpense" },
          { text: "Согласованные заявки", link: "/successexpense" },
          { text: "Отклоненные заявки", link: "/cancelexpense" },
          { text: "Сотрудники", link: "/employee" },
        ];
      default:
        return [{ text: "Заявки на согласовании", link: "/waitingexpense" }];
    }
  };

  const userMenuItems = generateMenuItems(role);

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
          <StyledLink to="auth/login" onClick={clearToken}>
            Выход
          </StyledLink>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {userMenuItems.map((item) => (
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
