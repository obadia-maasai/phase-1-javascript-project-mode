function fetchLeaveRequests() {
  fetch('http://localhost:3000/leaveRequests')
    .then(response => response.json())
    .then(data =>{
      console.log('fetched data:',data);
     displayLeaveRequests(data);
    }) 
    .catch(error => console.error('Error fetching leave requests:', error));
}

  const calculateDuration = () => {
let startDate = document.getElementById("start-date").value;
let endDate = document.getElementById("end-date").value;
    const start = new Date(startDate);
    const end = new Date(endDate);
    let difference = end.getTime()-start.getTime();
    let numberOfDays=(difference/(1000*3600*24));
    console.log(numberOfDays);
   const duration = document.getElementById("duration");
   duration.value = (numberOfDays);
   
    // Calculate working days between start and end dates (excluding weekends and holidays)
    // const holidays = ['2023-08-21', '2023-09-04', '2023-08-02'];
    // const workingDays = calculateWorkingDays(start, end, holidays);
  
    // return workingDays;
  };
  let end =document.getElementById("end-date")
  end.addEventListener("change",()=>{calculateDuration( )})
const displayLeaveRequests = (leaveRequests) => {
  const tableBody = document.getElementById('leave-requests');
  tableBody.innerHTML = '';

  if (!leaveRequests || !Array.isArray(leaveRequests)) {
    console.error('Invalid leave requests data:', leaveRequests);
    return;
  }
  leaveRequests.forEach(request => {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${request.name}</td>
      <td>${request.leaveType}</td>
      <td>${request.startDate}</td>
      <td>${request.endDate}</td>
      <td>${request.duration} days</td>
      <td>${request.reason}</td>
      <td><button class="delete-btn" data-id="${request.id}">Delete</button></td>
    `;
  });

  // Attach event listeners to the delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDelete);
  });
};

const handleDelete = async (event) => {
  const leaveRequestId = event.target.getAttribute('data-id');
  try {
    const response = await fetch(`http://localhost:3000/leaveRequests/${leaveRequestId}`, { 
      method: 'DELETE'
     });
    if (response.ok) {
      const updatedLeaveRequests = await fetchLeaveRequests();
      displayLeaveRequests(updatedLeaveRequests);
    } else {
      console.error('Failed to delete leave request');
    }
  } catch (error) {
    console.error('Error deleting leave request:', error);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const name = document.getElementById('employee-name').value;
  const leaveType = document.getElementById('leave-type').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const reason = document.getElementById('reason').value; 
  const duration = document.getElementById('duration').value;

  const newLeaveRequest = {
    name,
    leaveType,
    startDate,
    endDate,
    reason,
    duration,
  };

  try {
    const response = await fetch('http://localhost:3000/leaveRequests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLeaveRequest),
    });

    if (response.ok) {
      const updatedLeaveRequests = fetchLeaveRequests();
      displayLeaveRequests(updatedLeaveRequests);
      document.getElementById('leave-form').reset();
    } else {
      console.error('Failed to submit leave request');
    }
  } catch (error) {
    console.error('Error submitting leave request:', error);
  }
};

document.getElementById('leave-form').addEventListener('submit', handleSubmit);


document.addEventListener('DOMContentLoaded', async () => {
  const leaveRequests = fetchLeaveRequests();
  displayLeaveRequests(leaveRequests);
});
