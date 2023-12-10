"use client"
import React, { useEffect, useState } from 'react';

interface PersonProps {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
}

const Person: React.FC<PersonProps> = ({ id, firstname, lastname, phone }) => {
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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">First Name</th>
                        <th className="px-4 py-2">Last Name</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {personData.map((person) => (
                        <tr key={person.id}>
                            <td className="border px-4 py-2">{person.firstname}</td>
                            <td className="border px-4 py-2">{person.lastname}</td>
                            <td className="border px-4 py-2">{person.phone}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleDelete(person.id)}>Delete</button>
                                <button onClick={() => handleEdit(person)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditForm && (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Save</button>
                </form>
            )}

            {showCreateForm && (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Create</button>
                </form>
            )}

            <button onClick={handleCreate}>Create</button>
        </div>
    );
};

export default Person;