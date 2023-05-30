const toggle = document.querySelector('#toggle');
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
      alert('Logged in!');
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  };

  $('#login-form').submit(loginForm);


//comment form function
const commentForm = async (event) => {
    event.preventDefault();

    const commentUsername = $('#comment-username').val();
    const commentText = $('#comment-text').val();
    const id = $('#blog-id').val();
    
    const commentData = {
      username: commentUsername,
      comment: commentText,
    };

    console.log(commentData);

    const response = await fetch(`/api/post-comment/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Comment posted!');
      document.location.replace(`/api/blog-page/${id}`);
    } else {
      alert('Failed to post comment');
    }
  };

  $('#comment-form').submit(commentForm);

  //blog post form function 
  const blogPostForm = async (event) => {
    event.preventDefault();

    const blogTitle = $('#blog-post-title').val();
    const blogContent = $('#blog-post-content').val();

    const blogPostData = {
      blogTitle: blogTitle,
      blogContent: blogContent,
    };

    console.log(blogPostData);
    
    const response = await fetch('/api/post-blog', {
      method: 'POST',
      body: JSON.stringify(blogPostData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Blog post created!');
      document.location.replace('/');
    } else {
      alert('Failed to create blog post');
    }
  };
  
  $('#blog-post-form').submit(blogPostForm);