import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Skeleton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { sentenceCase } from 'change-case';
import { Scrollbar } from '../../../components/atoms/Scrollbar';
import { FriendListHead } from './FriendListHead';
import { Label } from '../../../components/atoms/Label';
import { SearchNotFound } from '../../../components/atoms/SearchNotFound';
import { FriendMoreMenu } from './FriendMoreMenu';
import { FriendListToolbar } from './FriendListToolbar';
import { UserFull } from '../../../types/model.types';
import { applySortFilter, getComparator } from '../../../utils/compare.utils';
import { FRIENDS, USERS } from '../../../assets/mock/users.mock';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

const USERS_PER_PAGE = 4;

export const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<UserFull[] | undefined>();
  const [allUsers, setAllUsers] = useState<UserFull[] | undefined>();
  const [tabValue, setTabValue] = useState('1');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setFriends(FRIENDS);
      setAllUsers(USERS);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange}>
            <Tab label='My Friends' value='1' />
            <Tab label='All Users' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1' sx={{ p: 0 }}>
          <UserTable users={friends} />
        </TabPanel>
        <TabPanel value='2' sx={{ p: 0 }}>
          <UserTable users={allUsers} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

interface TableProps {
  users: UserFull[] | undefined;
}

const UserTable: React.FC<TableProps> = ({ users }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  const sortKey: keyof UserFull = 'firstName';
  const validUsers = users ?? [];
  const comparator = getComparator<UserFull>(order, orderBy);
  const filteredUsers = applySortFilter<UserFull>(validUsers, comparator, sortKey, filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelected = validUsers.map((n) => n.firstName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  return users ? (
    <>
      <FriendListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        onCreateDialog={() => {}}
      />
      <Scrollbar sx={{ height: 90 * USERS_PER_PAGE }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <FriendListHead
              order={order as 'asc' | 'desc'}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={validUsers.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * USERS_PER_PAGE, (page + 1) * USERS_PER_PAGE)
                .map((row) => {
                  const { id, firstName, lastName, email, role, status, avatarUrl } = row;
                  const isItemSelected = selected.indexOf(row[sortKey]) !== -1;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role='checkbox'
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox checked={isItemSelected} onClick={() => handleClick(firstName)} />
                      </TableCell>
                      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={firstName} src={avatarUrl} sx={{ mr: 2 }} />
                        <Typography variant='subtitle2' noWrap>
                          {firstName + ' ' + lastName}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>{email}</TableCell>
                      <TableCell align='left'>{role}</TableCell>
                      <TableCell align='left'>
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={(status === 'online' && 'success') || 'info'}
                        >
                          {sentenceCase(status)}
                        </Label>
                      </TableCell>
                      <TableCell align='right'>
                        <FriendMoreMenu userName={firstName} onDelete={() => {}} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      {validUsers.length > 0 && !isNotFound && (
        <TablePagination
          component='div'
          count={filteredUsers.length}
          rowsPerPage={USERS_PER_PAGE}
          rowsPerPageOptions={[]}
          page={page}
          onPageChange={(e, page) => setPage(page)}
        />
      )}
    </>
  ) : (
    <>
      <Skeleton height={90} />
      <Skeleton height={80} />
      <Skeleton variant={'rectangular'} height={330} sx={{ mt: 1 }} />
    </>
  );
};
