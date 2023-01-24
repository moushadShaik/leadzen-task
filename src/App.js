import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CardDetails from "./components/CardDetail";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function App() {

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <Box m={5} sx={{ display: 'flex', flexDirection: "column", gap: '15px' }}>
      {currentItems.map((user) => <CardDetails 
      key={user.id}
      company={user.company} 
      name={user.name}
      address={user.address}
      email={user.email}
      phone={user.phone}
      />)}
      <Stack alignItems={'center'}>
        <Pagination
        shape="rounded"
           count={4}
           onChange={(event, page) => setCurrentPage(page)}
           page={currentPage}
          sx={{
            '.Mui-selected': {
              backgroundColor: '#f44336'
            }
            
          }}
        />
      </Stack>
    </Box>
  );
}

export default App;