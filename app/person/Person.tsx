"use client";
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

interface PersonProps {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
}

const Person: React.FC = () => {
  const [personData, setPersonData] = useState<PersonProps[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<PersonProps>({
    id: 0,
    firstname: '',
    lastname: '',
    phone: '',
  });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/people');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPersonData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/people/${id}`, {
        method: 'DELETE',
      });
      setPersonData(personData.filter((person) => person.id !== id));
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleEdit = (person: PersonProps) => {
    setFormData(person);
    setShowEditForm(true);
  };

  const handleCreate = () => {
    setFormData({
      id: 0,
      firstname: '',
      lastname: '',
      phone: '',
    });
    setShowCreateForm(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (formData.id === 0) {
        await fetch('/api/people', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`/api/people/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      setShowEditForm(false);
      setShowCreateForm(false);
      fetchData(); // Fetch data after successful POST or PUT
    } catch (error) {
      console.error('Error creating/updating person:', error);
    }
  };

  if (personData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  First Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Last Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personData.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.firstname}</TableCell>
                <TableCell>{person.lastname}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(person.id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleEdit(person)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showEditForm && (
        <form onSubmit={handleSubmit} style={{ zIndex: 2, position: 'relative' }}>
          <input
            type="text"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
          <input
            type="text"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Button
            type="submit"
          >
            Save
          </Button>
          <Button onClick={() => setShowEditForm(false)}>Cancel</Button>
        </form>
      )}

      {showCreateForm && (
        <form onSubmit={handleSubmit} style={{ zIndex: 2, position: 'relative' }}>
          <input
            type="text"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
          <input
            type="text"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Button type="submit">Create</Button>
          <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
        </form>
      )}
      <Button onClick={handleCreate}>Create</Button>
    </div>
  );
};

export default Person;
