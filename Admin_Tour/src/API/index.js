const token = localStorage.getItem('token');

export const createTour = (formData) => {
  const token = localStorage.getItem("token");
  return fetch("http://localhost:4000/admin/createtour", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error.message || "Create tour failed");
    });
};


export const updateTour = (_id, updateFields) => {
  return fetch(`http://localhost:4000/admin/updatetour/${_id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateFields),
  })
  .then((res) => res.json())
  .catch((error) => {
    throw new Error(error.message || 'Update tour failed');
  });
};

export const deleteTour = (_id) => {
  return fetch(`http://localhost:4000/admin/deletetour/${_id}`, {
    method: 'DELETE',
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  .then((res) => res.json())
  .catch((error) => {
    throw new Error(error.message || 'Delete tour failed');
  });
};


export const deleteUser = (_id) => {
  return fetch(`http://localhost:4000/admin/deleteuser/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error.message || 'Delete user failed');
    });
};
export const getAllTour = async () => {
    // Lấy token từ local storage
    const token = localStorage.getItem('token');

    try {
        const response = await fetch("http://localhost:4000/admin/getalltour", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getAllUser = async () => {
    // Lấy token từ local storage
    const token = localStorage.getItem('token');

    try {
        const response = await fetch("http://localhost:4000/admin/getalluser", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getAllBooking = async () => {
    // Lấy token từ local storage
    const token = localStorage.getItem('token');

    try {
        const response = await fetch("http://localhost:4000/admin/getallbooking", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getSingleTour = async (_id) => {
  // Lấy token từ local storage
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:4000/api/v1/tour/${_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tour data');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error;
  }
};


