import React, { useEffect, useState } from 'react';
import {
  useGetAllExpenses,
  useSpendFromCash,
  useUpdateExpenseStatus,
} from '../../hook/useExpense';
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import OpenImage from '../OpenImage/OpenImage';
import { useGetAllEmployee } from '../../../Employee/hook/useEmployee';
import { BASE_URL } from '../../../../../env';

const ExpenseReports = () => {
  const { data } = useGetAllExpenses();
  const [arrayExpense, setArrayExpense] = useState([]);
  const [total, setTotal] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const { data: employees } = useGetAllEmployee();

  useEffect(() => {
    let filteredByEmployee; // Объявите переменную заранее
    if (data) {
      // Apply status filter
      const pendingExpenses = data.filter(
        (expense) => expense.status === 'Выдано'
      );

      // Apply date range filter
      const filteredByDate = pendingExpenses.filter((expense) => {
        if (startDate && endDate) {
          const expenseDate = new Date(expense.updatedAt);
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          // Check if the expense date is within the selected range
          return expenseDate >= start && expenseDate <= end;
        }

        // If only one date is selected, include expenses on that date
        if (startDate) {
          const start = new Date(startDate);
          const expenseDate = new Date(expense.updatedAt);
          return (
            expenseDate >= start &&
            expenseDate <= new Date(start.getTime() + 86400000)
          );
        }

        if (endDate) {
          const end = new Date(endDate);
          const expenseDate = new Date(expense.updatedAt);
          end.setHours(23, 59, 59, 999);
          return (
            expenseDate <= end &&
            expenseDate >= new Date(end.getTime() - 86400000)
          );
        }

        return true; // If no date range is selected, include all expenses
      });

      // Apply employee filter
      if (filteredByDate) {
        filteredByEmployee = filteredByDate.filter((expense) => {
          if (employeeId) {
            return expense.employee_id === parseInt(employeeId, 10);
          }
          return true; // If no employee is selected, include all expenses
        });

        setArrayExpense(filteredByEmployee);
      } else {
        filteredByEmployee = pendingExpenses.filter((expense) => {
          if (employeeId) {
            return expense.employee_id === parseInt(employeeId, 10);
          }
          return true; // If no employee is selected, include all expenses
        });

        setArrayExpense(filteredByEmployee);
      }
    }
    if (filteredByEmployee) {
      const result = filteredByEmployee.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      setTotal(result);
    }
  }, [data, startDate, endDate, employeeId]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);

  const handleEmployeeSelect = (event) => {
    setEmployeeId(event.target.value); // Обновите employee_id при выборе значения
    console.log(event.target.value);
  };

  const handleOpen = (url) => {
    setOpen(true);
    setUrl(url);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сбросьте страницу на первую при изменении количества строк на странице
  };

  // Пересчитываем отображаемые данные на основе page и rowsPerPage
  const indexOfLastRow = (page + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  let displayedData = [];

  if (data) {
    displayedData = arrayExpense
      .slice() // Клонируем данные, чтобы избежать изменения исходного массива
      .slice(indexOfFirstRow, indexOfLastRow);
  }

  return (
    <>
      <OpenImage open={open} setOpen={setOpen} url={url} />
      <Typography
        variant="h4"
        sx={{
          color: 'green',
          textAlign: 'center',
          margin: '10px auto',
        }}
      >
        Выданные заявки
      </Typography>

      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '10px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'green',
            textAlign: 'center',
          }}
        >
          Фильтры
        </Typography>
        <Grid
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '15px',
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '50%',
            }}
          >
            <InputLabel>Дата от:</InputLabel>
            <TextField
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              width: '50%',
            }}
          >
            <InputLabel>Дата до:</InputLabel>
            <TextField
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          <Grid
            sx={{
              width: '100%',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="Employee-simple-select-label">
                Сотрудник
              </InputLabel>
              <Select
                labelId="Employee-simple-select-label"
                id="Employee-simple-select"
                value={employeeId} // Используйте значение employeeId
                label="Сотрудник"
                onChange={handleEmployeeSelect} // Обновляйте employeeId при изменении
              >
                {employees &&
                  employees.map((employee) => (
                    <MenuItem value={employee.id} key={employee.id}>
                      {employee.full_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Alert
              severity="success"
              sx={{
                justifyContent: 'center',
              }}
            >
              Итог расхода по заданным фильтрам : {total}
            </Alert>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ margin: '0 auto', maxWidth: '1200px', overflowX: 'auto' }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: '#e0e0e0',
            }}
          >
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Касса</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Сумма в кассе</TableCell>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Основание</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Скан</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData &&
              displayedData.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.registerNumber}</TableCell>
                  <TableCell>{expense.cashes.name}</TableCell>
                  <TableCell>{expense.amount}₽</TableCell>
                  <TableCell>{expense.cashes.balance}₽</TableCell>
                  <TableCell>{expense.employee.full_name}</TableCell>
                  <TableCell>{expense.reason}</TableCell>
                  <TableCell>{expense.timestamp}</TableCell>
                  <TableCell>
                    <img
                      src={`${BASE_URL}/${expense.imagePaths[0]}`}
                      alt={expense.imagePaths[0]}
                      width={100}
                      onClick={() => handleOpen(expense.imagePaths[0])} // Открывайте окно при клике
                      style={{ cursor: 'pointer' }} // Стиль указывающий на кликабельность
                    />
                  </TableCell>
                  <TableCell>{expense.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {arrayExpense && (
          <TablePagination
            component="div"
            count={arrayExpense ? arrayExpense.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // Добавьте page и rowsPerPageOptions как указано ниже
            rowsPerPageOptions={[5, 10, 25, 50]} // Это настройки количества строк на странице
          />
        )}
      </TableContainer>
    </>
  );
};

export default ExpenseReports;
