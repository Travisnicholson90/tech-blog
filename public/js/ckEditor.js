console.log('hello');
let editor;

ClassicEditor
  .create(document.querySelector('.post-editor'), {
    contentsCss: '../public/css/index.css'
  })
  .then(ckEditor => {
    editor = ckEditor;
  })
  .catch(error => {
    console.error(error);
  });

//blog post form function 
const blogPostForm = async (event) => {
  event.preventDefault();

  const blogTitle = $('#blog-post-title').val();
  const blogContent = editor.getData();

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
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create blog post');
  }
};

$('#blog-post-form').submit(blogPostForm);