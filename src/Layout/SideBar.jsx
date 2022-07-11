import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Divider from '@material-ui/icons/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
import Search from '@material-ui/icons/Search';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Collapse } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../App';

export default function SideBar() {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const history = useHistory()

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#625038', color: '#fff' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {
            loggedInUser.user.isAdmin &&
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: "#fff"}}>
                    <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText onClick={() => {history.push("/all-users")}} primary="All Users" />
              </ListItemButton>
            </ListItem>
          }
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color: "#fff"}}>
                <AddCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/add-payment")}} primary="Add Payment" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color: "#fff"}}>
                  <AddCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/spent-money")}} primary="Spent Money ( Expenditure )" />
            </ListItemButton>
          </ListItem>
          {
            loggedInUser.user.isAdmin &&
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: "#fff"}}>
                    <AddCircleOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText onClick={() => {history.push("/register-product-or-service")}} primary="Register a Product / Service" />
              </ListItemButton>
            </ListItem>
          }
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color: "#fff"}}>
                  <AddCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/add-expense-item")}} primary="Add Expense Item" />
            </ListItemButton>
          </ListItem>
          {
            loggedInUser.user.isAdmin &&
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: "#fff"}}>
                    <AddCircleOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText onClick={() => {history.push("/add-a-new-customer")}} primary="Add a New Customer" />
              </ListItemButton>
            </ListItem>
          }
         
          {
            loggedInUser.user.isAdmin &&
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: "#fff"}}>
                    <ListAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText onClick={() => {history.push("/all-products-or-services")}} primary="All Products / Services" />
              </ListItemButton>
            </ListItem>
          }
          
          {
            loggedInUser.user.isAdmin &&
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: "#fff"}}>
                      <ListAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText onClick={() => {history.push("/all-customers")}} primary="All Customers" />
              </ListItemButton>
            </ListItem>
          }
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color: "#fff"}}>
                    <ListAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/all-expense-items")}} primary="All Expense Items" />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon sx={{color: '#fff'}}>
              <AssessmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Income Reports" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/income-today")}} primary="Today" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/income-yesterday")}} primary="Yesterday" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/income-this-week")}} primary="This Week" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/income-last-week")}} primary="Last Week" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/income-this-month")}} primary="This Month" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/income-last-month")}} primary="Last Month" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick2}>
            <ListItemIcon sx={{color: '#fff'}}>
              <AssessmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Expenditure Reports" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/expenditure-today")}} primary="Today" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/expenditure-yesterday")}} primary="Yesterday" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/expenditure-this-week")}} primary="This Week" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/expenditure-last-week")}} primary="Last Week" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/expenditure-this-month")}} primary="This Month" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{color: "#fff"}}>
                    <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={() => {history.push("/expenditure-last-month")}} primary="Last Month" />
              </ListItemButton>
            </List>
          </Collapse>
          
        </List>
      </nav>
    </Box>
  );
}
