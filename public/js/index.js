const toggle = document.querySelector('.toggle');
const nav = document.querySelector('#navbar');

toggle.addEventListener('click', (e) => {
  nav.classList.toggle('navbar-show');
});

// signup form function
const signupForm = async (event) => {
    event.preventDefault();

    const signupFirstName = $('#signup-firstname').val();
    const signupLastName = $('#signup-lastname').val();
    const signupEmail = $('#signup-email').val();
    const signupUsername = $('#signup-username').val();
    const signupPassword = $('#signup-password').val();

    const signupData = {
      first_name: signupFirstName,
      last_name: signupLastName,
      email: signupEmail,
      username: signupUsername,
      password: signupPassword,
    };

    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Account created!');
      document.location.replace('/');
    } else {
      alert('Failed to create account');
    }
  };

  $('#signup-form').submit(signupForm);

//login form function
const loginForm = async (event) => {
    event.preventDefault();
    const loginUsername = $('#login-username').val();
    const loginPassword = $('#login-password').val();

    const loginData = {
      username: loginUsername,
      password: loginPassword,
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  };

  $('#login-form').submit(loginForm);

//delete blog post form function   
  const deleteBlogPostForm = async (event) => {
    event.preventDefault();
        
  const id = $('#delete-blog-btn').val();

  const confirmDelete = confirm('Are you sure you want to delete this blog post?');

  if (!confirmDelete) {
    return;
  }
  const blogPostData = {
    id: id,
  };

  const response = await fetch(`/api/delete-blog/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(blogPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    alert('Blog post deleted!');
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete blog post');
  }
};

$('#delete-blog-form').submit(deleteBlogPostForm);


const arrow = document.querySelector('#arrow');
const commentText = document.querySelector('.comments-text');
const commentToggle = document.querySelector('.comments-toggle');
const commentsSection = document.querySelector('.comments-section');

  commentToggle.addEventListener('click', (e) => {
  commentsSection.classList.toggle('active');
  arrow.classList.toggle('active');
  commentText.textContent === 'Hide Comments' ? commentText.textContent = 'Show Comments' : commentText.textContent = 'Hide Comments';
});