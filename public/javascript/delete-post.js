async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
//when button is clicked, need to capture the id post of the post and use the fetch() to make a delete request to /api/posts/:id
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

//if it is successful then the user is redirected to the dashboard
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);



